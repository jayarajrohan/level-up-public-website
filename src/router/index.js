import Vue from "vue";
import VueRouter from "vue-router";

import routes from "@/router/router.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
