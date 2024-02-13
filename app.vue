<template>
  <div>
    <Topbar />
    <NuxtPage />
    <ModalsContainer />
  </div>
</template>
<script setup>
import { ModalsContainer } from "vue-final-modal";

import Topbar from "@/components/TopBar.vue";
useSeoMeta({
  title: "Training - Contacts Manager",
});
</script>
<style>
body {
  margin: 0;
  font-family: "Red Hat Display", sans-serif;
  background-color: #f9f8fd;
}
#custom-button {
  color: #fff;
  font-family: "Public Sans", sans-serif;
  font-size: 18px;
  line-height: 22px;
}
h1 {
  font-weight: 900;
  font-size: 39px;
  line-height: 52px;
}
h3 {
  font-weight: 900;
  font-size: 25px;
  line-height: 33px;
}
</style>
