import { logoutAdmin } from "../../reducers/adminReducer";
import { createNotification } from "../../reducers/notificationReducer";

const handleApiError = (error, dispatch) => {
  if (error.response) {
    if (error.response.error === "Unauthorized") {
      dispatch(createNotification("error", "Please login first"));
      dispatch(logoutAdmin());
    } else if (error.response.status === 404) {
      dispatch(createNotification("error", "Resource not found"));
    } else {
      dispatch(createNotification("error", error.response.data.error));
    }
  } else {
    dispatch(createNotification("error", error.message));
  }

  throw error;
};

export { handleApiError };
