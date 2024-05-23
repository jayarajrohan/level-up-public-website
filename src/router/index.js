import Vue from "vue";
import VueRouter from "vue-router";

import routes from "@/router/router.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);
//   const userRole = localStorage.getItem("role");

//   if (requiresAdmin && userRole !== "Admin") {
//     // Redirect non-admin users to a different page, e.g., home
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;
