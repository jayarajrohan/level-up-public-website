<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Create Course</p>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="">
        <div class="mt-4 mx-4">
          <div class="columns">
            <div class="column mr-4">
              <label
                >Course Name<span class="has-text-danger ml-1">*</span></label
              >
              <b-field>
                <ValidationProvider
                  name="Course name"
                  :rules="{ required: true, min: 5 }"
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
                  :rules="{ required: true, min: 10 }"
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
              @click="onCreateCourse"
              >Create Course</b-button
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
  showSuccessToast,
  showFailureToast,
} from "@/util/util";

export default {
  name: "CreateCourseView",
  data() {
    return { description: "", courseName: "", isLoading: false };
  },
  components: {
    AppLoader,
  },
  methods: {
    onCreateCourse() {
      this.isLoading = true;
      apiRequestManager(
        "post",
        "/admin/course/create",
        {
          courseName: this.courseName,
          description: this.description,
        },
        {},
        (res) => {
          this.isLoading = false;
          if (res.status === 201) {
            this.courseName = "";
            this.description = "";
            showSuccessToast("Course created successfully");
            this.$router.go(-1);
            return;
          }

          if (res.status === 400) {
            showFailureToast("Validation failed in one of the fields");
            return;
          }

          if (res.status === 409) {
            showFailureToast("Course with same name already exist");
            return;
          }
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
