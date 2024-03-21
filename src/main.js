import Vue from "vue";
import App from "./App.vue";
import ClickOutside from "@/directives/click-outside";

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.directive("click-outside", ClickOutside);

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
