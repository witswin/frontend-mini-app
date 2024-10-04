import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://api.wits.win/",
});
