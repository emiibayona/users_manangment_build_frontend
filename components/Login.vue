import type { Login } from '#build/components';
<template>
  <div class="flex flex-col">
    <div v-if="!authStore?.getUser?.name" class="flex flex-col">
      <span>email</span>
      <input v-model="email" type="email" />
      <span> password </span>
      <input v-model="password" type="password" />
    </div>
    <button @click="login">login</button>
    <div v-if="authStore?.errorOnUser" style="color: red">
      {{ authStore?.getUser }}
    </div>
  </div>
</template>
<script setup>
import "@/src/index.css";
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();

const email = ref(null);
const password = ref(null);
const login = async function () {
  const res = await authStore.login({
    email: email.value,
    password: password.value,
  });
  if (authStore?.getUser?.id) {
    navigateTo(`/contacts/`);
  }
};
</script>
