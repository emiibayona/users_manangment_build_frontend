<template>
  <div
    id="topbar"
    class="sm:bg-light-pink h-[95px] flex flex-row-reverse justify-between content-center px-3 w-full"
  >
    <section
      v-if="!isLoginRoute"
      class="flex flex-row flex-wrap gap-2 items-center"
    >
      <span class=""> {{ authStore?.getUser?.name }}</span>
      <CustomButton
        class="italic"
        @click="action"
        small-fit
        :custom-style="{ fontSize: '10px' }"
        >{{ button }}</CustomButton
      >
    </section>
    <div
      v-if="showBackButton"
      class="flex flex-row content-center flex-wrap gap-2 text-lg text-grey cursor-pointer"
      @click="router.go(-1)"
    >
      <nuxt-img src="icons/back-arrow.svg" height="16" width="16" />Back
    </div>
  </div>
</template>
<script setup>
import CustomButton from "./elements/CustomButton.vue";
import { useRoute, useRouter } from "#app";
import { computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const isLoggedIn = computed(() =>
  authStore?.getUser?.email ? "Logout" : "Login"
);

const button = computed(() => (isLoggedIn.value ? "Logout" : "Login"));
const isLoginRoute = computed(() => route.fullPath.includes("login"));
const isProfileContactRoute = computed(() =>
  route.path.includes("/contacts/contact/")
);
const showBackButton = computed(() =>
  [isProfileContactRoute.value].some((x) => x)
);
const action = async function () {
  if (authStore?.getUser?.email) {
    await authStore.logout();
  }
  return navigateTo("/login");
};
</script>
<style scoped lang="scss">
//
</style>
