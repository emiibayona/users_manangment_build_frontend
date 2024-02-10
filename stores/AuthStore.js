import service from "@/services/AuthService.js";
import { defineStore } from "pinia";
import moment from "moment";
import cookies from "js-cookie";

// Token
const setAuthToken = (_, auth) => {
  _.authorisation.value = auth;
  cookies.set("user_token", auth.token);
};
const clearAuthToken = (_) => {
  _.authorisation.value = null;
  cookies.set("user_token", null);
};

const isTokenAlive = (_) => {
  if (!_.authorisation.value) {
    return false;
  }

  return (
    moment(_.authorisation.value.get_time)
      .add(Number(_.authorisation.value.ttl), "minutes")
      .toDate() > moment().toDate()
  );
};

// User
const setUserInfo = (_, user) => {
  _.user.value = user;
  localStorage?.setItem("email", user?.email);
  localStorage?.setItem("userId", user?.id);
};
const cleanUserInfo = (_) => {
  _.user.value = null;
  localStorage?.removeItem("email");
  localStorage?.removeItem("userId");
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: { value: null, status: "success" },
    authorisation: { value: null },
  }),
  actions: {
    async loggedUser() {
      const res = await service.loggedUser();
      if (res.error) {
        if (
          localStorage?.getItem("userId") === this.user?.value?.id &&
          !isTokenAlive(this)
        ) {
          return await this.refreshToken();
        }
      }
      return res;
    },
    async login(data) {
      this.user.status = "loading";
      const res = await service.login(data);

      if (res?.status === 200 || res?.status === "success") {
        setUserInfo(this, res.user);
        setAuthToken(this, res.authorisation);
        this.user.status = "success";
      } else {
        setUserInfo(this, res?.data?.error || res?.data?.errors);
        this.user.status = "error";
      }
    },

    async logout() {
      const res = await service.logout();
      if (res.status === "success") {
        cleanUserInfo(this);
        clearAuthToken(this);
      }
    },
    async refreshToken() {
      await service.refresh();
      if (res.status === "success") {
        setAuthToken(this, res.authorisation);
      }
    },
    async rehydrateUser() {
      const res = await this.loggedUser();
      setUserInfo(this, res);
    },
  },
  getters: {
    getUser: (state) => state.user.value,
    getUserIsLoading: (state) => state.user.status === "loading",
    errorOnUser: (state) => state.user.status === "error",
  },
});
