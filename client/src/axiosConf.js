import axios from "axios";
import conf from "./appConf";

const { server } = conf;

const instance = axios.create({
  baseURL: `http://${server.host}:${server.port}/api/schema`,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
