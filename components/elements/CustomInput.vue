<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="text-form-label">{{ label }}</label>
    <input
      v-if="edit"
      :value="value"
      :class="style"
      :placeholder="placeholder"
      :type="type"
      @input="$emit('input', $event.target.value)"
    />
    <span
      v-if="!edit"
      class="text-grey"
      :class="{ 'italic text-[12px]': !value && emptyValue }"
      >{{ value || emptyValue }}</span
    >
    <span class="text-red-error">
      {{ error }}
    </span>
  </div>
</template>
<script setup>
import { computed } from "vue";
defineEmits(["input"]);
const props = defineProps({
  value: { type: [String, Number], default: null },
  label: { type: [String, Number], default: "" },
  emptyValue: { type: [String, Number], default: null },
  placeholder: { type: String, default: "" },
  type: { type: String, default: "text" },
  error: { type: String, default: null },
  required: { type: Boolean, default: false },
  edit: { type: Boolean, default: true },
});
const style = computed(() => {
  const base = [
    "bg-light-pink h-[56px] text-grey px-3 rounded-lg focus:outline-darker-pink focus:outline-1",
  ];
  const extra = [];
  if (props.error) {
    extra.push("border-2 border-red-error");
  }
  return [...base, ...extra].join(" ");
});
</script>

<style scoped lang="scss">
//
</style>
