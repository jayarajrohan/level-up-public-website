<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Edit Tutor Detail</p>
    <div class="mt-4 mx-4">
      <div class="columns">
        <div class="column mr-4">
          <label>User Name<span class="has-text-danger ml-1">*</span></label>
          <b-field>
            <b-input
              type="text"
              v-model="username"
              placeholder="Enter user name"
            />
          </b-field>
        </div>
        <div class="column">
          <label>Password<span class="has-text-danger ml-1">*</span></label>
          <b-field>
            <b-input
              type="text"
              v-model="password"
              placeholder="Enter password"
            />
          </b-field>
        </div>
      </div>
      <div class="mt-4">
        <div class="columns">
          <div class="column mr-4">
            <p class="font-size-one">Contact Details</p>
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
            <p class="font-color-one mt-3">Social Media Details</p>
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
          <div class="column"></div>
        </div>
      </div>
      <div class="is-flex mr-4 button-place">
        <b-button class="is-size-5 cancel-button" @click="$router.go(-1)"
          >Cancel</b-button
        >

        <b-button class="is-primary is-size-5 ml-5 continue-button-width"
          >Save</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "EditTutorsView" };
</script>

<style lang="scss" scoped></style>
