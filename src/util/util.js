import axios from "axios";
import router from "@/router";
import { ToastProgrammatic as Toast } from "buefy";

const BASE_URL = "https://level-up-pmy6.onrender.com/api";
// const BASE_URL = "http://localhost:8081/api";

export function apiRequestManager(
  method = "get",
  url,
  data = {},
  params = {},
  callback
) {
  const token = localStorage.getItem("token");
  axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    params,
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => callback(res))
    .catch((err) => {
      const error = err.response;

      if (error.status === 401) {
        localStorage.removeItem("token");
        router.push({ name: "Login" }).catch(() => []);
        return;
      }

      if (error.status === 500) {
        showFailureToast("Something went wrong. Please try again later.");
        return;
      }

      callback(error);
    });
}

export function showSuccessToast(message, duration = 5000) {
  Toast.open({
    duration,
    message,
    position: "is-top",
    type: "is-primary",
  });
}

export function showFailureToast(message, duration = 5000) {
  Toast.open({
    duration,
    message,
    position: "is-top",
    type: "is-danger",
  });
}

const getTime = (time) => {
  if (time < 10) {
    return `0${time}`;
  }

  return `${time}`;
};

export function convertAvailabilityData(backendAvailability) {
  const daysInWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const availabilityData = daysInWeek.map((day) => {
    const beAvailability = backendAvailability.find(
      (bea) => bea.availableDay === day
    );

    if (beAvailability) {
      return {
        day,
        value: true,
        fromHour: getTime(beAvailability.timeRange.fromHour),
        fromMinute: getTime(beAvailability.timeRange.fromMinute),
        toHour: getTime(beAvailability.timeRange.toHour),
        toMinute: getTime(beAvailability.timeRange.toMinute),
        error: "",
      };
    } else {
      return {
        day,
        value: false,
        fromHour: "00",
        fromMinute: "00",
        toHour: "00",
        toMinute: "00",
        error: "",
      };
    }
  });

  return availabilityData;
}
