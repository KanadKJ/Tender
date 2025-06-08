import axios from "axios";
import { SCRP_BASE_URL, TMAPI_BASE_URL } from "../Utils/CommonUtils";
import { toast } from "react-toastify";
import { TMGetApi } from "./TMAPI";

export const ScrpApiTenders = axios.create({
  baseURL: SCRP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ScrpApiTenders.interceptors.request.use(
  async (config) => {
    config.headers[
      "Authorization"
    ] = `Token 71691ae947c895dac6aa95736f6285db7c4a340f`;
    let userData = localStorage.getItem("user");

    if (userData) {
      await TMGetApi.get(`${TMAPI_BASE_URL}/CheckToken`);
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(`Error:: ${error}`);
  }
);
ScrpApiTenders.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Login deteced in other device.");
      localStorage.removeItem("user");
      localStorage.removeItem("controller");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const ScrpApiTendersMetadata = axios.create({
  baseURL: `${SCRP_BASE_URL}/metadata/`,
  headers: {
    "Content-Type": "application/json",
  },
});
ScrpApiTendersMetadata.interceptors.request.use(
  async (config) => {
    let userData = localStorage.getItem("user");
    config.headers[
      "Authorization"
    ] = `Token 71691ae947c895dac6aa95736f6285db7c4a340f`;
    if (userData) {
      await TMGetApi.get(`${TMAPI_BASE_URL}/CheckToken`);
      return config;
    }
    return config;
  },
  (error) => {
    return Promise.reject(`Error:: ${error}`);
  }
);
ScrpApiTendersMetadata.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Login deteced in other device.");
      localStorage.removeItem("user");
      localStorage.removeItem("controller");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
