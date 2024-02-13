<template>
  <div
    class="flex flex-col flex-wrap justify-center content-center w-[187px] gap-6"
  >
    <div
      id="imag"
      class="relative h-[187px] w-[187px] rounded-full bg-light-pink flex-row flex m-auto justify-center border-2 border-[#A5A5A5]"
    >
      <span
        class="absolute rotate-45 h-[99.9%] w-[1px] border border-[#A5A5A5]"
        >{{ "" }}</span
      >
      <nuxt-img src="users_default.svg" width="125" />
    </div>
    <h3 class="text-center my-0">Add contacts to your database</h3>
    <CustomButton class="" @click="addContacts">
      Add new contacts
    </CustomButton>
  </div>
</template>
<script setup>
const emits = defineEmits(["add"]);
import CustomButton from "@/components/elements/CustomButton.vue";
const addContacts = function () {
  emits("add");
};
</script>
