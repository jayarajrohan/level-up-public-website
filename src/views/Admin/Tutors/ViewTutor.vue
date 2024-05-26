<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Tutor's Details</p>

    <div class="mt-4 mx-4">
      <div class="columns">
        <div class="column mr-4">
          <label>User Name<span class="has-text-danger ml-1">*</span></label>
          <b-field>
            <ValidationProvider
              name="Username"
              :rules="{
                required: true,
                onlyAlphaNumericsAndUnderscores: true,
                min: 5,
              }"
              v-slot="{ errors }"
            >
              <b-input
                type="text"
                v-model="username"
                readonly
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
                readonly
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
                  readonly
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
        <div class="columns">
          <div class="column is-10 mr-4">
            <label>Expertise</label>
            <div class="mx-3 mt-2">
              <div class="columns expertise-list">
                <div
                  v-for="(entry, entryIndex) in expertiseList"
                  :key="entryIndex"
                  class="expertise-item-list"
                >
                  <span class="has-text-danger">* </span>{{ entry }}
                </div>
              </div>
            </div>
          </div>
          <div class="column"></div>
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
            :readonly="true"
          />
        </div>
      </div>
      <div class="mt-4">
        <div class="columns">
          <div class="column mr-6" v-if="mobileNumber || whatsAppNumber">
            <p class="font-size-one font-color-one">Contact Details</p>
            <div class="mt-3" v-if="mobileNumber">
              <div class="columns is-vcentered">
                <div class="column is-narrow mr-4 pointer-style">
                  <a :href="`tel:+94${mobileNumber}`" target="_blank">
                    <font-awesome-icon
                      :icon="['fas', 'phone']"
                      style="font-size: 22px"
                    />
                  </a>
                </div>
                <div class="column is-size-5 is-narrow pointer-style">
                  <a :href="`tel:+94${mobileNumber}`" target="_blank">
                    {{ mobileNumber }}
                  </a>
                </div>
              </div>
            </div>
            <div class="my-4" v-if="whatsAppNumber">
              <div class="columns is-vcentered">
                <div class="column is-narrow mr-4 pointer-style">
                  <a
                    :href="`https://wa.me/+94${whatsAppNumber}`"
                    target="_blank"
                  >
                    <font-awesome-icon
                      :icon="['fab', 'whatsapp']"
                      style="font-size: 30px; color: #075e54"
                    />
                  </a>
                </div>
                <div class="column is-size-5 pointer-style">
                  <a
                    :href="`https://wa.me/+94${whatsAppNumber}`"
                    target="_blank"
                    >{{ whatsAppNumber }}</a
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="column ml-6"
            v-if="facebook || twitter || linkedIn || youtube"
          >
            <p class="font-size-one font-color-one">Social Media Details</p>
            <div class="mt-3">
              <div class="columns">
                <div
                  class="column is-narrow mr-4 pointer-style"
                  v-if="facebook"
                >
                  <a :href="facebook" target="_blank">
                    <font-awesome-icon
                      :icon="['fab', 'facebook']"
                      style="font-size: 40px; color: #1877f2"
                  /></a>
                </div>
                <div class="column is-narrow mr-4 pointer-style" v-if="twitter">
                  <a :href="twitter" target="_blank"
                    ><font-awesome-icon
                      :icon="['fab', 'twitter']"
                      style="font-size: 40px; color: #1da1f2"
                  /></a>
                </div>
                <div
                  class="column is-narrow mr-4 pointer-style"
                  v-if="linkedIn"
                >
                  <a :href="linkedIn" target="_blank">
                    <font-awesome-icon
                      :icon="['fab', 'youtube']"
                      style="font-size: 40px; color: #ff0000"
                  /></a>
                </div>
                <div class="column is-narrow mr-4 pointer-style" v-if="youtube">
                  <a :href="youtube" target="_blank">
                    <font-awesome-icon
                      :icon="['fab', 'linkedin']"
                      style="font-size: 40px; color: #0a66c2"
                  /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="is-flex button-place">
        <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
          >Back</b-button
        >
      </div>
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import "@/shared/validate.js";
import AvailableDayAndTime from "@/components/AvailableDayAndTime/AvailableDayAndTime.vue";
import AppLoader from "@/components/AppLoader/appLoader.vue";
import {
  apiRequestManager,
  showFailureToast,
  convertAvailabilityData,
} from "@/util/util";
export default {
  name: "FindTutor",
  components: { AvailableDayAndTime, AppLoader },
  data() {
    return {
      username: "",
      name: "",
      email: "",
      expertiseList: [],
      courses: [],
      mobileNumber: "",
      whatsAppNumber: "",
      beAvailability: [],
      facebook: "",
      twitter: "",
      linkedIn: "",
      youtube: "",
      isLoading: false,
    };
  },
  methods: {
    fetchTutorDetails() {
      this.isLoading = true;
      const tutorId = this.$route.params.tutorId;
      apiRequestManager("get", `/admin/tutor/${tutorId}`, {}, {}, (res) => {
        this.isLoading = false;
        if (res.status === 200) {
          const tutor = res.data.tutor;
          this.username = tutor.username;
          this.name = tutor.name || "";
          this.email = tutor.email || "";
          this.expertiseList = tutor.expertise || [];
          this.mobileNumber = tutor.contactDetails?.mobileNumber || "";
          this.whatsAppNumber = tutor.contactDetails?.whatsAppNumber || "";
          this.facebook = tutor.contactDetails?.socialMedia?.facebook || "";
          this.twitter = tutor.contactDetails?.socialMedia?.twitter || "";
          this.linkedIn = tutor.contactDetails?.socialMedia?.linkedIn || "";
          this.youtube = tutor.contactDetails?.socialMedia?.youtube || "";
          this.beAvailability = convertAvailabilityData(tutor.availability);
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
    },
  },
  mounted() {
    this.fetchTutorDetails();
  },
  watch: {
    $route: "fetchTutorDetails",
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  border-right: 2px solid rgba(7, 32, 93, 1);
  padding-right: 10px;
}
</style>
