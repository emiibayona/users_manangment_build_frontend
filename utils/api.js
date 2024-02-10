import axios from "axios";
const VUE_APP_API_URL = "http://127.0.0.1";
const VUE_APP_API_PORT = 8000;
const VUE_APP_API_NAME = "api/";
const url = `${VUE_APP_API_URL}:${VUE_APP_API_PORT}/${VUE_APP_API_NAME}`;

export default {
  get: async (path) => {
    try {
      const response = await axios.get(url + path);
      return response.data;
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },
  post: async (path, data) => {
    try {
      // setAuthToken(localStorage.getItem("user_token"));
      const response = await axios.post(url + path, data);
      return response.data;
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },
  put: async (path, data) => {
    try {
      // setAuthToken(localStorage.getItem("user_token"));
      const response = await axios.put(url + path, data);
      return response.data;
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },
};

// module.exports = { setAuthToken, get, post, put };
