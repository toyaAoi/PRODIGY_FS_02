import { createSlice } from "@reduxjs/toolkit";
import { handleApiError } from "../services/utils/errorHandler";
import {
  addEmployee,
  fetchAllEmployees,
  removeEmployee,
  updateEmployee,
} from "../services/employees";
import { createNotification } from "./notificationReducer";

const employeeSlice = createSlice({
  name: "employees",
  initialState: [],
  reducers: {
    setEmployees: (state, action) => {
      return action.payload;
    },
    removeOneEmployee: (state, action) => {
      return state.filter((e) => e.id !== action.payload);
    },
    addOneEmployee: (state, action) => {
      return state.concat([action.payload]);
    },
    editOneEmployee: (state, action) => {
      return state.map((e) =>
        e.id === action.payload.id ? action.payload : e
      );
    },
  },
});

export const {
  setEmployees,
  addOneEmployee,
  editOneEmployee,
  removeOneEmployee,
} = employeeSlice.actions;

export const initializeEmployees = () => {
  return async (dispatch) => {
    try {
      const employees = await fetchAllEmployees();
      dispatch(setEmployees(employees));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };
};

export const addNewEmployee = (data) => {
  return async (dispatch) => {
    try {
      const employee = await addEmployee(data);
      dispatch(addOneEmployee(employee));
      dispatch(createNotification("success", "Employee added"));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };
};

export const editEmployeeDetails = (id, data) => {
  return async (dispatch) => {
    try {
      const employee = await updateEmployee(id, data);
      dispatch(editOneEmployee(employee));
      dispatch(createNotification("success", "Employee updated"));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    try {
      await removeEmployee(id);
      dispatch(removeOneEmployee(id));
      dispatch(createNotification("success", "Employee deleted"));
    } catch (error) {
      handleApiError(error, dispatch);
    }
  };
};

export default employeeSlice.reducer;
