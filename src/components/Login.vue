<template>
  <div class="background">
    <div
      class="columns is-flex is-align-items-center is-justify-content-center height-style"
    >
      <div class="column is-6"></div>
      <div class="column is-5 half-bg has-text-centered py-4">
        <p>
          <strong class="has-text-primary-dark is-size-1">Welcome Back,</strong>
        </p>
        <p class="has-text-primary-dark font-size-one">Let's Sign in</p>
        <div class="px-4">
          <b-field class="mt-5">
            <b-input
              placeholder="Enter your username"
              size="is-large"
              v-model="username"
              rounded
            />
          </b-field>
          <b-field class="mt-5">
            <b-input
              placeholder="Enter your password"
              type="password"
              size="is-large"
              icon-right="close-circle"
              icon-right-clickable
              v-model="password"
              rounded
              password-reveal
          /></b-field>
          <b-field class="mt-5">
            <b-select
              placeholder="Select a role"
              rounded
              size="is-large"
              expanded
            >
              <option value="admin">Admin</option>
              <option value="tutors">Tutors</option>
              <option value="students">Students</option>
            </b-select>
          </b-field>
          <b-button
            type="is-primary"
            size="is-large"
            class="mt-6 mb-6"
            :disabled="invalid"
            expanded
            rounded
            @click="
              () => {
                $router.push(`/dashboard`);
              }
            "
            >Sign In</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
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
