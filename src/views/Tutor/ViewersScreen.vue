div
<template>
  <div>
    <transition name="route" mode="out-in">
      <div>
        <div class="columns top-bar py-1 px-2">
          <div class="column">
            <div
              class="logo hover-style"
              @click="
                () => {
                  $router.push(`/tutor/students-viewed`).catch(() => []);
                }
              "
            >
              Level-Up
            </div>
          </div>
          <div class="column is-narrow">
            <img
              src="@/assets/images/Profile.webp"
              alt="profile"
              class="hover-style mt-2 border-style"
              width="44px"
              @click="
                () => {
                  $router.push(`/tutor/profile`).catch(() => []);
                }
              "
            />
          </div>
          <div class="column is-narrow">
            <b-tooltip label="Log Out" position="is-left">
              <img
                src="@/assets/images/logoutButton.webp"
                alt="Log Out"
                class="hover-style"
                width="50px"
                @click="onLogout"
              />
            </b-tooltip>
          </div>
        </div>
        <div style="margin-inline: 100px" class="mt-4">
          <p class="has-text-primary is-size-4 mt-4">Connection Requests</p>
          <b-message
            type="is-info"
            has-icon
            class="mt-4 is-size-5"
            v-if="connectionRequests.length === 0"
          >
            Details of Students who sent you connection requests will appear
            here
          </b-message>
          <div class="mt-4" v-if="connectionRequests.length !== 0">
            <AppTable
              :data="connectionRequests"
              :columns="connectionRequestHeader"
              row-class-one="striped-table-color-2"
              rowClassTwo="striped-table-color"
            />
          </div>
        </div>
        <div style="margin-inline: 100px" class="mt-4">
          <p class="has-text-primary is-size-4 mt-4">
            Students who viewed your profile
          </p>
          <b-message
            type="is-info"
            has-icon
            class="mt-4 is-size-5"
            v-if="viewersData.length === 0"
          >
            Details of Students who viewed your profile will appear here
          </b-message>
          <div class="mt-4" v-if="viewersData.length !== 0">
            <AppTable
              :data="viewersData"
              :columns="viewersHeader"
              row-class-one="striped-table-color-2"
              rowClassTwo="striped-table-color"
            />
          </div>
        </div>
      </div>
    </transition>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import AppTable from "@/components/AppTable/appTable.vue";
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager, showSuccessToast } from "@/util/util";
import moment from "moment";

export default {
  name: "viewersView",
  components: {
    AppTable,
    AppLoader,
  },
  data() {
    const viewersHeader = [
      {
        field: "id",
        label: "ID",
        sortable: true,
      },
      {
        field: "recentDate",
        label: "Recent Date",
        sortable: true,
      },
      {
        field: "count",
        label: "Count",
        sortable: false,
      },
      {
        field: "button",
        label: "Button",
      },
    ];

    const connectionRequestHeader = [
      {
        field: "id",
        label: "ID",
        sortable: true,
      },
      {
        field: "requestDate",
        label: "Request Date",
        sortable: false,
      },
      {
        field: "button",
        label: "Button",
      },
    ];

    return {
      viewersData: [],
      connectionRequests: [],
      viewersHeader,
      connectionRequestHeader,
      isModalActive: false,
      isLoading: false,
    };
  },
  methods: {
    onLogout() {
      this.isLoading = true;
      apiRequestManager("get", "/tutor/logout", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          showSuccessToast("Logged out successfully");
          localStorage.removeItem("token");
          this.$router.push(`/`).catch(() => []);
        }
      });
    },
    handleRequest(action, id) {
      this.isLoading = true;
      apiRequestManager(
        "post",
        `/tutor/request/${id}`,
        { status: action },
        {},
        (res) => {
          this.isLoading = false;
          if (res.status === 200) {
            showSuccessToast(`Request ${action} successfully`);
            this.fetchConnectionRequests();
            return;
          }
        }
      );
    },
    fetchViewedStudentDetails() {
      this.isLoading = true;
      apiRequestManager("get", "/tutor/view-students", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.viewersData = res.data.students.map((student) => {
            return {
              id: student.id,
              recentDate: moment(student.recentDate).format("YYYY-MM-DD"),
              count: student.count,
              button: [
                {
                  text: "View",
                  onClick: () => {
                    this.$root.isShowCountAndRecentDate = true;
                    this.$root.count = student.count;
                    this.$root.recentDate = moment(student.recentDate).format(
                      "YYYY-MM-DD"
                    );
                    this.$router
                      .push(`/tutor/student-detail/${student.id}`)
                      .catch(() => []);
                  },
                  icon: "",
                  type: "is-primary",
                },
              ],
            };
          });
          return;
        }
      });
    },
    fetchConnectionRequests() {
      this.isLoading = true;
      apiRequestManager("get", "/tutor/connection-requests", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.connectionRequests = res.data.requests.map((request) => {
            return {
              id: request.id,
              requestDate: moment(request.requestDate).format(
                "YYYY-MM-DD hh:mm:ss"
              ),
              button: [
                {
                  text: "View",
                  onClick: () => {
                    this.$root.isShowCountAndRecentDate = false;
                    this.$router
                      .push(`/tutor/student-detail/${request.id}`)
                      .catch(() => []);
                  },
                  icon: "",
                  type: "is-primary",
                },
                {
                  text: "Accept",
                  onClick: () => {
                    this.handleRequest("accepted", request.id);
                  },
                  icon: "",
                  type: "is-primary",
                },
                {
                  text: "Reject",
                  onClick: () => {
                    this.handleRequest("rejected", request.id);
                  },
                  icon: "",
                  type: "is-danger",
                },
              ],
            };
          });
          return;
        }
      });
    },
  },
  mounted() {
    this.fetchViewedStudentDetails();
    this.fetchConnectionRequests();
  },
  watch: {
    $route: {
      handler: ["fetchViewedStudentDetails", "fetchConnectionRequests"],
    },
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  border-right: 2px solid rgba(7, 32, 93, 1);
  padding-right: 10px;
}
</style>
