<template>
  <div class="mx-5 my-3">
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="">
        <p class="has-text-primary is-size-4">Edit Course</p>
        <div class="mt-4 mx-4">
          <div class="columns">
            <div class="column mr-4">
              <label
                >Course Name<span class="has-text-danger ml-1">*</span></label
              >
              <b-field>
                <ValidationProvider
                  name="Course name"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-input
                    type="text"
                    v-model="courseName"
                    placeholder="Enter course name"
                  />
                  <span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
            </div>
            <div class="column">
              <label
                >Description<span class="has-text-danger ml-1">*</span></label
              >
              <b-field>
                <ValidationProvider
                  name="Description"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-input
                    type="textarea"
                    v-model="description"
                    placeholder="Enter description"
                  />
                  <span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
            </div>
          </div>

          <div class="is-flex mr-4 button-place">
            <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
              >Cancel</b-button
            >

            <b-button
              class="is-primary is-size-5 ml-5 continue-button-width"
              :disabled="invalid"
              @click="onEditCourse"
              >Save</b-button
            >
          </div>
        </div>
      </form></ValidationObserver
    >
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import "@/shared/validate.js";
import AppLoader from "@/components/AppLoader/appLoader.vue";
import {
  apiRequestManager,
  showFailureToast,
  showSuccessToast,
} from "@/util/util";
export default {
  name: "EditCourseView",
  data() {
    return { description: "", courseName: "", isLoading: false };
  },
  components: {
    AppLoader,
  },
  mounted() {
    this.getCourseDetails();
  },
  methods: {
    getCourseDetails() {
      const courseId = this.$route.params.courseId;
      apiRequestManager("get", `/admin/course/${courseId}`, {}, {}, (res) => {
        if (res.status === 200) {
          this.courseName = res.data.course.courseName;
          this.description = res.data.course.description;
          return;
        }

        if (res.status === 404) {
          showFailureToast("Course doesn't exist");
          return;
        }
      });
    },
    onEditCourse() {
      const courseId = this.$route.params.courseId;
      apiRequestManager(
        "put",
        `/admin/course/update/${courseId}`,
        {
          courseName: this.courseName,
          description: this.description,
        },
        {},
        (res) => {
          if (res.status === 200) {
            showSuccessToast("Course updated successfully");
            this.$router.go(-1);
            return;
          }
          if (res.status === 400) {
            showFailureToast("Validation failed in one of the fields");
            return;
          }
          if (res.status === 404) {
            showFailureToast("Course doesn't exist");
            return;
          }
          if (res.status === 409) {
            showFailureToast("Username already exist");
            return;
          }
        }
      );
    },
  },
  watch: {
    $route: "getCourseDetails",
  },
};
</script>

<style lang="scss" scoped></style>
