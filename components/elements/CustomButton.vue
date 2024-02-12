<template>
  <button
    id="custom-button"
    :disabled="disabled"
    class="rounded-l-full rounded-r-full bg-purple hover:bg-purple-dark w-[260px] h-[58px] text-white"
  >
    <slot class="text-lg"></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  type: { type: String, default: () => "large" },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
});

const customClasses = computed(() => {
  const res = [];
  if (props.block) {
    res.push("w-full");
  }
  return res.join(" ");
});
</script>
