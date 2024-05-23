<template>
  <div>
    <div class="columns">
      <div class="column is-3 font-color-one">Days</div>
      <div class="column is-3 font-color-one mr-4">Start Time</div>
      <div class="column is-3 font-color-one">End Time</div>
      <div class="column"></div>
    </div>
    <div v-for="(day, index) in week" :key="day.day">
      <div class="mb-2">
        <div class="columns">
          <div class="column is-3">
            <b-checkbox v-model="day.value" @input="onChange">
              {{ day.day }}
            </b-checkbox>
          </div>
          <div class="column is-3 mr-4">
            <div class="columns is-vcentered" v-if="day.value === true">
              <div class="column is-5">
                <b-select
                  v-model="day.fromHour"
                  expanded
                  @input="
                    () => {
                      onTimeChange(index);
                    }
                  "
                >
                  <option v-for="hour in hours" :value="hour" :key="hour">
                    {{ hour }}
                  </option>
                </b-select>
              </div>
              <div class="column has-text-centered">:</div>
              <div class="column is-5">
                <b-select
                  v-model="day.fromMinute"
                  expanded
                  @input="
                    () => {
                      onTimeChange(index);
                    }
                  "
                >
                  <option
                    v-for="minute in minutes"
                    :value="minute"
                    :key="minute"
                  >
                    {{ minute }}
                  </option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="column is-3">
            <div class="columns is-vcentered" v-if="day.value === true">
              <div class="column is-5">
                <b-select
                  v-model="day.toHour"
                  expanded
                  @input="
                    () => {
                      onTimeChange(index);
                    }
                  "
                >
                  <option v-for="hour in hours" :value="hour" :key="hour">
                    {{ hour }}
                  </option>
                </b-select>
              </div>
              <div class="column has-text-centered">:</div>
              <div class="column is-5">
                <b-select
                  v-model="day.toMinute"
                  expanded
                  @input="
                    () => {
                      onTimeChange(index);
                    }
                  "
                >
                  <option
                    v-for="minute in minutes"
                    :value="minute"
                    :key="minute"
                  >
                    {{ minute }}
                  </option>
                </b-select>
              </div>
            </div>
          </div>
          <div class="column"></div>
        </div>
      </div>

      <div>
        {{ day.error }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AvailableDayAndTime",
  props: ["getData", "beAvailability"],
  data() {
    return {
      week: [
        {
          day: "Monday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Tuesday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Wednesday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Thursday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Friday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Saturday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
        {
          day: "Sunday",
          value: false,
          fromHour: "00",
          fromMinute: "00",
          toHour: "00",
          toMinute: "00",
          error: "",
        },
      ],
      hours: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      minutes: ["00", "30"],
    };
  },
  methods: {
    onTimeChange(index) {
      const day = this.week[index];
      const dayCopy = { ...day };
      dayCopy.fromHour = +dayCopy.fromHour;
      dayCopy.fromMinute = +dayCopy.fromMinute;
      dayCopy.toHour = +dayCopy.toHour;
      dayCopy.toMinute = +dayCopy.toMinute;

      if (
        dayCopy.toHour < dayCopy.fromHour ||
        (dayCopy.fromHour !== 0 &&
          dayCopy.fromHour === dayCopy.toHour &&
          dayCopy.toMinute < dayCopy.fromMinute)
      ) {
        day.error = `"From" time can't be later than "To" time`;
        this.onChange();
        return;
      }

      if (
        dayCopy.fromHour !== 0 &&
        dayCopy.fromHour === dayCopy.toHour &&
        dayCopy.toMinute === dayCopy.fromMinute
      ) {
        day.error = `"From" time can't be same as "To" time`;
        this.onChange();
        return;
      }

      day.error = "";
      this.onChange();
    },
    formatData() {
      const formattedData = this.week
        .filter((day) => day.value)
        .map((day) => {
          return {
            availableDay: day.day,
            timeRange: {
              fromHour: +day.fromHour,
              fromMinute: +day.fromMinute,
              toHour: +day.toHour,
              toMinute: +day.toMinute,
            },
          };
        });

      const isError = this.week
        .filter((day) => day.value)
        .some((day) => day.error !== "");

      return isError ? undefined : formattedData;
    },
    onChange() {
      this.$emit("getDetails", this.formatData());
    },
  },
  watch: {
    beAvailability(newValue) {
      if (!newValue) {
        this.week = newValue;
      }
    },
  },
};
</script>

<style></style>
