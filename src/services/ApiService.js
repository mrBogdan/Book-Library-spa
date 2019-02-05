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

  post(resource, data, options = {}) {
    return axios.post(resource, data, options);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource, config = {}) {
    return axios.delete(resource, config);
  },

  customRequest(data) {
    return axios(data);
  }

};

export default ApiService;
