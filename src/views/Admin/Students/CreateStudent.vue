<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Create Student</p>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="" autocomplete="off">
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
          </div>
          <div class="mt-4">
            <div class="columns">
              <div class="column mr-4">
                <label
                  >Password<span class="has-text-danger ml-1">*</span></label
                >
                <b-field>
                  <ValidationProvider
                    name="Password"
                    :rules="{ required: true, password: true}, "
                    v-slot="{ errors }"
                  >
                    <b-input
                      type="password"
                      v-model="password"
                      placeholder="Enter password"
                    />
                    <span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column">
                <label
                  >Confirm password<span class="has-text-danger ml-1"
                    >*</span
                  ></label
                >
                <b-field>
                  <ValidationProvider
                    name="Password"
                    :rules="{ required: true, password: true}, "
                    v-slot="{ errors }"
                  >
                    <b-input
                      type="password"
                      v-model="confirmPassword"
                      placeholder="Confirm password"
                    />
                    <span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                    <span
                      class="has-text-danger error-massage"
                      v-if="password !== confirmPassword && !errors[0]"
                      >Password does't match</span
                    >
                  </ValidationProvider>
                </b-field>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="columns">
              <div class="column mr-4">
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
                    />
                    <span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column">
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
            </div>
          </div>
          <div class="is-flex mr-4 button-place">
            <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
              >Cancel</b-button
            >

            <b-button
              class="is-primary is-size-5 ml-5 continue-button-width"
              :disabled="invalid || password !== confirmPassword"
              @click="onCreateStudent"
              >Create Student</b-button
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
  name: "CreateStudentsView",
  data() {
    return {
      password: "",
      studentEmail: "",
      username: "",
      studentName: "",
      confirmPassword: "",
      isLoading: false,
    };
  },
  components: {
    AppLoader,
  },
  methods: {
    onCreateStudent() {
      this.isLoading = true;
      apiRequestManager(
        "post",
        "/admin/student/create",
        {
          username: this.username,
          password: this.password,
          name: this.studentName,
          email: this.studentEmail,
        },
        {},
        (res) => {
          this.isLoading = false;
          if (res.status === 201) {
            this.username = "";
            this.password = "";
            this.studentName = "";
            this.studentEmail = "";
            showSuccessToast("Student created successfully");
            this.$router.go(-1);
            return;
          }

          if (res.status === 400) {
            showFailureToast("Username or Password validation failed");
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
};
</script>

<style lang="scss" scoped></style>
