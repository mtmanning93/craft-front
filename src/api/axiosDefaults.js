import axios from "axios";

axios.defaults.baseURL = 'https://craftltd-6c672c6a814e.herokuapp.com'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true