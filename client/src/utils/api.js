import axios from 'axios';

const instance = axios.create({
  baseURL: "https://scribly-backend-new.onrender.com",
  withCredentials: true, // if using cookies/auth
});

export default instance;
