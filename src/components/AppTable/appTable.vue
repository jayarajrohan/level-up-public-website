<template>
  <section style="font-size: 1.05rem">
    <b-table
      :data="data ? data : []"
      :class="tableStyle"
      height="auto"
      :sticky-header="stickyHeaders"
      :mobile-cards="hasMobileCards"
      :row-class="(row, index) => (index % 2 === 0 ? rowClassOne : rowClassTwo)"
    >
      <b-table-column
        v-for="column in columns"
        :key="column.field"
        :field="column.field"
        :label="column.label"
        :th-attrs="column.tableHeaderAttributes"
        :td-attrs="column.tableDataAttributes"
        v-slot="props"
        :sortable="column.sortable"
      >
        <span v-if="column.field !== `button`">{{
          props.row[column.field]
        }}</span>

        <div v-if="column.field === `button`">
          <b-button
            v-for="(currentButton, index) in props.row.button"
            :key="index"
            :type="currentButton.type"
            :class="`is-size-6 ${
              props.row.button.length - 1 !== index ? `mr-2` : ``
            }`"
            style="border-radius: 5px"
            @click="currentButton.onClick"
          >
            <div class="is-flex is-align-items-center">
              <div v-if="currentButton?.text">
                {{ currentButton?.text }}
              </div>
            </div>
          </b-button>
        </div>
      </b-table-column>
    </b-table>
  </section>
</template>

<script>
export default {
  name: "AppTable",
  data() {
    return { stickyHeaders: true };
  },
  components: {},
  props: [
    "data",
    "hasMobileCards",
    "columns",
    "rowClassOne",
    "rowClassTwo",
    "tableStyle",
  ],
  methods: {},
};
</script>

<style>
.striped-table-color {
  background-color: #eff3fc !important;
}
.striped-table-color-2 {
  background-color: #fff !important;
}
</style>
