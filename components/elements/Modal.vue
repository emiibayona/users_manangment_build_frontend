<template>
  <VueFinalModal
    class="flex flex-row justify-center items-center"
    content-class="w-auto h-[auto] rounded-2xl bg-[#fff] p-10 flex flex-col flex-wrap items-end"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <h1 class="mb-4">{{ title }}</h1>
    <slot />
    <CustomButton class="mt-4" @click="emit('confirm')" fit
      >Confirm</CustomButton
    >
  </VueFinalModal>
</template>
<script setup>
import { VueFinalModal } from "vue-final-modal";
import CustomButton from "./CustomButton.vue";

const emit = defineEmits(["confirm"]);
const props = defineProps({ title: { type: String, default: "Title" } });
</script>
