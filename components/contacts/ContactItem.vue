<template>
  <div
    class="sm:rounded-2xl bg-[#fff] sm:border sm:border-light-pink bg-white w-full sm:w-[320px] h-[120px] px-7 py-6 hover:cursor-pointer"
    @click="goToContact"
  >
    <div class="flex flex-row gap-4 content-center h-full">
      <Photo :source="profilePhoto" rounded :dimension="70" />
      <div class="flex flex-row w-[calc(100%-86px)] truncate">
        <div class="flex flex-col w-full gap-1 truncate">
          <span class="text-form-label truncate">
            {{ contact?.name }}
          </span>
          <span class="truncate">{{ contact?.description }}</span>
        </div>
        <div
          class="flex flex-row content-center sm:content-start h-full flex-wrap ml-1"
        >
          <nuxt-img
            class="h-[12px] w-[7px]"
            src="icons/chevron_right.svg"
            height="12"
            width="7"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Photo from "../Photo.vue";
const props = defineProps({
  contact: { type: Object, default: () => {} },
});

const profilePhoto = computed(
  () => props?.contact?.profile_picture || "dummy_profile.jpg"
);
const goToContact = function () {
  navigateTo(`/contacts/contact/${props?.contact?.id}`);
};
</script>
