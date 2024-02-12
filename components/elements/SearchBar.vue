<template>
  <div
    class="relative w-full h-[45px] flex flex-row flex-nowrap content-center rounded-lg bg-[#fff] border border-light-pink"
  >
    <nuxt-img
      class="absolute top-3 left-3 w-[18px] h-[19px] hover:cursor-pointer"
      src="icons/search.png"
      @click="emits('search')"
    />
    <input
      class="w-full pl-10 rounded-lg focus:outline-darker-pink"
      :value="value"
      type="text"
      @input="callInput($event)"
    />
  </div>
</template>
<script setup>
import debounce from "debounce";
const { value } = defineProps({
  value: { type: [String, Number], default: "" },
});
const emits = defineEmits(["input", "search"]);
const callInput = debounce(($event) => {
  emits("input", $event.target.value);
}, 1000);
</script>
