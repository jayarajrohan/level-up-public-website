<template>
  <div class="background">
    <div
      class="columns is-flex is-align-items-center is-justify-content-center height-style"
    >
      <div class="column is-6"></div>
      <div class="column is-5 half-bg py-4">
        <p class="has-text-centered">
          <strong class="has-text-primary-dark is-size-1">Welcome Back,</strong>
        </p>
        <p class="has-text-primary-dark font-size-one has-text-centered">
          Let's Sign in
        </p>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="">
            <div class="px-4">
              <b-field class="mt-5">
                <ValidationProvider
                  name="Username"
                  :rules="{ required: true, onlyAlphaNumericsAndUnderscores: true, min:5}, "
                  v-slot="{ errors }"
                >
                  <b-input
                    placeholder="Enter your username"
                    size="is-large"
                    v-model="username"
                    rounded
                  />
                  <span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
              <b-field class="mt-5">
                <ValidationProvider
                  name="Password"
                  :rules="{ required: true, password: true}, "
                  v-slot="{ errors }"
                >
                  <b-input
                    placeholder="Enter your password"
                    type="password"
                    size="is-large"
                    icon-right="close-circle"
                    icon-right-clickable
                    v-model="password"
                    rounded
                    password-reveal
                  /><span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider></b-field
              >
              <b-field class="mt-5">
                <ValidationProvider
                  name="Role"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-select
                    placeholder="Select a role"
                    rounded
                    v-model="role"
                    size="is-large"
                    expanded
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                    <option value="tutor">Tutor</option>
                  </b-select>
                  <span class="has-text-danger error-massage">{{
                    errors[0]
                  }}</span>
                </ValidationProvider>
              </b-field>
              <b-button
                type="is-primary"
                size="is-large"
                class="mt-6 mb-6"
                :disabled="invalid"
                expanded
                rounded
                @click="onLogin"
                >Sign In</b-button
              >
            </div>
          </form></ValidationObserver
        >
      </div>
    </div>
  </div>
</template>

<script>
import "@/shared/validate.js";
import {
  apiRequestManager,
  showSuccessToast,
  showFailureToast,
} from "@/util/util";

export default {
  name: "LogIn",
  props: {
    msg: String,
  },
  data() {
    return { password: "", role: "student", username: "" };
  },
  methods: {
    onLogin() {
      if (this.role === "admin") {
        apiRequestManager(
          "post",
          "/admin/login",
          {
            username: this.username,
            password: this.password,
          },
          {},
          (res) => {
            if (res.status === 200) {
              showSuccessToast("Login success");
              localStorage.setItem("role", res.data.role);
              localStorage.setItem("token", res.data.token);
              this.$router.push(`/admin/dashboard`);
              return;
            }
            if (res.status === 400) {
              showFailureToast("Username or Password validation failed");
              return;
            }
            if (res.status === 404) {
              showFailureToast("Admin doesn't exist");
              return;
            }
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.background {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333 !important;
  overflow: hidden !important;
  background: url("@/assets/images/book.webp") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  min-height: 100vh;
}
.height-style {
  min-height: calc(100vh - 0px) !important;
}
.half-bg {
  box-shadow: 20px rgba(0, 0, 0, 0.25);
  width: 500px;
  background-color: rgb(196, 193, 193);
  backdrop-filter: blur(16.617048263549805px);
  border-radius: 22px;
}
</style>
