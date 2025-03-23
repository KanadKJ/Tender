import axios from "axios";
import { TMAPI_BASE_URL } from "../Utils/CommonUtils";

export const TMGetApi = axios.create({
  baseURL: TMAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
