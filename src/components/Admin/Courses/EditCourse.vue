<template>
  <div class="mx-5 my-3">
    <p class="has-text-primary is-size-4">Edit Course</p>
    <div class="mt-4 mx-4">
      <div class="columns">
        <div class="column mr-4">
          <label>Course Name<span class="has-text-danger ml-1">*</span></label>
          <b-field>
            <b-input
              type="text"
              v-model="courseName"
              placeholder="Enter course name"
            />
          </b-field>
        </div>
        <div class="column">
          <label>Description<span class="has-text-danger ml-1">*</span></label>
          <b-field>
            <b-input
              type="textarea"
              v-model="description"
              placeholder="Enter description"
            />
          </b-field>
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
export default { name: "EditCourseView" };
</script>

<style lang="scss" scoped></style>
