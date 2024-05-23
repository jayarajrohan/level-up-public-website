<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Edit Student Detail</p>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="">
        <div class="mt-4 mx-4">
          <div class="columns">
            <div class="column mr-4">
              <label
                >User Name<span class="has-text-danger ml-1">*</span></label
              >
              <b-field>
                <ValidationProvider
                  name="Username"
                  :rules="{ required: true, onlyAlphaNumericsAndUnderscores: true, min:5}, "
                  v-slot="{ errors }"
                >
                  <b-input
                    type="text"
                    v-model="username"
                    placeholder="Enter username"
                  />
                  <span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
            </div>
            <div class="column">
              <label>Name</label>
              <b-field>
                <ValidationProvider
                  name="Name"
                  :rules="{ min:3}, "
                  v-slot="{ errors }"
                >
                  <b-input
                    type="text"
                    v-model="studentName"
                    placeholder="Enter name"
                  /><span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
            </div>
          </div>
          <div class="mt-4">
            <div class="columns">
              <div class="column mr-4">
                <label>Email</label>
                <b-field>
                  <ValidationProvider
                    name="Email"
                    :rules="{ email: true }"
                    v-slot="{ errors }"
                  >
                    <b-input
                      type="text"
                      v-model="studentEmail"
                      placeholder="Enter email"
                    />
                    <span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column"></div>
            </div>
          </div>
          <div class="is-flex mr-4 button-place">
            <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
              >Cancel</b-button
            >

            <b-button
              class="is-primary is-size-5 ml-5 continue-button-width"
              :disabled="invalid"
              @click="onEditStudent"
              >Edit Student</b-button
            >
          </div>
        </div>
      </form></ValidationObserver
    >
  </div>
</template>

<script>
import "@/shared/validate.js";
import {
  apiRequestManager,
  showFailureToast,
  showSuccessToast,
} from "@/util/util";

export default {
  name: "EditStudentsView",
  data() {
    return { password: "", studentEmail: "", username: "", studentName: "" };
  },
  methods: {
    getStudentDetails() {
      const studentId = this.$route.params.studentId;
      apiRequestManager("get", `/admin/student/${studentId}`, {}, {}, (res) => {
        if (res.status === 200) {
          this.username = res.data.student.username;
          this.studentName = res.data.student.name || "";
          this.studentEmail = res.data.student.email || "";
          return;
        }

        if (res.status === 404) {
          showFailureToast("Student doesn't exist");
          return;
        }
      });
    },
    onEditStudent() {
      const studentId = this.$route.params.studentId;
      apiRequestManager(
        "put",
        `/admin/student/update/${studentId}`,
        {
          username: this.username,
          email: this.studentEmail,
          name: this.studentName,
        },
        {},
        (res) => {
          if (res.status === 200) {
            showSuccessToast("Student updated successfully");
            this.$router.push("/admin/dashboard/students");
            return;
          }
          if (res.status === 400) {
            showFailureToast("Validation failed in one of the fields");
            return;
          }
          if (res.status === 404) {
            showFailureToast("Student doesn't exist");
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
  mounted() {
    this.getStudentDetails();
  },
};
</script>

<style lang="scss" scoped></style>
