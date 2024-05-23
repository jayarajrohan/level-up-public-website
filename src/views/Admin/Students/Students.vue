<template>
  <div>
    <transition name="route" mode="out-in">
      <div class="mx-5 mt-4" v-if="$route.name === `Students`">
        <div class="columns is-vcentered">
          <div class="column">
            <p class="has-text-primary is-size-4">All Students Detail</p>
          </div>
          <div class="column is-narrow">
            <b-button
              type="is-primary"
              class="mr-10"
              expanded
              @click="
                () => {
                  $router.push(`/admin/dashboard/students/create`);
                }
              "
              >Create Student</b-button
            >
          </div>
        </div>
        <div class="mt-4 mx-4">
          <AppTable
            :data="studentData"
            :columns="studentHeader"
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

                <p>Are you sure you want to delete {{ deleteUserName }}?</p>
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
                  @click="onDeleteStudent"
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
import {
  apiRequestManager,
  showFailureToast,
  showSuccessToast,
} from "@/util/util";
export default {
  name: "StudentsView",
  components: {
    AppTable,
  },
  methods: {
    fetchStudentDetails() {
      apiRequestManager("get", "/admin/students", {}, {}, (res) => {
        if (res.status === 200) {
          this.studentData = res.data.students.map((student) => {
            return {
              id: student._id,
              userName: student.username,
              email: student.email || "",
              name: student.name || "",
              button: [
                {
                  text: "Edit",
                  onClick: () => {
                    this.$router.push(
                      `/admin/dashboard/students/edit/${student._id}`
                    );
                  },
                  icon: "",
                  type: "is-primary",
                },
                {
                  text: "Delete",
                  onClick: () => {
                    this.deleteUserId = student._id;
                    this.deleteUserName = student.username;
                    this.isModalActive = true;
                  },
                  type: "is-danger",
                },
              ],
            };
          });
          return;
        }

        if (res.status === 400) {
          showFailureToast("Validation failed in one of the fields");
          return;
        }

        if (res.status === 409) {
          showFailureToast("Username already exist");
          return;
        }
      });
    },
    onDeleteStudent() {
      apiRequestManager(
        "delete",
        `/admin/student/delete/${this.deleteUserId}`,
        {},
        {},
        (res) => {
          if (res.status === 200) {
            this.fetchStudentDetails();
            showSuccessToast("Student deleted successfully");
            this.isModalActive = false;
            return;
          }
        }
      );
    },
  },
  mounted() {
    this.fetchStudentDetails();
  },
  data() {
    const studentHeader = [
      {
        field: "id",
        label: "User ID",
        tableHeaderAttributes: this.paymentHeadShow,
        tableDataAttributes: this.columnTdAttrs,
        sortable: true,
      },
      {
        field: "userName",
        label: "User Name",
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
        field: "email",
        label: "Email",
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
    return {
      studentData: [],
      studentHeader,
      isModalActive: false,
      deleteUserId: "",
      deleteUserName: "",
    };
  },
};
</script>

<style lang="scss" scoped></style>
