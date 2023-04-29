import { toast } from "react-toastify";
import { axiosInstance } from "./axiosInstance";

// import getCookie from "./getCookie";
// Get User info and check user authorization

export const getUser = async () => {
  const response = await axiosInstance.get("/api/me", {
    withCredentials: true,
  });
  return response.data.data;
};

export const getApi = async (url) => {
  const response = await axiosInstance.get(url, {
    withCredentials: true,
  });
  
  return response;
};

export const postApi = async (url, { ...data },
  config = { "Content-Type": "multipart/form-data" }
) => {
  const response = await axiosInstance.post(
    url,
    { ...data },
    {
      withCredentials: true,
      headers: config,
    }
  );
  
  if (response.status === 200 || response.status === 201) {
    return response;
  }
};

export const loginApi = async (url, { ...data }, config = { "Content-Type": "multipart/form-data" }) => {
  const response = await axiosInstance.post(url, { ...data }, {
    withCredentials: true,
    headers: config,
  }
  );

  if (response.status === 200) {
    toast.success("Logged in succefully!!!");
    return response.data;
  }
};

export const deleteApi = async (url) => {
  const response = await axiosInstance.delete(url, {
    withCredentials: true,
  }
  );
  return response;
};
