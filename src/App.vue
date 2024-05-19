<template>
  <div id="app">
    <transition name="route" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333 !important;
  overflow: hidden !important;
  min-height: 100vh;
  font-size: 18px;
  /* background: url("@/assets/images/BG.webp") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover; */
  margin: 0;
  font-family: "Poppins-Medium";
}
@font-face {
  font-family: "Poppins-Light";
  src: url(@/assets/fonts/Poppins-Light.otf);
}

@font-face {
  font-family: "Poppins-Medium";
  src: url(@/assets/fonts/Poppins-Medium.otf);
}

@font-face {
  font-family: "Poppins-Regular";
  src: url(@/assets/fonts/Poppins-Regular.otf);
}

@font-face {
  font-family: "Poppins-SemiBold";
  src: url(@/assets/fonts/Poppins-SemiBold.otf);
}

@font-face {
  font-family: "Poppins-Thin";
  src: url(@/assets/fonts/Poppins-Thin.otf);
}
/*Route transitions -start */
.route-enter {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.4s ease-out;
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.4s ease-in;
}
/*Route transitions -ends */
.font-size-one {
  font-size: 20px;
}
.cover-style {
  cursor: pointer;
}
.font-style-two {
  font-family: Poppins-Regular;
}
.button-place {
  position: absolute;
  bottom: 25px;
  right: 15px;
}
.continue-button-width {
  width: 200px;
}
.cancel-button {
  background-color: #e0e1e1 !important;
  color: #757575 !important;
  font-size: 13px !important;
  font-weight: 600;
  width: 140px;
}
.model_box {
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0px 12px 44px 0px rgba(20, 20, 43, 0.34);
  padding: 15px;
}
.font-color-one {
  color: rgba(117, 117, 117, 1);
}
.error-massage {
  font-size: 16px;
}
.expertise-list {
  flex-wrap: wrap;
  /*padding: 0.5rem;*/
  align-items: baseline;
}
.expertise-item-list {
  width: 220px;
  height: 40px;
}
.top-bar {
  background: var(--white, #fff);
  box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.1);
}
.logo {
  background-color: #006fb7;
  width: 200px;
  font-size: 25px;
  padding-block: 5px;
  margin-top: 7px;
  text-align: end;
  border-radius: 15px 0;
  color: #fff;
  color: var(--white, #fff);
  font-weight: 500;
  line-height: normal;
  letter-spacing: 0.18px;
}
</style>
