<template>
  <div class="m-6">
    <div v-if="$route.name === `Dashboard`">
      <p class="has-text-primary-dark font-style-two is-size-3">
        Welcome back,
      </p>
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <img src="@/assets/images/calender.webp" alt="calender" />
        </div>
        <div class="column ml-2 font-style-two">
          {{ moment().format("DD-MM-YYYY") }}
        </div>
      </div>
      <div class="mt-6">
        <div class="columns">
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of students</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">{{
                studentsCount
              }}</strong>
            </div>
          </div>
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of tutors</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">{{
                tutorsCount
              }}</strong>
            </div>
          </div>
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of courses</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">{{
                coursesCount
              }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="route" mode="out-in">
      <router-view></router-view
    ></transition>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import moment from "moment";
import { apiRequestManager } from "@/util/util";
import AppLoader from "@/components/AppLoader/appLoader.vue";
export default {
  name: "DashboardView",
  data() {
    return {
      studentsCount: 0,
      tutorsCount: 0,
      coursesCount: 0,
      isLoading: false,
    };
  },
  components: {
    AppLoader,
  },
  methods: {
    moment,
    fetchDashboardViewDetails() {
      this.isLoading = true;
      apiRequestManager("get", "/admin/dashboard/view", {}, {}, (res) => {
        if (res.status === 200) {
          this.isLoading = false;
          this.studentsCount = res.data.dashboardDetails.studentsCount;
          this.coursesCount = res.data.dashboardDetails.coursesCount;
          this.tutorsCount = res.data.dashboardDetails.tutorsCount;
          return;
        }
      });
    },
  },
  mounted() {
    this.fetchDashboardViewDetails();
  },
  watch: {
    $route: "fetchDashboardViewDetails",
  },
};
</script>

<style lang="scss">
.box-style {
  background-color: #e8eaef;
  border-radius: 8px;
  text-align: center;
}
</style>
