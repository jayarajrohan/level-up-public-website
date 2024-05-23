<template>
  <div v-if="$root.role === `STUDENT`">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "StudentHome",
};
</script>

<style></style>
