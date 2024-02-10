<template>
  <div id="topbar">
    <section id="menu" class="flex flex-row gap-2">
      <span> {{ authStore?.getUser?.name }}</span>
      <img
        src="https://showme.redstarplugin.com/d/d:If40AGNM"
        heigth="20"
        width="20"
      />
      <button @click="action">{{ button }}</button>
    </section>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
const button = computed(() => (authStore?.getUser?.email ? "Logout" : "Login"));
const action = async function () {
  if (authStore?.getUser?.email) {
    await authStore.logout();
  }
  return navigateTo("/login");
};
</script>
<style scoped lang="scss">
#topbar {
  background: #fbeeff;
  #menu {
    width: 100%;
  }
}
</style>
