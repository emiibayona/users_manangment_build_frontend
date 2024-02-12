<template>
  <div v-if="last > 1" class="flex flex-row gap-1 justify-center my-3">
    <span v-if="showGoLeft" class="cursor-pointer" @click="go(current - 1)">{{
      "<"
    }}</span>
    <span
      id="first"
      :class="[{ 'font-bold': firstIndex === current }, 'cursor-pointer']"
      @click="go(firstIndex)"
      >{{ firstIndex }}</span
    >
    <span
      v-if="showSecondIndex"
      id="second"
      class="cursor-pointer"
      @click="go(secondIndex)"
      >{{ secondIndex }}</span
    >
    <span v-if="showDots" class="cursor-default">...</span>
    <span
      id="last"
      :class="[{ 'font-bold': lastIndex === current }, 'cursor-pointer']"
      @click="go(first !== last ? last : 0)"
      >{{ lastIndex }}</span
    >
    <span v-if="showGoRight" class="cursor-pointer" @click="go(current + 1)">{{
      ">"
    }}</span>
  </div>
</template>
<script setup>
import { computed } from "vue";
const emits = defineEmits(["go"]);
const props = defineProps({
  first: { type: Number, default: 0 },
  last: { type: Number, default: 1 },
  current: { type: Number, default: 0 },
});
const firstIndex = computed(() =>
  props.current === props.last ? props.current - 1 : props.current
);
const secondIndex = computed(() => firstIndex.value + 1);
const lastIndex = computed(() => props.last);

const showSecondIndex = computed(() => props.last - props.current > 1);

const showGoLeft = computed(() => props.first - props.current >= 1);
const showGoRight = computed(() => props.current - props.last < 0);
const showDots = computed(() => props.last - props.current > 2);
const go = function (val) {
  if (val) {
    emits("go", val);
  }
};
</script>
