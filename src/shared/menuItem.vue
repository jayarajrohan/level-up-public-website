<template>
  <div v-if="!route.hideFromSideBar">
    <div
      @click="
        () => {
          $root.searchValue = '';
          if (!route?.isUnSelectable) {
            $router.push(route.path).catch(() => []);
            return;
          }
          showDropDown = !showDropDown;
        }
      "
    >
      <div
        :class="`pl-5 py-3 pointer-style main-items ${
          $route.name === route.name ||
          route.childSelectableList?.includes($route.name)
            ? `selected`
            : ``
        }`"
      >
        <div class="route">
          <div :class="isSecondary ? `name` : ``">
            {{ route.name }}
          </div>
        </div>
        <div
          v-if="children.length !== 0"
          @click="
            (event) => {
              event.stopPropagation();
              showDropDown = !showDropDown;
            }
          "
          class="mr-4"
        ></div>
      </div>
    </div>
    <Transition name="fade">
      <div v-if="children.length !== 0 && showDropDown" class="children">
        <MenuItem
          v-for="(route, index) in children"
          :key="index"
          :route="route"
          :isSecondary="true"
        />
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  name: "MenuItem",
  props: ["route", "isSecondary"],
  components: {},
  data() {
    return {
      showDropDown: false,
    };
  },
  computed: {
    children() {
      return this.route?.children
        ? this.route.children.filter((routeItem) => !routeItem.hideFromSideBar)
        : [];
    },
  },
  methods: {
    findIsOneOfChildren(route) {
      if (route.children?.length === 0 || !route.children) {
        return this.$route.name === route.name;
      } else {
        const childrenResults = route.children.map((routeItem) =>
          this.findIsOneOfChildren(routeItem)
        );

        return (
          childrenResults.some((child) => child === true) ||
          this.$route.name === route.name
        );
      }
    },
  },
  mounted() {
    if (this.findIsOneOfChildren(this.route)) {
      this.showDropDown = true;
    }
  },
};
</script>

<style scoped>
.pointer-style {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: 0.5s;
}
.pointer-style.selected {
  background: rgba(255, 255, 255, 0.07);
  border-left: 0.8cap solid white !important;
}
.pointer-style.selected:hover {
  border-left: none !important;
}
.pointer-style:hover {
  opacity: 1;
  filter: blur(0);
  border-left: 0;
}
.pointer-style:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.07);
  border-left: none !important;
  transition: 0.5s;
  transform-origin: right;
  transform: scaleX(0);
  z-index: -1;
}
.pointer-style:hover:before {
  transition: transform 0.5s;
  transform-origin: left;
  transform: scaleX(1);

  border-left: 0.8cap solid white !important;
}

.main-items {
  letter-spacing: 0.18px;
}
.icon {
  display: flex;
  align-items: center;
}
.name {
  font-size: 14.5px;
  letter-spacing: 0.16px;
}
.children {
  margin-left: 30px;
}

.route {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
