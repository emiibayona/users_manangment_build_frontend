<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-form-label">{{ label }}</label>
    <input
      :value="value"
      :class="style"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>
<script setup>
import { computed } from "vue";
defineEmits(["input"]);
const props = defineProps({
  value: { type: [String, Number], default: "" },
  label: { type: [String, Number], default: "" },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: null },
  required: { type: Boolean, default: false },
});
const style = computed(() => {
  const base = [
    "bg-light-pink h-[56px] text-grey px-3 rounded-lg focus:outline-darker-pink focus:outline-1",
  ];
  const extra = [];
  if (props.error) {
    extra.push("border-2 border-rose-950");
  }
  return [...base, ...extra].join(" ");
});
</script>

<style scoped lang="scss">
//
</style>
