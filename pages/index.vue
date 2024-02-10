<template>
  <div id="page">
    <Topbar />
    <nuxt-child />
  </div>
</template>
<script setup>
import Topbar from "@/components/TopBar.vue";
</script>
<style scoped>
.page {
  width: 100%;
}
</style>
