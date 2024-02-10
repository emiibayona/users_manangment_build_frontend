import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/pages/index.vue";
import "./src/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount("#app");