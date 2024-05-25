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
      <div class="columns is-vcentered">
        <div class="column">
          <p class="has-text-primary is-size-4">Profile</p>
        </div>
        <div class="column is-narrow" v-if="!isEditDetail">
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
                      :readonly="!isEditDetail"
                      placeholder="Enter user name"
                    /><span class="has-text-danger error-massage">{{
                      errors[0]
                    }}</span>
                  </ValidationProvider>
                </b-field>
              </div>
              <div class="column"></div>
            </div>
            <div class="mt-4">
              <div class="columns">
                <div class="column mr-4">
                  <label>Name</label>
                  <b-field>
                    <b-input
                      type="text"
                      v-model="name"
                      :readonly="!isEditDetail"
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
                        :readonly="!isEditDetail"
                        v-model="email"
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
            <div class="mt-4">
              <label>Availability</label>
              <div class="mt-2">
                <AvailableDayAndTime
                  @getDetails="
                    (value) => {
                      availabilityDetail(value);
                    }
                  "
                  :beAvailability="beAvailability"
                  :readonly="!isEditDetail"
                />
              </div>
            </div>
            <div class="mt-4">
              <div class="columns">
                <div class="column mr-4">
                  <p class="font-size-one font-color-one">Contact Details</p>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>Mobile Number</label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="mobileNumber"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>WhatsApp Number</label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="whatsAppNumber"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="column">
                  <p class="font-size-one font-color-one">
                    Social Media Details
                  </p>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>Facebook </label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="facebook"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>Twitter </label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="twitter"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>LinkedIn </label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="linkedIn"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="columns is-vcentered">
                      <div class="column is-4">
                        <label>Youtube</label>
                      </div>
                      <div class="column">
                        <b-field>
                          <b-input
                            type="text"
                            v-model="youtube"
                            :readonly="!isEditDetail"
                          />
                        </b-field>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="columns">
                <div class="column is-10 mr-4">
                  <label>Expertise</label>
                  <div class="mx-3 mt-2">
                    <div class="columns expertise-list" v-if="!isEditDetail">
                      <div
                        v-for="(entry, entryIndex) in expertiseListOne"
                        :key="entryIndex"
                        class="expertise-item-list"
                      >
                        <span class="has-text-danger">* </span>{{ entry }}
                      </div>
                    </div>
                    <div class="columns expertise-list" v-if="isEditDetail">
                      <div
                        v-for="expertiseItem in expertiseListTwo"
                        :key="expertiseItem.id"
                        class="expertise-item-list"
                      >
                        <b-checkbox
                          v-model="expertise"
                          :native-value="expertiseItem"
                        >
                          {{ expertiseItem.name }}
                        </b-checkbox>
                      </div>
                    </div>
                  </div>
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
            <div class="is-pulled-right my-4">
              <b-button
                class="is-size-5 cancel-button"
                @click="$router.go(-1)"
                v-if="!isEditDetail"
                >Back</b-button
              >

              <b-button
                class="is-size-5 cancel-button"
                v-if="isEditDetail"
                @click="fetchTutorDetails"
                >Cancel</b-button
              >
              <b-button
                v-if="isEditDetail"
                :disabled="invalid"
                class="is-primary is-size-5 ml-5 continue-button-width"
                @click="onEditTutor"
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
                          v-if="
                            newPassword !== confirmNewPassword && !errors[0]
                          "
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
  </div>
</template>

<script>
import "@/shared/validate.js";
import AvailableDayAndTime from "@/components/AvailableDayAndTime/AvailableDayAndTime.vue";
import {
  apiRequestManager,
  showSuccessToast,
  showFailureToast,
  convertAvailabilityData,
} from "@/util/util";

export default {
  name: "EditTutorsView",
  data() {
    return {
      isChangePassword: false,
      currentPassword: "",
      confirmNewPassword: "",
      newPassword: "",
      expertiseListOne: [],
      expertiseListTwo: [],
      username: "",
      name: "",
      email: "",
      isEditDetail: false,
      expertise: [],
      availability: [],
      mobileNumber: "",
      whatsAppNumber: "",
      facebook: "",
      twitter: "",
      linkedIn: "",
      beAvailability: [],
      youtube: "",
    };
  },
  components: {
    AvailableDayAndTime,
  },
  methods: {
    availabilityDetail(value) {
      this.availability = value;
    },
    fetchTutorDetails() {
      apiRequestManager("get", "/tutor/courses", {}, {}, (res) => {
        if (res.status === 200) {
          this.expertiseListTwo = res.data.courses.map((course) => {
            return { name: course.courseName, id: course._id };
          });

          apiRequestManager("get", "/tutor/profile", {}, {}, (res) => {
            if (res.status === 200) {
              const tutor = res.data.tutor;
              this.username = tutor.username;
              this.name = tutor.name || "";
              this.email = tutor.email || "";
              this.expertiseListOne = tutor.expertise || [];
              this.expertise = tutor.expertise
                ? this.expertiseListTwo.filter((expertiseItem) =>
                    tutor.expertise.includes(expertiseItem.name)
                  )
                : [];
              this.mobileNumber = tutor.contactDetails?.mobileNumber || "";
              this.whatsAppNumber = tutor.contactDetails?.whatsAppNumber || "";
              this.facebook = tutor.contactDetails?.socialMedia?.facebook || "";
              this.twitter = tutor.contactDetails?.socialMedia?.twitter || "";
              this.linkedIn = tutor.contactDetails?.socialMedia?.linkedIn || "";
              this.youtube = tutor.contactDetails?.socialMedia?.youtube || "";
              this.beAvailability = convertAvailabilityData(tutor.availability);
              this.isEditDetail = false;
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
        }
      });
    },
    onEditTutor() {
      apiRequestManager(
        "put",
        `/tutor/update`,
        {
          username: this.username,
          name: this.name,
          email: this.email,
          expertise: this.expertise.map((expertiseItem) => {
            return expertiseItem.name;
          }),
          availability: this.availability || [],
          contactDetails: {
            mobileNumber: this.mobileNumber,
            whatsAppNumber: this.whatsAppNumber,
            socialMedia: {
              facebook: this.facebook,
              twitter: this.twitter,
              linkedIn: this.linkedIn,
              youtube: this.youtube,
            },
          },
        },
        {},
        (res) => {
          if (res.status === 200) {
            showSuccessToast("Profile updated successfully");
            this.fetchTutorDetails();
            return;
          }
          if (res.status === 400) {
            showFailureToast("Validation failed in one of the fields");
            return;
          }
          if (res.status === 404) {
            showFailureToast("Tutor doesn't exist");
            return;
          }
          if (res.status === 409) {
            showFailureToast("Username already exist");
            return;
          }
        }
      );
    },
    onChangePassword() {
      apiRequestManager(
        "put",
        "/tutor/update-password",
        { password: this.newPassword, currentPassword: this.currentPassword },
        {},
        (res) => {
          if (res.status === 200) {
            showSuccessToast("Tutor password updated successfully");
            this.confirmNewPassword = "";
            this.currentPassword = "";
            this.newPassword = "";
            this.isChangePassword = false;
            return;
          }

          if (res.status === 404) {
            showFailureToast("Tutor doesn't exist");
            return;
          }
          if (res.status === 422) {
            showFailureToast("Current password is wrong");
            return;
          }
        }
      );
    },
  },
  mounted() {
    this.fetchTutorDetails();
  },
};
</script>

<style lang="scss" scoped></style>
