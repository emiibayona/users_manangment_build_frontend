<template>
  <nuxt-img
    :class="[
      'object-cover',
      { 'rounded-full': rounded },
      `w-[${dimension}px]`,
      `h-[${dimension}px]`,
      { 'sm:border-2 sm:border-black': border },
    ]"
    :src="source"
    :width="dimension"
  />
</template>
<script setup>
const props = defineProps({
  source: { type: String, default: "dummy_profile.jpg" },
  dimension: { type: Number, default: 70 },
  rounded: { type: Boolean, default: true },
  border: { type: Boolean, default: false },
});
</script>
