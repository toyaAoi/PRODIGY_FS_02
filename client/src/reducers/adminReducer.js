import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../services/utils/errorHandler";
import { login, setToken } from "../services/auth";
import { createNotification } from "./notificationReducer";

const adminSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    setAdmin: (state, action) => {
      return action.payload;
    },
    removeAdmin: () => {
      return null;
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;

export const loginAdmin = (credentials) => {
  return async (dispatch) => {
    try {
      const response = await login(credentials);
      dispatch(setAdmin(response.data.username));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };
};

export const logoutAdmin = () => {
  sessionStorage.removeItem("ADMIN_TOKEN");
  return (dispatch) => {
    dispatch(removeAdmin());
  };
};

export const initializeAdmin = () => {
  const adminCache = JSON.parse(sessionStorage.getItem("ADMIN_TOKEN"));

  if (adminCache) {
    setToken(adminCache.token);
    return (dispatch) => {
      dispatch(setAdmin(adminCache.username));
    };
  } else {
    return (dispatch) => {
      dispatch(createNotification("error", "Please login first"));
      throw new Error("Unauthorized");
    };
  }
};

export default adminSlice.reducer;
