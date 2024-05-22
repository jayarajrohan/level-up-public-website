<template>
  <div>
    <div class="columns top-bar py-1 px-2">
      <div class="column">
        <div class="logo">Level-Up</div>
      </div>
      <div class="column is-narrow">
        <img
          src="@/assets/images/Profile.webp"
          alt="profile"
          class="cover-style mt-2 border-style"
          width="44px"
          @click="
            () => {
              $router.push(`/student/profileScreen`);
            }
          "
        />
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
          <p class="has-text-primary is-size-4">Tutor's Details</p>
        </div>
      </div>

      <div class="mt-4 mx-4">
        <div class="columns">
          <div class="column mr-4">
            <label>User Name<span class="has-text-danger ml-1">*</span></label>
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
            <label>Password<span class="has-text-danger ml-1">*</span></label>
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
                  v-model="name"
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
            />
          </div>
        </div>
        <div class="mt-4">
          <div class="columns">
            <div class="column mr-6">
              <p class="font-size-one font-color-one">Contact Details</p>
              <div class="mt-3">
                {{ mobileNumber }}
              </div>
              <div class="mt-3">
                {{ whatsAppNumber }}
              </div>
            </div>
            <div class="column ml-6">
              <p class="font-size-one font-color-one">Social Media Details</p>
              <div>
                <font-awesome-icon
                  :icon="['fab', 'facebook']"
                  style="font-size: 50px; color: #00f"
                />
                <font-awesome-icon :icon="['fab', 'twitter']" />
                <font-awesome-icon :icon="['fab', 'youtube']" />
                <font-awesome-icon :icon="['fab', 'whatsapp']" />
                <font-awesome-icon :icon="['fab', 'linkedin']" />
                <font-awesome-icon :icon="['fas', 'user']" />
                <font-awesome-icon :icon="['fas', 'phone']" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "@/shared/validate.js";
import AvailableDayAndTime from "@/components/AvailableDayAndTime/AvailableDayAndTime.vue";
export default {
  name: "FindTutor",
  components: { AvailableDayAndTime },
  data() {
    return {
      expertiseList: [
        "Course 1",
        "Course 2",
        "Course 3",
        "Course 4",
        "Course 5",
        "Course 6",
        "Course 7",
        "Course 8",
      ],
      courses: [],
      mobileNumber: "0710719455",
      whatsAppNumber: "0724926255",
    };
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  border-right: 2px solid rgba(7, 32, 93, 1);
  padding-right: 10px;
}
</style>
