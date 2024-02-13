import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/pages/index.vue";
import { createVfm } from "vue-final-modal";

createApp(App).use(createPinia()).use(createVfm()).mount("#app");
