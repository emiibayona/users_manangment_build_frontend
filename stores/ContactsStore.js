import service from "@/services/ContactsService.js";
import { defineStore } from "pinia";
import { StoreStatus } from "#imports";

export const useContactStore = defineStore("contacts", {
  state: () => ({
    contacts: { value: null, status: StoreStatus.LOADING },
  }),
  actions: {
    async fetchContacts(query) {
      this.contacts.status = StoreStatus.LOADING;
      const res = await service.list(query);
      this.contacts.value = {
        data: res?.data || [],
        first_page: res?.from || 1,
        current_page: res?.current_page || 1,
        last_page: res?.last_page || 1,
      };
      this.contacts.status = StoreStatus.SUCCESS;
    },
  },
  getters: {
    getContacts: (state) => state?.contacts?.value,
    isContactsLoading: (state) =>
      state?.contacts?.status === StoreStatus.LOADING,
  },
});
