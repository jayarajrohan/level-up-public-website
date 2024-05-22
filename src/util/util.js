import axios from "axios";
import router from "@/router";
const BASE_URL = "https://level-up-nxxl.onrender.com/api";
export function apiRequestManager(
  method = "get",
  url,
  data = {},
  params = {},
  withCredentials = true,
  callback
) {
  axios({
    method,
    url: `${BASE_URL}/${url}`,
    data,
    params,
    withCredentials,
  })
    .then((res) => callback(res))
    .catch((err) => {
      if (err.status === 401) {
        router.push({ name: "Login" });
        return;
      }
      callback(err);
    });
}
