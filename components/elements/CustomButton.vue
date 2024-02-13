<template>
  <button
    id="custom-button"
    :disabled="disabled"
    :class="customClasses"
    :style="customStyle"
  >
    <slot class="text-lg"></slot>
  </button>
</template>
<script setup>
const props = defineProps({
  type: { type: String, default: () => "large" },
  disabled: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  fit: { type: Boolean, default: false },
  smallFit: { type: Boolean, default: false },
  customStyle: { type: Object, default: () => {} },
});

const customClasses = computed(() => {
  const classes = {
    dimensions: ["w-[260px]"],
    borders: ["rounded-l-full rounded-r-full"],
    colors: ["text-white"],
    actions: [],
  };
  let res = [];
  if (props.block) {
    res.push("w-full");
  }
  if (props.fit) {
    classes.dimensions.push("w-min", "px-10");
  }
  if (props.disabled) {
    classes.colors.push("bg-grey");
    classes.actions.push("hover:bg-grey", "hover:pointer-events-none");
  } else {
    classes.colors.push("bg-purple");
    classes.actions.push("hover:bg-purple-dark", "hover:pointer-events-auto");
  }
  if (props.smallFit) {
    classes.dimensions.push("h-small-fit", "w-min", "px-4");
  } else {
    classes.dimensions.push("h-[58px]");
  }
  Object.values(classes).forEach((x) => (res = [...res, ...x]));

  return res.join(" ");
});
</script>
