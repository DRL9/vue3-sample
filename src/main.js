import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let app = createApp(App).use(store).use(router);

app.config.errorHandler = (err) => {
  console.log(err);
};

app.mount("#app");
