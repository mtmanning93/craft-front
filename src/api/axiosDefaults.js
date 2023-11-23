import axios from "axios";

/**
 * REST API Configuration
 */

axios.defaults.baseURL = "https://craft-api-aeec93e46ff2.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// Axios instances to be used as interceptors
export const axiosReq = axios.create();
export const axiosRes = axios.create();