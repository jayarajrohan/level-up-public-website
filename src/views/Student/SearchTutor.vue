<template>
  <div>
    <div style="margin-inline: 100px" class="mt-4">
      <p class="has-text-primary is-size-4 mt-4">
        Tutors you are connected with
      </p>
      <b-message
        type="is-info"
        has-icon
        class="mt-4 is-size-5"
        v-if="connectedTutors.length === 0"
      >
        Details of tutors you are connected with will appear here
      </b-message>
      <div class="mt-4" v-if="connectedTutors.length !== 0">
        <AppTable
          :data="connectedTutors"
          :columns="connectedTutorHeader"
          row-class-one="striped-table-color-2"
          rowClassTwo="striped-table-color"
        />
      </div>
    </div>
    <div>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="">
          <div style="margin-inline: 100px" class="mt-4">
            <div class="columns is-vcentered">
              <div class="column">
                <p class="has-text-primary is-size-4">
                  Search tutors according to the courses you prefer and/or your
                  availability
                </p>
              </div>
              <div class="column is-narrow">
                <b-button
                  :disabled="invalid"
                  class="is-primary is-size-5 ml-5 continue-button-width"
                  @click="onSearchTutor"
                  >Search</b-button
                >
              </div>
            </div>

            <div class="mt-6">
              <label class="is-size-5">Courses</label>
              <div class="mt-2">
                <div class="columns expertise-list">
                  <div
                    v-for="expertiseItem in expertiseList"
                    :key="expertiseItem.id"
                    class="expertise-item-list"
                  >
                    <b-checkbox v-model="courses" :native-value="expertiseItem">
                      {{ expertiseItem.name }}
                    </b-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <label>Availability</label>
              <div class="mt-2">
                <AvailableDayAndTime
                  @getDetails="
                    (value) => {
                      availabilityDetail(value);
                    }
                  "
                />
              </div>
            </div>
            <div
              class="mt-4 mx-4"
              v-if="tutorData.length === 0 && isSearchClicked"
            >
              <b-message type="is-danger" has-icon class="mt-4 is-size-5">
                There aren't any tutors available for the filters you applied.
                Please modify filters and try again
              </b-message>
            </div>
            <div class="mt-4 mx-4" v-if="tutorData.length !== 0">
              <AppTable
                :data="tutorData"
                :columns="tutorHeader"
                row-class-one="striped-table-color-2"
                rowClassTwo="striped-table-color"
              />
            </div>
          </div></form
      ></ValidationObserver>
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import "@/shared/validate.js";
import AppTable from "@/components/AppTable/appTable.vue";
import AvailableDayAndTime from "@/components/AvailableDayAndTime/AvailableDayAndTime.vue";
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager, showSuccessToast } from "@/util/util";
import moment from "moment";
export default {
  name: "FindTutor",
  components: {
    AvailableDayAndTime,
    AppTable,
    AppLoader,
  },
  data() {
    const tutorHeader = [
      {
        field: "username",
        label: "User name",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "name",
        label: "Name",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "email",
        label: "Email",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "button",
        label: "Action",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: false,
      },
    ];

    const connectedTutorHeader = [
      {
        field: "id",
        label: "ID",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "button",
        label: "Action",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: false,
      },
    ];

    return {
      expertiseList: [],
      courses: [],
      tutorHeader,
      connectedTutorHeader,
      tutorData: [],
      availability: [],
      isLoading: false,
      isSearchClicked: false,
      connectedTutors: [],
    };
  },
  methods: {
    requestActionLabel(currentStatus) {
      const seconds = moment(new Date()).diff(
        moment(currentStatus.requestDate),
        "seconds"
      );

      if (
        !currentStatus ||
        (currentStatus.requestStatus === "rejected" && seconds > 604800)
      ) {
        return "Connect";
      }

      if (currentStatus.requestStatus === "accepted") {
        return "Connection 🤝";
      }

      if (currentStatus.requestStatus === "pending") {
        return "Pending";
      }

      const duration = moment.duration(604800 - seconds, "seconds");

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();
      const minutes = duration.minutes();
      const secs = duration.seconds();

      const formattedDuration = `${days} Days, ${hours} Hours, ${minutes} Minutes and ${secs} Seconds`;

      return `Wait ${formattedDuration} to send a new request`;
    },

    requestAction(currentStatus, tutorId) {
      if (
        currentStatus &&
        (currentStatus.requestStatus !== "rejected" || seconds <= 604800)
      ) {
        return;
      }

      this.isLoading = true;
      const seconds = moment(new Date()).diff(
        moment(currentStatus.requestDate),
        "seconds"
      );

      apiRequestManager(
        "get",
        `/student/connect-tutor/${tutorId}`,
        {},
        {},
        (res) => {
          this.isLoading = false;
          if (res.status === 200) {
            showSuccessToast("Connection request sent successfully");
            this.onSearchTutor();
          }
        }
      );
    },
    availabilityDetail(value) {
      this.availability = value;
    },
    onLogout() {
      this.isLoading = true;
      apiRequestManager("get", "/student/logout", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          showSuccessToast("Logged out successfully");
          localStorage.removeItem("token");
          this.$router.push(`/`).catch(() => []);
        }
      });
    },
    onSearchTutor() {
      this.isLoading = true;
      apiRequestManager(
        "post",
        "/student/find-tutors",
        {
          courses: this.courses.map((course) => course.name),
          availability: this.availability || [],
        },
        {},
        (res) => {
          this.isLoading = false;
          this.isSearchClicked = true;
          if (res.status === 200) {
            this.tutorData = res.data.tutors.map((tutor) => {
              return {
                id: tutor._id,
                username: tutor.username,
                email: tutor.email || "",
                name: tutor.name || "",
                button: [
                  {
                    text: this.requestActionLabel(tutor.requestStatusWithTutor),
                    onClick: () => {
                      this.requestAction(
                        tutor.requestStatusWithTutor,
                        tutor._id
                      );
                    },
                    icon: "",
                    type: "is-primary",
                  },
                  {
                    text: "View",
                    onClick: () => {
                      this.$router
                        .push(`/student/tutor-details/${tutor._id}`)
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
        }
      );
    },
    fetchCourses() {
      this.isLoading = true;
      apiRequestManager("get", "/student/courses", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.expertiseList = res.data.courses.map((course) => {
            return { name: course.courseName, id: course._id };
          });
          return;
        }
      });
    },
    fetchConnectedTutors() {
      this.isLoading = true;
      apiRequestManager("get", "/student/connected-tutors", {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          this.connectedTutors = res.data.connectedTutors.map(
            (connectedTutor) => {
              return {
                id: connectedTutor,
                button: [
                  {
                    text: "View",
                    onClick: () => {
                      this.$router
                        .push(`/student/tutor-details/${connectedTutor}`)
                        .catch(() => []);
                    },
                    icon: "",
                    type: "is-primary",
                  },
                ],
              };
            }
          );
          return;
        }
      });
    },
  },
  mounted() {
    this.fetchCourses();
    this.fetchConnectedTutors();
  },
  watch: {
    $route: {
      handler: ["fetchCourses", "fetchConnectedTutors"],
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
