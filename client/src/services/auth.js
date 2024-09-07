import { API_URLS } from "./utils/apiUrls";
import { makePostRequest } from "./utils/utils";

export let token = null;

export const setToken = (newToken) => {
  token = newToken;
};

export const login = async (credentials) => {
  const response = await makePostRequest(API_URLS.LOGIN_URL, credentials);
  setToken(response.data.token);
  sessionStorage.setItem("ADMIN_TOKEN", JSON.stringify({ ...response.data }));
  delete response.data.token;
  return response;
};
