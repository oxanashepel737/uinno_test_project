import axios from "axios";
import { ISignIn } from "../types";
import configuration from "../configuration";

export const instance = axios.create({
  baseURL: `${configuration.apiURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export const SignIn = (data: ISignIn) => instance.post("/login", data);
