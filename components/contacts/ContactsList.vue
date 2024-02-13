<template>
  <div class="flex flex-col sm:flex-wrap sm:content-center w-full">
    <h1 class="sm:mt-20 mb-4 sm:mb-8 sm:text-center md:text-left">Contacts</h1>
    <SearchBar
      class="mb-4 sm:mb-8"
      :value="searchWord"
      @input="(res) => (searchWord = res)"
      @search="searchContacts"
    />

    <div class="flex flex-col sm:flex-wrap sm:content-center w-full">
      <div class="w-full flex flex-row justify-center">
        <Loader v-if="isLoading" />
      </div>
      <div class="flex flex-col sm:flex-wrap sm:content-center w-full">
        <section
          v-if="!isLoading && contactsToShow.length"
          class="flex flex-col sm:gap-5 sm:m-auto sm:grid sms:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20"
        >
          <Contact
            v-for="(cont, index) in contactsToShow"
            :key="index"
            :contact="cont"
          />
        </section>
        <Paginate
          v-if="!isLoading && contactsToShow.length"
          :first="contacts?.first_page"
          :last="contacts?.last_page"
          :current="contacts?.current_page"
          @go="(val) => changePage(val)"
        />
        <section class="w-full flex flex-row justify-center">
          <EmptyContacts v-if="showEmptyContacts" @add="addContacts" />
        </section>
      </div>
    </div>
    <CustomButton
      v-if="!showEmptyContacts"
      class="absolute bottom-6 right-6 w-[58px] flex flex-row justify-center items-center"
      @click="addContacts"
      ><nuxt-img class="w-[50px] h-[50px]" src="icons/cross-add.png"
    /></CustomButton>
  </div>
</template>
<script setup>
import Contact from "./ContactItem.vue";
import EmptyContacts from "./EmptyContacts.vue";
import Paginate from "@/components/elements/Paginate.vue";
import Loader from "@/components/elements/Loader.vue";
import SearchBar from "./../elements/SearchBar.vue";

import { ref, watch } from "vue";
import CustomButton from "../elements/CustomButton.vue";
const props = defineProps({
  contacts: { type: Object, default: () => {} },
  isLoading: { type: Boolean, default: false },
});
const contactsToShow = computed(() => props.contacts?.data);
const showEmptyContacts = computed(
  () => !props.isLoading && !contactsToShow.value.length
);
const emits = defineEmits(["search"]);

const searchWord = ref("");
const changePage = function (current) {
  searchContacts({ page: current });
};
const searchContacts = function (query = {}) {
  if (searchWord.value !== "") {
    query.filter = searchWord.value;
  }

  emits("search", { ...query });
};
const addContacts = () => {
  navigateTo("/contacts/contact/");
};
watch(searchWord, () => {
  searchContacts();
});
</script>
