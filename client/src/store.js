import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./reducers/adminReducer";
import notificationReducer from "./reducers/notificationReducer";
import employeeReducer from "./reducers/employeeReducer";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    employees: employeeReducer,
    notification: notificationReducer,
  },
});

export default store;
