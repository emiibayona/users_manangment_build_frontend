<template>
  <div
    class="animate-pulse flex flex-col flex-wrap justify-center items-center px-4 sm:mx-[75px] mt-11"
  >
    <div :class="defaultSkeletonClass('hidden sm:block h-[275px] w-full')" />
    <div
      class="flex flex-col items-center rounded-2xl gap-2 sm:w-[185px] text-center p-4 sm:p-0 bg-light-pink sm:bg-opacity-0 w-full"
    >
      <div
        :class="
          defaultSkeletonClass(
            'h-[70px] w-[70px] sm:h-[185px] sm:w-[185px] mb-4 sm:mb-10 sm:-mt-[100px] z-0 rounded-full bg-grey',
            true
          )
        "
      />
      <div :class="defaultSkeletonClass('h-[30px] w-[120px]')" />
      <div :class="defaultSkeletonClass('h-[20px] w-[70px]')" />
    </div>
    <div class="relative mt-8 sm:mt-20 pb-28 w-full sm:w-auto">
      <div
        class="grid grid-cols-1 w-full sm:w-auto sm:grid-cols-2s grid-flow-row gap-y-6 gap-x-20"
      >
        <div
          v-for="val in [...Array(7).keys()]"
          :key="val"
          class="flex flex-col gap-2"
        >
          <div :class="defaultSkeletonClass(`h-[30px] w-[50%]`)" />
          <div :class="defaultSkeletonClass('h-[56px]')" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const defaultSkeletonClass = function (values, ignoreRound = false) {
  return `bg-pulse-off dark:bg-pulse-on ${
    ignoreRound ? "" : "rounded-md"
  } ${values}`;
};
</script>
