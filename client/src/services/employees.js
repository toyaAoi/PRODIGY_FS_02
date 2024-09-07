import { token } from "./auth";
import { API_URLS } from "./utils/apiUrls";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "./utils/utils";

export const fetchAllEmployees = async () => {
  const response = await makeGetRequest(API_URLS.EMPLOYEES_URL, token);
  return response.data;
};

export const addEmployee = async (data) => {
  const response = await makePostRequest(API_URLS.EMPLOYEES_URL, data, token);
  return response.data;
};

export const removeEmployee = async (id) => {
  const response = await makeDeleteRequest(
    `${API_URLS.EMPLOYEES_URL}/${id}`,
    token
  );
  return response.data;
};

export const updateEmployee = async (id, data) => {
  const response = await makePutRequest(
    `${API_URLS.EMPLOYEES_URL}/${id}`,
    data,
    token
  );
  return response.data;
};
