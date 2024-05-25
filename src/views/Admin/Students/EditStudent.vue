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
          <div class="mt-4">
            <p
              class="has-text-danger is-underlined is-size-5 pointer-style"
              @click="isChangePassword = true"
            >
              Change password
            </p>
          </div>
          <div class="is-flex mr-4 button-place">
            <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
              >Cancel</b-button
            >

            <b-button
              class="is-primary is-size-5 ml-5 continue-button-width"
              :disabled="invalid"
              @click="onEditStudent"
              >Save</b-button
            >
          </div>
        </div>
      </form></ValidationObserver
    >

    <b-modal
      v-model="isChangePassword"
      scroll="keep"
      :width="540"
      :can-cancel="false"
    >
      <div class="model_box mt-3 mx-2">
        <div style="transition-timing-function: ease-in-out">
          <div class="modal-close-button is-pulled-right mb-6">
            <button
              class="delete"
              aria-label="close"
              @click="
                () => {
                  currentPassword = ``;
                  confirmNewPassword = ``;
                  newPassword = ``;
                  isChangePassword = false;
                }
              "
            ></button>
          </div>
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="">
              <div>
                <p class="has-text-danger is-size-4 has-text-centered">
                  Change Password
                </p>
                <div class="mt-4">
                  <label
                    >Current password<span class="has-text-danger ml-1"
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
                        v-model="currentPassword"
                        placeholder="Enter password"
                      />
                      <span class="has-text-danger error-massage">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </b-field>
                </div>

                <div class="mt-4">
                  <label
                    >New password<span class="has-text-danger ml-1"
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
                        v-model="newPassword"
                        placeholder="Enter password"
                      />
                      <span class="has-text-danger error-massage">{{
                        errors[0]
                      }}</span>
                    </ValidationProvider>
                  </b-field>
                </div>
                <div class="mt-4">
                  <label
                    >Confirm new password<span class="has-text-danger ml-1"
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
                        v-model="confirmNewPassword"
                        placeholder="Confirm password"
                      />
                      <span class="has-text-danger error-massage">{{
                        errors[0]
                      }}</span>
                      <span
                        class="has-text-danger error-massage"
                        v-if="newPassword !== confirmNewPassword && !errors[0]"
                        >Password does't match</span
                      >
                    </ValidationProvider>
                  </b-field>
                </div>
              </div>
              <div
                class="has-text-centered mt-5"
                style="transition-timing-function: ease-in-out"
              >
                <b-button
                  class="py-5 mr-5"
                  @click="
                    () => {
                      currentPassword = ``;
                      confirmNewPassword = ``;
                      newPassword = ``;
                      isChangePassword = false;
                    }
                  "
                  style="
                    width: 200px !important;
                    background-color: rgba(224, 225, 225, 1);
                  "
                  >Cancel
                </b-button>
                <b-button
                  type="is-danger"
                  class="py-5 mr-5"
                  :disabled="invalid || newPassword !== confirmNewPassword"
                  @click="onChangePassword"
                  style="width: 200px !important"
                  >Save
                </b-button>
              </div>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </b-modal>
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
    return {
      newPassword: "",
      studentEmail: "",
      username: "",
      studentName: "",
      isChangePassword: false,
      currentPassword: "",
      confirmNewPassword: "",
    };
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
    onChangePassword() {
      const studentId = this.$route.params.studentId;
      apiRequestManager(
        "put",
        `/admin/student/update-password/${studentId}`,
        { password: this.newPassword, currentPassword: this.currentPassword },
        {},
        (res) => {
          if (res.status === 200) {
            showSuccessToast("Student password updated successfully");
            this.confirmNewPassword = "";
            this.currentPassword = "";
            this.newPassword = "";
            this.isChangePassword = false;
            return;
          }

          if (res.status === 404) {
            showFailureToast("Student doesn't exist");
            return;
          }
          if (res.status === 422) {
            showFailureToast("Current password is wrong");
            return;
          }
        }
      );
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
