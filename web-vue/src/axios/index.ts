import axios from "axios";
const instance = axios.create();
export default instance;

instance.interceptors.request.use(
  function (config) {
    const { url } = config;
    // if (url !== "/api/user/login" && localStorage.getItem("token")) {
    //   const token = localStorage.getItem("token");
    //   config.headers.Authorization = token;
    // }
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    const { data } = response || {};
    console.log(data, 'data');
    return data;
  },
  function (error) {
    console.log(error, 'error')
    return Promise.reject(error);
  },
);
