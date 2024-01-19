import axios, { AxiosRequestHeaders } from "axios";

const $host = axios.create({
  baseURL: "http://localhost:10000/",
});

const $authHost = axios.create({
  baseURL: "http://localhost:10000/",
});

$authHost.interceptors.request.use((config) => {
  (
    config.headers as AxiosRequestHeaders
  ).Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
export { $authHost, $host };
