<template>
  <div
    id="topbar"
    class="sm:bg-light-pink h-[95px] flex flex-row justify-between content-center px-3 w-full"
  >
    <div
      v-if="showBackButton"
      class="flex flex-row content-center flex-wrap gap-2 text-lg text-grey"
    >
      <nuxt-img src="icons/back-arrow.svg" height="16" width="16" />Back
    </div>
    <section
      v-if="!isLoginRoute"
      class="sm:flex flex-row flex-wrap gap-2 content-center hidden"
    >
      <span> {{ authStore?.getUser?.name }}</span>
      <button class="italic" @click="action">{{ button }}</button>
    </section>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const route = useRoute();
const authStore = useAuthStore();

const isLoggedIn = computed(() =>
  authStore?.getUser?.email ? "Logout" : "Login"
);

const button = computed(() => (isLoggedIn.value ? "Logout" : "Login"));
const isLoginRoute = computed(() => route.fullPath.includes("login"));
const isContactsRoute = computed(() => route.fullPath.includes("contacts"));
const showBackButton = computed(() =>
  [!isLoggedIn.value, isContactsRoute.value].some((x) => x)
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
