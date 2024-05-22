div
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
          width="35px"
          @click="
            () => {
              $router.push(`/tutor/profileScreen`);
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
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="">
        <div style="margin-inline: 100px" class="mt-4">
          <div class="columns v-centered">
            <div class="column">
              <p class="has-text-primary is-size-4">
                Search tutors according to the courses you prefer and/or your
                availability
              </p>
            </div>
            <div class="column is-narrow">
              <b-button
                :disabled="invalid"
                class="is-primary is-size-5 ml-5 continue-button-width"
                >Search</b-button
              >
            </div>
          </div>

          <div class="mt-6">
            <label class="is-size-5">Courses</label>
            <div class="mt-2">
              <div class="columns expertise-list">
                <div
                  v-for="(entry, entryIndex) in expertiseList"
                  :key="entryIndex"
                  class="expertise-item-list"
                >
                  <b-checkbox v-model="courses" :native-value="courses">
                    {{ entry }}
                  </b-checkbox>
                </div>
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
              />
            </div>
          </div>
        </div></form
    ></ValidationObserver>
  </div>
</template>

<script>
import "@/shared/validate.js";
import AvailableDayAndTime from "@/components/AvailableDayAndTime/AvailableDayAndTime.vue";
export default {
  name: "FindTutor",
  components: {
    AvailableDayAndTime,
  },
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
    };
  },
  methods: {
    availabilityDetail(value) {
      this.availability = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  border-right: 2px solid rgba(7, 32, 93, 1);
  padding-right: 10px;
}
</style>
