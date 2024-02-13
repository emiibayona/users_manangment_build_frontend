<template>
  <div class="w-full h-[calc(100vh-95px)]">
    <nuxt-child />
    <div
      v-if="authStore.isLoggedIn"
      class="flex flex-col items-center justify-center"
    >
      <h1 class="mb-10">Welcome back</h1>
      <CustomButton @click="navigateTo('/contacts')"
        >Go to contacts</CustomButton
      >
    </div>
  </div>
</template>
<script setup>
import CustomButton from "~/components/elements/CustomButton.vue";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
</script>
<style>
/*  */
</style>
