<template>
  <div class="m-6" v-if="$root.role === `ADMIN`">
    <div v-if="$route.name === `Dashboard`">
      <p class="has-text-primary-dark font-style-two is-size-3">
        Welcome back,
      </p>
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <img src="@/assets/images/calender.webp" alt="calender" />
        </div>
        <div class="column ml-2 font-style-two">11-05-2024</div>
      </div>
      <div class="mt-6">
        <div class="columns">
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of students</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">500</strong>
            </div>
          </div>
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of tutors</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">15</strong>
            </div>
          </div>
          <div class="column mx-6 box-style">
            <div class="font-color-one pt-4">Total number of courses</div>
            <div class="pb-4">
              <strong class="is-size-4 has-text-primary pb-4">50</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition name="route" mode="out-in">
      <router-view></router-view
    ></transition>
  </div>
</template>

<script>
export default { name: "DashboardView" };
</script>

<style lang="scss">
.box-style {
  background-color: #e8eaef;
  border-radius: 8px;
  text-align: center;
}
</style>
