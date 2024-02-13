import service from "@/services/ContactsService.js";
import { defineStore } from "pinia";
import { StoreStatus } from "#imports";

const pageProcess = function (value) {
  return {
    data: value?.data || [],
    first_page: value?.from || 1,
    current_page: value?.current_page || 1,
    last_page: value?.last_page || 1,
  };
};
export const useContactStore = defineStore("contacts", {
  state: () => ({
    contacts: { value: null, status: StoreStatus.LOADING },
    viewContact: { value: null, status: StoreStatus.LOADING },
  }),
  actions: {
    async fetchContacts(query) {
      this.contacts.status = StoreStatus.LOADING;
      const res = await service.list(query);
      this.contacts.value = pageProcess(res);
      this.contacts.status = StoreStatus.SUCCESS;
    },
    async setViewContact(query, clean = false) {
      this.viewContact.status = StoreStatus.LOADING;
      this.viewContact.value = null;
      if (!clean) {
        const res = await service.list(query);
        this.viewContact.value = res?.data?.length ? res.data[0] : null;
      }
      this.viewContact.status = StoreStatus.SUCCESS;
      return this.viewContact.value;
    },
    async updateContact(params) {
      const res = await service.update(params);
      if (!res?.error) {
        this.viewContact.value = res;
      }
      return res;
    },
    async createContact(body) {
      return await service.create(body);
    },
  },
  getters: {
    getContacts: (state) => state?.contacts?.value,
    getViewContact: (state) => state?.viewContact?.value,
    isContactsLoading: (state) =>
      state?.contacts?.status === StoreStatus.LOADING,
    isProfileLoading: (state) =>
      state?.viewContact?.status === StoreStatus.LOADING,
  },
});
