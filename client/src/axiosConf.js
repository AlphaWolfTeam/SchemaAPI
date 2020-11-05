import axios from "axios";

const instance = axios.create({
  baseURL: `/api/schema`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
