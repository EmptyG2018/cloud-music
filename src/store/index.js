import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import music from "./music";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    music
  }
});
