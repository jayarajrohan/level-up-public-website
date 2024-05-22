div
<template>
  <div>
    <div class="columns top-bar py-1 px-2">
      <div class="column">
        <div class="logo">Level-Up</div>
      </div>

      <div class="column is-narrow">
        <b-tooltip label="Log Out" position="is-left">
          <img
            src="@/assets/images/logoutButton.webp"
            alt="Log Out"
            class="cover-style"
            width="50px"
            @click="
              () => {
                $router.push(`/`);
              }
            "
          />
        </b-tooltip>
      </div>
    </div>

    <div style="margin-inline: 100px" class="mt-4">
      <div class="columns v-centered">
        <div class="column">
          <p class="has-text-primary is-size-4">Profile</p>
        </div>
        <div class="column is-narrow">
          <b-button
            class="is-primary is-size-5 ml-5 continue-button-width"
            @click="
              () => {
                isEditDetail = true;
              }
            "
            >Edit your details</b-button
          >
        </div>
      </div>

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
                      readonly="!isEditDetail"
                      placeholder="Enter user name"
                    /><span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column">
                <label
                  >Password<span class="has-text-danger ml-1">*</span></label
                >
                <b-field>
                  <ValidationProvider
                    name="Password"
                    :rules="{ required: true }"
                    v-slot="{ errors }"
                  >
                    <b-input
                      type="text"
                      readonly="!isEditDetail"
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
                        readonly="!isEditDetail"
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

            <div class="is-flex mr-4 buttons-place">
              <b-button
                class="is-size-5 cancel-button"
                @click="$router.go(-1)"
                v-if="!isEditDetail"
                >Back</b-button
              >

              <b-button
                class="is-size-5 cancel-button"
                v-if="isEditDetail"
                @click="
                  () => {
                    isEditDetail = false;
                  }
                "
                >Cancel</b-button
              >
              <b-button
                v-if="isEditDetail"
                :disabled="invalid || availability === undefined"
                class="is-primary is-size-5 ml-5 continue-button-width"
                >Save</b-button
              >
            </div>
          </div>
        </form></ValidationObserver
      >
    </div>
  </div>
</template>

<script>
import "@/shared/validate.js";

export default {
  name: "StudentProfileView",
  data() {
    return {
      password: "",
      studentEmail: "",
      username: "",
      studentName: "",
      isEditDetail: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.buttons-place {
  position: absolute;
  bottom: 25px;
  right: 80px;
}
</style>
