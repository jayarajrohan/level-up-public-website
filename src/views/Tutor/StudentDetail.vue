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
            class="hover-style"
            width="50px"
            @click="
              () => {
                $router.push(`/`).catch(() => []);
              }
            "
          />
        </b-tooltip>
      </div>
    </div>

    <div style="margin-inline: 100px" class="mt-4">
      <div class="columns is-vcentered">
        <div class="column">
          <p class="has-text-primary is-size-4">Student profile</p>
        </div>
      </div>

      <ValidationObserver v-slot="{}">
        <form @submit.prevent="">
          <div class="mt-4 mx-4">
            <div class="columns">
              <div class="column mr-4">
                <label>User Name</label>
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
                    <ValidationProvider
                      name="Name"
                      :rules="{ min:3}, "
                      v-slot="{ errors }"
                    >
                      <b-input
                        type="text"
                        v-model="studentName"
                        readonly
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
                        readonly
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
            <div class="mt-4">
              <div class="columns">
                <div class="column mr-4">
                  <label>Recently viewed date</label>
                  <b-field>
                    <b-input type="text" readonly v-model="recentDate" />
                  </b-field>
                </div>
                <div class="column">
                  <label>Count</label>
                  <b-field>
                    <b-input type="text" readonly v-model="count" />
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
            </div>
          </div>
        </form></ValidationObserver
      >
    </div>
    <AppLoader :isLoading="isLoading" />
  </div>
</template>

<script>
import "@/shared/validate.js";
import AppLoader from "@/components/AppLoader/appLoader.vue";
import { apiRequestManager } from "@/util/util";
export default {
  name: "StudentProfileView",
  components: {
    AppLoader,
  },
  data() {
    return {
      studentEmail: "",
      username: "",
      studentName: "",
      count: 0,
      recentDate: "",
      isLoading: false,
    };
  },
  methods: {
    fetchStudentDetails() {
      this.isLoading = true;
      const studentId = this.$route.params.studentId;
      apiRequestManager(
        "get",
        `/tutor/view-student/${studentId}`,
        {},
        {},
        (res) => {
          this.isLoading = false;
          if (res.status === 200) {
            const student = res.data.student;
            this.username = student.username;
            this.studentName = student.name || "";
            this.studentEmail = student.email || "";
            this.count = this.$root.count;
            this.recentDate = this.$root.recentDate;
            return;
          }
        }
      );
    },
  },
  mounted() {
    this.fetchStudentDetails();
  },
  watch: {
    $route: "fetchStudentDetails",
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
