import axios from "axios";
import { TMAPI_BASE_URL } from "../Utils/CommonUtils";

export const TMGetApi = axios.create({
  baseURL: TMAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

TMGetApi.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("user"))?.acceessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(`Error:: ${err}`);
  }
);
