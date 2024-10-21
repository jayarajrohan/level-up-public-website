<template>
  <div>
    <div class="columns top-bar py-1 px-2 is-flex is-align-items-center">
      <div class="column">
        <div class="logo hover-style" @click="onLogo">Level-Up</div>
      </div>
      <div class="column is-narrow">
        <img
          src="@/assets/images/Profile.webp"
          alt="profile"
          class="hover-style mt-2 border-style"
          width="44px"
          @click="onProfile"
        />
      </div>
      <div class="column is-flex is-align-items-center is-narrow">
        <img
          src="@/assets/images/logoutButton.webp"
          alt="Log Out"
          class="hover-style"
          width="50px"
          @click="onLogout"
        />
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "StudentHome",
  methods: {
    onLogo() {
      this.$router.push(`/student/search-tutor`).catch(() => []);
    },
    onProfile() {
      this.$router.push(`/student/profile`).catch(() => []);
    },
    onLogout() {
      this.$router.push("/").catch(() => []);
    },
  },
};
</script>

<style></style>
