<template>
  <div>
    <div class="columns">
      <div
        class="column is-2 sidebar-style"
        style="background-color: rgba(7, 32, 93, 1)"
      >
        <div class="is-pulled-right mr-1">
          <div class="logo">Level-Up</div>
        </div>
        <!-- <img
          src="@/assets/images/graduation.webp"
          alt="Log Out"
          width="185px"
          class="my-4 ml-6"
        /> -->
        <div class="sec font-style-two">
          <MenuItem
            v-for="(route, index) in dashboardChildrenRoutes"
            :key="index"
            :route="route"
          />
        </div>
      </div>
      <div class="column is-10">
        <div class="columns top-bar py-1">
          <div class="column"></div>
          <div class="column is-narrow">
            <b-tooltip label="Log Out" position="is-left">
              <img
                src="@/assets/images/logoutButton.webp"
                alt="Log Out"
                class="cover-style"
                width="50px"
                @click="
                  () => {
                    $router.push(`/`);
                  }
                "
              />
            </b-tooltip>
          </div>
        </div>

        <div class="section-style">
          <transition name="route" mode="out-in">
            <router-view></router-view
          ></transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dashboardChildrenRoutes } from "@/router/router.js";

import MenuItem from "./menuItem.vue";
export default {
  name: "DashboardLayout",
  components: {
    MenuItem,
  },
  data() {
    return {
      dashboardChildrenRoutes,
    };
  },
};
</script>

<style scoped>
.sidebar-style {
  height: 100vh;
  color: #fff;
  color: var(--white, #fff);

  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.18px;
}
.section-style {
  height: calc(100vh - 79.8px);
  overflow: auto;
}
.sec {
  margin-top: 64px !important;
  font-size: 1.1rem;
}

.foot {
  position: absolute;
  bottom: 2px;
}
.top-bar {
  background: var(--white, #fff);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
}
.logo {
  background-color: #006fb7;
  width: 200px;
  font-size: 25px;
  padding-block: 5px;
  margin-top: 7px;
  text-align: end;
  border-radius: 15px 0;
}
</style>
