<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Edit Student Detail</p>
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
            <label>Email ID<span class="has-text-danger ml-1">*</span></label>
            <b-field>
              <b-input
                type="text"
                v-model="studentEmail"
                placeholder="Enter email id"
              />
            </b-field>
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
export default { name: "EditStudentsView" };
</script>

<style lang="scss" scoped></style>
