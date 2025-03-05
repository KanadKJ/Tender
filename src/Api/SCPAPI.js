import axios from "axios";
import { SCRP_BASE_URL } from "../Utils/CommonUtils";

export const ScrpApiTenders = axios.create({
  baseURL: SCRP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
