<template>
  <div>
    <transition name="route" mode="out-in">
      <div class="mx-5 my-3" v-if="$route.name === `Tutors`">
        <div class="columns is-vcentered">
          <div class="column">
            <p class="has-text-primary is-size-4">All Tutors Detail</p>
          </div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              class="mr-10"
              expanded
              @click="
                () => {
                  $router.push(`/tutors/create-tutor`);
                }
              "
              >Create Tutor</b-button
            >
          </div>
        </div>
        <div class="mt-4 mx-4">
          <AppTable
            :data="tutorData"
            :columns="tutorHeader"
            row-class-one="striped-table-color-2"
            rowClassTwo="striped-table-color"
          />
        </div>
        <b-modal
          v-model="isModalActive"
          scroll="keep"
          :width="540"
          :can-cancel="false"
        >
          <div class="model_box mt-3 mx-2">
            <div
              class="has-text-centered"
              style="transition-timing-function: ease-in-out"
            >
              <div class="modal-close-button is-pulled-right mb-6">
                <button
                  class="delete"
                  aria-label="close"
                  @click="isModalActive = false"
                ></button>
              </div>
              <div>
                <img
                  src="@/assets/images/delete.webp"
                  responsive
                  class="complete_img"
                />
                <p class="has-text-danger is-size-4">Delete</p>

                <p>Are you sure you want to delete _________?</p>
              </div>
              <div
                class="has-text-centered mt-5"
                style="transition-timing-function: ease-in-out"
              >
                <b-button
                  class="py-5 mr-5"
                  @click="isModalActive = false"
                  style="
                    width: 200px !important;
                    background-color: rgba(224, 225, 225, 1);
                  "
                  >Cancel
                </b-button>
                <b-button
                  type="is-danger"
                  class="py-5 mr-5"
                  @click="isModalActive = false"
                  style="width: 200px !important"
                  >Delete
                </b-button>
              </div>
            </div>
          </div>
        </b-modal>
      </div>
    </transition>
    <transition name="route" mode="out-in">
      <router-view></router-view
    ></transition>
  </div>
</template>

<script>
import AppTable from "@/shared/appTable.vue";
export default {
  name: "TutorsView",
  components: {
    AppTable,
  },
  data() {
    const tutorHeader = [
      {
        field: "id",
        label: "ID",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "name",
        label: "Name",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "expertise",
        label: "Expertise",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "availability",
        label: "Availability",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "button",
        label: "Action",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: false,
      },
    ];
    const tutorData = [
      {
        id: 0,
        name: "Rohan",
        expertise: "IT",
        availability: "Sunday",
        button: [
          {
            text: "Edit",
            onClick: () => {
              this.$router.push(`/tutors/edit-tutor`);
            },
            icon: "",
            type: "is-primary",
          },
          {
            text: "Delete",
            onClick: () => {
              this.isModalActive = true;
            },
            type: "is-danger",
          },
        ],
      },
      {
        id: 1,
        name: "Sarmisha",
        expertise: "Maths",
        availability: "Saturday ",
        button: [
          {
            text: "Edit",
            onClick: () => {
              this.$router.push(`/tutors/edit-tutor`);
            },
            icon: "",
            type: "is-primary",
          },
          {
            text: "Delete",
            onClick: () => {
              this.isModalActive = true;
            },
            type: "is-danger",
          },
        ],
      },
    ];
    return { tutorHeader, tutorData, isModalActive: false };
  },
};
</script>

<style lang="scss" scoped></style>
