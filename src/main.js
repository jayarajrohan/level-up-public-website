import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Buefy from "buefy";
import "vue-loading-overlay/dist/vue-loading.css";
import "./myBuefyStyles/myBuefyStyles.scss";
import MenuIcon from "vue-material-design-icons/Menu.vue";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUser, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faFacebook,
  faTwitter,
  faYoutube,
  faWhatsapp,
  faLinkedin,
  faUser,
  faPhone
);

Vue.use(Buefy);
Vue.component("menu-icon", MenuIcon);
Vue.config.productionTip = false;
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
