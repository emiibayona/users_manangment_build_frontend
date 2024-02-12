<template>
  <div class="flex flex-col content-center w-full sm:w-auto sm:mx-[73px]">
    <!-- <Loader v-if="isLoading" /> -->
    <ContactsList
      :contacts="contacts"
      :is-loading="isLoading"
      @search="searchContacts"
    />
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useContactStore } from "@/stores/ContactsStore";
import ContactsList from "./ContactsList.vue";
const contactStore = useContactStore();

const isLoading = computed(() => contactStore.isContactsLoading);
const contacts = computed(() => contactStore.getContacts);
const searchContacts = async function (query) {
  await contactStore.fetchContacts(query);
};
onMounted(async () => await contactStore.fetchContacts());
</script>
