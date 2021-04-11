import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "animate.css";
import "lodash";
import "echarts";
import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import ElementPlus from "element-plus";
import "element-plus/lib/theme-chalk/index.css";

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount("#app");
