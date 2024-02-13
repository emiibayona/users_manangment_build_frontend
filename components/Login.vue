<!-- import type { Login } from '#build/components'; -->
<template>
  <div
    class="flex flex-col w-full gap-12 flex-wrap justify-center content-center mt-[70px]"
  >
    <h1 class="text-center text-near-black">Welcome</h1>
    <div
      v-if="!authStore?.getUser?.name"
      class="flex flex-col gap-6 w-full sm:w-[535px] px-2 sm:px-0"
    >
      <CustomInput
        :value="email"
        label="Email"
        placeholder="example@dominio.com"
        @input="(res) => (email = res)"
      />
      <CustomInput
        :value="password"
        type="password"
        label="Password"
        placeholder="****"
        @input="(res) => (password = res)"
      />
    </div>
    <div class="flex flex-row justify-center">
      <CustomButton class="text-lg" @click="login">LOGIN</CustomButton>
    </div>
    <div v-if="authStore?.errorOnUser" style="color: red">
      {{ authStore?.getUser }}
    </div>
  </div>
</template>
<script setup>
import { useRouter } from "#app";
import CustomInput from "./elements/CustomInput.vue";
import CustomButton from "./elements/CustomButton.vue";
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
const authStore = useAuthStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const login = async function () {
  await authStore.login({
    email: email.value,
    password: password.value,
  });
};
const logged = computed(() => authStore?.isLoggedIn);
watch(logged, () => {
  if (logged.value) {
    router.push("/contacts");
  }
});
</script>
<style scoped lang="scss">
// #login {
//   wi535px
// }
</style>
