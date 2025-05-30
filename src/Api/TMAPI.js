import axios from "axios";
import { TMAPI_BASE_URL } from "../Utils/CommonUtils";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const TMGetApi = axios.create({
  baseURL: TMAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const getFingerprint = async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

TMGetApi.interceptors.request.use(
  async (config) => {
    const fp = await getFingerprint();
    const token = JSON.parse(localStorage.getItem("user"))?.acceessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (fp) {
      config.headers["Uid"] = `${fp}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(`Error:: ${err}`);
  }
);
