<template>
  <div v-if="$root.role === `TUTOR`">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TutorHome",
};
</script>

<style></style>
