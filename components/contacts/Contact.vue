<template>
  <div
    class="sm:rounded-2xl bg-[#fff] sm:border sm:border-light-pink bg-white w-full sm:w-[320px] h-[120px] px-7 py-6"
  >
    <div class="flex flex-row gap-4 content-center">
      <div class="h-[70px] min-w-[70px]">
        <nuxt-img
          class="h-full w-full rounded-full"
          :src="profilePhoto"
          heigth="70"
          width="70"
        />
      </div>
      <div class="flex flex-row w-full truncate">
        <div class="flex flex-col w-full gap-1 truncate">
          <span class="text-form-label truncate">
            {{ contact?.name }}
          </span>
          <span class="truncate">{{ contact?.description }}</span>
        </div>
        <div class="flex flex-row content-center sm:content-start h-full flex-wrap ml-1">
          <nuxt-img
            class="h-[12px] w-[7px]"
            src="icons/chevron_right.svg"
            heigth="12"
            width="7"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { contact } = defineProps({
  contact: { type: Object, default: () => {} },
});
const profilePhoto = computed(
  () => contact?.profile_picture || "dummy_profile.jpg"
);
</script>
