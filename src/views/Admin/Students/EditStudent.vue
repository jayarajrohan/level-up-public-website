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
                  :rules="{ required: true }"
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
              <label>Password<span class="has-text-danger ml-1">*</span></label>
              <b-field>
                <ValidationProvider
                  name="Password"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <b-input
                    type="text"
                    v-model="password"
                    placeholder="Enter password"
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
                <label>Name</label>
                <b-field>
                  <b-input
                    type="text"
                    v-model="studentName"
                    readonly="!isEditDetail"
                    placeholder="Enter name"
                  />
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
              :disabled="invalid"
              >Create Student</b-button
            >
          </div>
        </div>
      </form></ValidationObserver
    >
  </div>
</template>

<script>
import "@/shared/validate.js";
export default {
  name: "EditStudentsView",
  data() {
    return { password: "", studentEmail: "", username: "", studentName: "" };
  },
};
</script>

<style lang="scss" scoped></style>
