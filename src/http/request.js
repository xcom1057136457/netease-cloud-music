import axios from "axios";

let baseURL;

if (process.env.NODE_ENV === "production") {
  baseURL = "https://netease-cloud-music-api-gold-seven.vercel.app";
} else if (process.env.NODE_ENV === "development") {
  baseURL = "/api";
}

// create an axios instance
const service = axios.create({
  baseURL: baseURL,
  withCredentials: true
});

// request interceptor
service.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default service;
