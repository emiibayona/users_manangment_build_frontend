<template>
  <div class="flex flex-col content-center w-full sm:w-auto sm:mx-[73px]">
    <ContactsList
      :contacts="contacts"
      :is-loading="isLoading"
      @search="searchContacts"
    />
  </div>
</template>
<script setup>
import { useLazyFetch } from "#app";
import ContactsList from "./ContactsList.vue";
import { useContactStore } from "@/stores/ContactsStore";
const contactStore = useContactStore();

const isLoading = computed(() => contactStore.isContactsLoading);
const contacts = computed(() => contactStore.getContacts);
const searchContacts = async function (query) {
  await contactStore.fetchContacts(query);
};
useLazyFetch(async () => await contactStore.fetchContacts());
</script>
