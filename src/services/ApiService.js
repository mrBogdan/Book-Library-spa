import axios from "axios";
import TokenService from "./TokenService";

const ApiService = {

  init(baseURL) {
    axios.defaults.baseURL = baseURL;
  },

  setHeader() {
    axios.defaults.headers.common["Authorization"] = `Basic ${TokenService.getToken()}`;
  },

  removeHeader() {
    axios.defaults.headers.common = {};
  },

  get(resourse, options = {}) {
    return axios.get(resourse, options);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource, data) {
    return axios.delete(resource);
  },

  customRequest(data) {
    return axios(data);
  }

};

export default ApiService;
