import axios, { AxiosRequestHeaders } from "axios";

const $host = axios.create({
  baseURL: "https://online-shop-backend-ilalovx.onrender.com/",
});

const $authHost = axios.create({
  baseURL: "https://online-shop-backend-ilalovx.onrender.com/",
});

$authHost.interceptors.request.use((config) => {
  (
    config.headers as AxiosRequestHeaders
  ).Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
export { $authHost, $host };
