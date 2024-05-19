<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Create Tutor</p>
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
              <div class="column mr-4">
                <p class="font-size-one font-color-one">Contact Details</p>
                <div class="mt-3">
                  <div class="columns is-vcentered">
                    <div class="column is-4">
                      <label>Mobile Number</label>
                    </div>
                    <div class="column">
                      <b-field>
                        <b-input type="text" v-model="mobileNumber" />
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
                        <b-input type="text" v-model="whatsAppNumber" />
                      </b-field>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column">
                <p class="font-size-one font-color-one">Social Media Details</p>
                <div class="mt-3">
                  <div class="columns is-vcentered">
                    <div class="column is-4">
                      <label>Facebook </label>
                    </div>
                    <div class="column">
                      <b-field>
                        <b-input type="text" v-model="facebook" />
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
                        <b-input type="text" v-model="twitter" />
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
                        <b-input type="text" v-model="linkedIn" />
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
                        <b-input type="text" v-model="youtube" />
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
                  <div class="columns expertise-list">
                    <div
                      v-for="(entry, entryIndex) in expertiseList"
                      :key="entryIndex"
                      class="expertise-item-list"
                    >
                      <b-checkbox v-model="expertise" :native-value="expertise">
                        {{ entry }}
                      </b-checkbox>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column"></div>
            </div>
          </div>
          <div class="is-flex mr-4 button-place">
            <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
              >Cancel</b-button
            >

            <b-button
              :disabled="invalid"
              class="is-primary is-size-5 ml-5 continue-button-width"
              >Create Tutor</b-button
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
  name: "CreateTutorsView",
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
      username: "",
      password: "",
      name: "",
      email: "",
      expertise: [],
      mobileNumber: "",
      whatsAppNumber: "",
      facebook: "",
      twitter: "",
      linkedIn: "",
      youtube: "",
    };
  },
  methods: {
    removeItem(item) {
      if (this.expertise.includes(item)) {
        this.expertise = this.expertise.filter((element) => element !== item);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
