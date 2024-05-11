import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "./myBuefyStyles/myBuefyStyles.scss";
import MenuIcon from "vue-material-design-icons/Menu.vue";
Vue.use(Buefy);
Vue.component("menu-icon", MenuIcon);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
