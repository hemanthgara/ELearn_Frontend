import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)

    if (error.code === "ERR_NETWORK") {
      toast.error(error.message);
      return
    }

    if (error.response.status === 409) {
      return {
        data: {
          ...error.response
        }
      }
    }


    if (error.response.status === 400) {
      if (error.response?.message) {
        toast.error(error.response.message);
      }
    }

    if (error.response.status === 401) {
      toast.error("Unauthorized access!!!");
      // document.cookie = "token=; path=/;";
      (function(){document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); }); })();
      window.location.href = "/signin";

      return
    }

    if (error.response.status === 500) {
      toast.error('Internal server error');
      return
    }
    else {
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
        return
      }
      else {
        toast.error("Internal server error");
        return
      }
    }

  }
);
