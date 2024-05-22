div
<template>
  <div>
    <transition name="route" mode="out-in">
      <div>
        <div class="columns top-bar py-1 px-2">
          <div class="column">
            <div class="logo">Level-Up</div>
          </div>
          <div class="column is-narrow">
            <img
              src="@/assets/images/Profile.webp"
              alt="profile"
              class="cover-style mt-2 border-style"
              width="35px"
              @click="
                () => {
                  $router.push(`/tutor/profile`);
                }
              "
            />
          </div>
          <div class="column is-narrow">
            <b-tooltip label="Log Out" position="is-left">
              <img
                src="@/assets/images/logoutButton.webp"
                alt="Log Out"
                class="cover-style"
                width="50px"
                @click="
                  () => {
                    $router.push(`/`);
                  }
                "
              />
            </b-tooltip>
          </div>
        </div>
        <div style="margin-inline: 100px" class="mt-4">
          <p class="has-text-primary is-size-4 mt-4">Viewers Details</p>
          <b-message type="is-info" has-icon class="mt-4 is-size-5">
            Details of Students who viewed your profile will appear here
          </b-message>
          <div class="mt-4">
            <AppTable
              :data="viewersData"
              :columns="viewersHeader"
              row-class-one="striped-table-color-2"
              rowClassTwo="striped-table-color"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import AppTable from "@/shared/appTable.vue";
export default {
  name: "viewersView",
  components: {
    AppTable,
  },
  data() {
    const viewersHeader = [
      {
        field: "userName",
        label: "User Name",
        sortable: true,
      },
      {
        field: "email",
        label: "Email",
        sortable: true,
      },
      {
        field: "date",
        label: "Date",
        sortable: false,
      },
    ];
    const viewersData = [
      {
        id: 0,
        userName: "Sarmisha",
        email: "sarmi@gmail.com",
        date: "2024-1-05",
      },
      {
        id: 1,
        userName: "Rohan",
        email: "rohan@gmail.com",
        date: "2024-1-05",
      },
      {
        id: 2,
        userName: "Renota",
        email: "renota@gmail.com",
        date: "2024-1-05",
      },
      {
        id: 3,
        userName: "Jeevan",
        email: "jeevan@gmail.com",
        date: "2024-1-05",
      },
    ];
    return { viewersData, viewersHeader, isModalActive: false };
  },
};
</script>

<style lang="scss" scoped>
.border-style {
  border-right: 2px solid rgba(7, 32, 93, 1);
  padding-right: 10px;
}
</style>
