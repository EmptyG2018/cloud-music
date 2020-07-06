import Vue from "vue";
import { authors } from "./util";

const filter = () => {
  Vue.filter("authors", authors);
};

export default filter;
