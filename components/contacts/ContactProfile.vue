Form
<template>
  <div>
    <div v-if="contactStore?.isProfileLoading && editionMode">
      <ContactSkeleton />
    </div>
    <div
      v-else
      class="flex flex-col flex-wrap justify-center items-center px-4 sm:mx-[75px] mt-11"
    >
      <section
        id="banner-logo"
        class="sm:flex sm:flex-col w-full sm:justify-center sm:items-center sm:flex-wrap rounded-2xl"
      >
        <div
          class="hidden relative h-[275px] w-full sm:block rounded-2xl border border-light-pink"
        >
          <nuxt-img
            class="w-full h-full object-cover rounded-2xl"
            v-if="bannerPhoto"
            :src="bannerPhoto"
            height="275"
            width="100%"
          />
          <div v-else class="bg-grey-1 h-full rounded-2xl">{{ "" }}</div>
          <nuxt-img
            v-if="edit"
            class="absolute bottom-5 right-5 hover:scale-125 hover:cursor-pointer transition-all duration-200 drop-shadow-md brightness-100 hover:brightness-200"
            src="icons/upload_icon.png"
            height="20"
            width="20"
            @click="showModal = true"
          />
          <CustomButton
            v-if="!edit"
            class="absolute bottom-6 right-6"
            fit
            @click="edit = true"
            >Edit</CustomButton
          >
        </div>
        <div
          class="flex flex-col items-center bg-light-pink rounded-2xl sm:bg-opacity-0 sm:w-[185px] text-center p-1 sm:p-0"
        >
          <Photo
            class="h-[70px] w-[70px] sm:h-[185px] sm:w-[185px] mb-4 sm:mb-10 sm:-mt-[100px] z-0"
            :source="profilePhoto"
            :dimension="70"
            :border="true"
            rounded
          />
          <h3 class="mb-1">{{ contact?.name }}</h3>
          <span class="text-grey font-normal">{{ contact?.title }}</span>
        </div>
      </section>

      <div class="relative mt-8 sm:mt-20 pb-28 w-full sm:w-auto">
        <Form
          class="grid grid-cols-1 w-full sm:w-auto sm:grid-cols-2s grid-flow-row gap-y-6 gap-x-20"
        >
          <CustomInput
            v-if="edit"
            :value="name"
            :error="errors['name']"
            :edit="edit"
            @input="(res) => (name = res)"
            label="Name"
          />
          <CustomInput
            v-if="edit"
            :value="title"
            :edit="edit"
            :error="errors['title']"
            label="Title"
            @input="(res) => (title = res)"
          />
          <CustomInput
            v-if="edit"
            :value="profile_picture"
            :edit="edit"
            :error="errors['profile_picture']"
            @input="(res) => (profile_picture = res)"
            label="Profile Picture"
          />
          <CustomInput
            :value="address"
            :error="errors['address']"
            :edit="edit"
            label="Address"
            empty-value="Add an address..."
            @input="(res) => (address = res)"
          />
          <CustomInput
            :value="phone"
            :edit="edit"
            label="Phone"
            type="number"
            empty-value="Add a phone..."
            :error="errors['phone']"
            @input="(res) => (phone = res)"
          />
          <CustomInput
            v-bind="emailAttrs"
            :value="email"
            :error="errors['email']"
            :edit="edit"
            label="Email"
            empty-value="Add an email..."
            @input="(res) => (email = res)"
          />
          <CustomInput
            :value="description"
            :error="errors['description']"
            :edit="edit"
            label="Description"
            empty-value="Add a description..."
            @input="(res) => (description = res)"
          />
          <Modal
            v-model="showModal"
            title="Add banner picture"
            @confirm="showModal = false"
          >
            <slot
              ><div class="w-full">
                <CustomInput
                  class="w-full"
                  :value="banner_picture"
                  :error="errors['banner_picture']"
                  :edit="edit"
                  @input="(res) => (banner_picture = res)"
                  label="Banner picture"
                />
                <span class="italic text-grey text-sm"
                  >After confirm, you have to save the profile.</span
                >
              </div>
            </slot>
          </Modal>
        </Form>

        <div class="flex flex-row items-center w-full absolute bottom-2">
          <CustomButton
            v-if="edit && editionMode"
            class="m-auto"
            @click="reset"
            fit
            >Cancel</CustomButton
          >
          <CustomButton
            v-if="!edit"
            class="m-auto sm:hidden"
            :fit="edit"
            @click="edit = true"
            >{{ "Edit" }}</CustomButton
          >
          <CustomButton v-if="edit" class="m-auto" :fit="edit" @click="save">{{
            "Save"
          }}</CustomButton>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import CustomInput from "../elements/CustomInput.vue";
import CustomButton from "../elements/CustomButton.vue";
const Modal = defineAsyncComponent(() => import("../elements/Modal.vue"));
import Photo from "../Photo.vue";
import { useAsyncData, useRoute, useRouter } from "#app";
import { computed, ref, defineAsyncComponent, watch } from "vue";
import { Form } from "vee-validate";
import * as yup from "yup";

import { useForm } from "vee-validate";
import { useContactStore } from "@/stores/ContactsStore";
import { useAuthStore } from "@/stores/AuthStore";
import ContactSkeleton from "./ContactSkeleton.vue";
const contactStore = useContactStore();
const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

const showModal = ref(false);
const edit = ref(false);
const pageMode = ref("edition");

const editionMode = computed(() => pageMode.value === "edition");
const contact = computed(() => contactStore?.getViewContact);
const profilePhoto = computed(
  () => contact?.value?.profile_picture || "dummy_profile.jpg"
);
const bannerPhoto = computed(() => contact?.value?.banner_picture);
const userIsLoggedIn = computed(() => authStore.isLoggedIn);

// Forms
const { values, errors, resetForm, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Must be a valid email. 'em@em.com'"),
    name: yup.string().required("Name is required"),
    address: yup.string(),
    title: yup.string(),
    description: yup.string().max(200),
    phone: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable(),
    profile_picture: yup.string().url("Must be a valid URL"),
    banner_picture: yup.string().url("Must be a valid URL"),
  }),
});

const reset = function () {
  edit.value = false;
  initialValues();
};
const initialValues = function () {
  resetForm({
    values: {
      ...(contact?.value || {}),
    },
  });
};

const [email, emailAttrs] = defineField("email");
const [address] = defineField("address");
const [title] = defineField("title");
const [phone] = defineField("phone");
const [name] = defineField("name");
const [profile_picture] = defineField("profile_picture");
const [banner_picture] = defineField("banner_picture");
const [description] = defineField("description");

// Functions
const fetchContact = async function (id, clean = false) {
  const res = await contactStore.setViewContact(
    { id: id || route?.params?.id },
    clean
  );
  console.log("onFetch", res);
  if (!res && editionMode.value) {
    router.push("/contacts");
  }
  initialValues();
  return res;
};

const init = async function () {
  if (!userIsLoggedIn.value) return;

  if (route?.params?.id === "") {
    pageMode.value = "creation";
    edit.value = true;
  }
  await fetchContact(null, !editionMode.value);
};

const save = async function () {
  try {
    let id = route?.params?.id;
    if (editionMode.value) {
      await contactStore.updateContact({ id: route?.params?.id, body: values });
    } else {
      const res = await contactStore.createContact(values);
      id = res.id;
      router.replace({ params: { ...route?.params, id } });
      return;
    }
    edit.value = false;

    await fetchContact(id);
  } catch (error) {
    console.error("Error updating the contact", error);
  }
};

// Watchers
useAsyncData(async () => await init());
watch(userIsLoggedIn, () => init());
</script>
