// import { useCookie } from "nuxt/app";
import cookies from "js-cookie";
import axios from "axios";
export default defineNuxtRouteMiddleware(() => {
  const token = cookies.get("user_token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
});
