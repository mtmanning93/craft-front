import axios from "axios";

axios.defaults.baseURL = "https://craft-api-aeec93e46ff2.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;