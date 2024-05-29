<template>
  <div>
    <Loading
      :active.sync="showLoader"
      :can-cancel="canCancel"
      :is-full-page="!isNotFullPage"
      :width="60"
      :height="80"
      loader="bars"
      color="#006fb7"
      background-color="rgba(7, 32, 93, 0.58)"
      backdrop-filter="blur(6px)"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
export default {
  props: ["isLoading", "isNotFullPage", "canCancel"],
  components: {
    Loading,
  },
  computed: {
    showLoader: {
      get() {
        return this.isLoading;
      },
    },
  },
};
</script>

<style scoped></style>
