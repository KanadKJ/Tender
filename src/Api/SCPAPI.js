import axios from "axios";
import { SCRP_BASE_URL, TMAPI_BASE_URL } from "../Utils/CommonUtils";
import { toast } from "react-toastify";
import { TMGetApi } from "./TMAPI";
const PlainAxios = axios.create();
export const ScrpApiTenders = axios.create({
  baseURL: SCRP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ScrpApiTenders.interceptors.request.use(
  async (config) => {
    await TMGetApi.get(`${TMAPI_BASE_URL}/CheckToken`);
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
    await TMGetApi.get(`${TMAPI_BASE_URL}/CheckToken`);
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
