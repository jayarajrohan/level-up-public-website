import axios from "axios";
import router from "@/router";
import { ToastProgrammatic as Toast } from "buefy";

// const BASE_URL = "https://level-up-pmy6.onrender.com/api";
const BASE_URL = "http://localhost:8081/api";

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
      console.log(err);
      if (err.status === 401) {
        localStorage.removeItem("token");
        router.push({ name: "Login" });
        return;
      }
      if (err.status === 500) {
        showFailureToast("Something went wrong. Please try again later.");
        return;
      }
      callback(err);
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
