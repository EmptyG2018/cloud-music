import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vuebar from "vuebar";
import MuseUI from "muse-ui";
import Helpers from "muse-ui/lib/Helpers";
import filter from "@/libs/filter";

import "muse-ui/dist/muse-ui.css";
import "@/assets/stylesheets/diy.css";

import "@/assets/stylesheets/scrollbar.css";

filter();

Vue.use(Vuebar);

Vue.use(MuseUI);
Vue.use(Helpers);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
