/* eslint-disable no-useless-catch */
import axios from "axios";

const createAxiosInstance = (token) => {
  const instance = axios.create();
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return instance;
};

const createRequest = async (method, url, data = null, token = null) => {
  const axiosInstance = createAxiosInstance(token);

  try {
    const response = await axiosInstance[method](url, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const makeGetRequest = (url, token = null) =>
  createRequest("get", url, null, token);

export const makePostRequest = (url, data, token = null) =>
  createRequest("post", url, data, token);

export const makeDeleteRequest = (url, token = null) =>
  createRequest("delete", url, null, token);

export const makePutRequest = (url, data, token = null) =>
  createRequest("put", url, data, token);
