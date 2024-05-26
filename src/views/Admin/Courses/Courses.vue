<template>
  <div>
    <transition name="route" mode="out-in">
      <div class="mx-5 my-3" v-if="$route.name === `Courses`">
        <div class="columns is-vcentered">
          <div class="column">
            <p class="has-text-primary is-size-4">All Courses Detail</p>
          </div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              class="mr-10"
              expanded
              @click="
                () => {
                  $router
                    .push(`/admin/dashboard/courses/create`)
                    .catch(() => []);
                }
              "
              >Create Course</b-button
            >
          </div>
        </div>
        <div class="mt-4 mx-4">
          <AppTable
            :data="courseData"
            :columns="courseHeader"
            row-class-one="striped-table-color-2"
            rowClassTwo="striped-table-color"
          />
        </div>
        <b-modal
          v-model="isModalActive"
          scroll="keep"
          :width="540"
          :can-cancel="false"
        >
          <div class="model_box mt-3 mx-2">
            <div
              class="has-text-centered"
              style="transition-timing-function: ease-in-out"
            >
              <div class="modal-close-button is-pulled-right mb-6">
                <button
                  class="delete"
                  aria-label="close"
                  @click="isModalActive = false"
                ></button>
              </div>
              <div>
                <img
                  src="@/assets/images/delete.webp"
                  responsive
                  class="complete_img"
                />
                <p class="has-text-danger is-size-4">Delete</p>

                <p>Are you sure you want to delete {{ deleteCourseName }}?</p>
              </div>
              <div
                class="has-text-centered mt-5"
                style="transition-timing-function: ease-in-out"
              >
                <b-button
                  class="py-5 mr-5"
                  @click="isModalActive = false"
                  style="
                    width: 200px !important;
                    background-color: rgba(224, 225, 225, 1);
                  "
                  >Cancel
                </b-button>
                <b-button
                  type="is-danger"
                  class="py-5 mr-5"
                  @click="onDeleteCourse"
                  style="width: 200px !important"
                  >Delete
                </b-button>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </transition>
    <transition name="route" mode="out-in">
      <router-view></router-view
    ></transition>
  </div>
</template>

<script>
import AppTable from "@/shared/appTable.vue";
import {
  apiRequestManager,
  showFailureToast,
  showSuccessToast,
} from "@/util/util";
export default {
  name: "CoursesView",
  components: {
    AppTable,
  },
  data() {
    const courseHeader = [
      {
        field: "id",
        label: "ID",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "courseName",
        label: "Course Name",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "description",
        label: "Description",
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
      courseHeader,
      courseData: [],
      isModalActive: false,
      deleteCourseName: "",
      deleteCourseId: "",
    };
  },
  methods: {
    fetchCourseDetails() {
      apiRequestManager("get", "/admin/courses", {}, {}, (res) => {
        if (res.status === 200) {
          this.courseData = res.data.courses.map((course) => {
            return {
              id: course._id,
              courseName: course.courseName,
              description: course.description || "",

              button: [
                {
                  text: "Edit",
                  icon: "",
                  type: "is-primary",
                  onClick: () => {
                    this.$router
                      .push(`/admin/dashboard/courses/edit/${course._id}`)
                      .catch(() => []);
                  },
                },
                {
                  text: "Delete",
                  onClick: () => {
                    this.deleteCourseId = course._id;
                    this.deleteCourseName = course.courseName;
                    this.isModalActive = true;
                  },
                  type: "is-danger",
                },
              ],
            };
          });
          return;
        }

        if (res.status === 400) {
          showFailureToast("Validation failed in one of the fields");
          return;
        }

        if (res.status === 409) {
          showFailureToast("Username already exist");
          return;
        }
      });
    },
    onDeleteCourse() {
      apiRequestManager(
        "delete",
        `/admin/course/delete/${this.deleteCourseId}`,
        {},
        {},
        (res) => {
          if (res.status === 200) {
            this.fetchCourseDetails();
            showSuccessToast("Course deleted successfully");
            this.isModalActive = false;
            return;
          }
        }
      );
    },
  },
  watch: {
    $route: "fetchCourseDetails",
  },
  mounted() {
    this.fetchCourseDetails();
  },
};
</script>

<style lang="scss" scoped></style>
