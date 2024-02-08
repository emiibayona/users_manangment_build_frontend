<template>
  <div>
    {{ user || "Cargame el user" }}
    {{ userIsLogged }}
    <button @click="setUser({ name: 'asd' })">CLICK ME</button>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import useUser from "@/stores/user";
const userStore = useUser();
const { setUser } = userStore;
const { user, userIsLogged } = storeToRefs(userStore);
onMounted(() => setUser(null));
</script>
