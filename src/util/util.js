import axios from "axios";
const BASE_URL = "https://level-up-nxxl.onrender.com/api";
export function apiRequestManager(
  method = "get",
  url,
  data = {},
  params = {},
  withCredentials = true
) {
  return axios({
    method,
    url: `${BASE_URL}/${url}`,
    data,
    params,
    withCredentials,
  });
}
