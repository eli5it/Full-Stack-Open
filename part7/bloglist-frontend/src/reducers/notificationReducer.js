const notificationReducer = (
  state = { errorMessage: null, successMessage: null },
  action
) => {
  switch (action.type) {
    case "CLEAR_NOTIIFICATION":
      return {
        errorMessage: null,
        successMessage: null,
      };
    case "SET_NOTIFICATION":
      if (action.notificationType === "error") {
        return {
          errorMessage: action.message,
          successMessage: null,
        };
      }
      console.log("setting success message");
      return {
        errorMessage: null,
        successMessage: action.message,
      };

    default:
      return state;
  }
};

// need option for setting error message, setting it to Null & same with successmeesage

export default notificationReducer;

export const clearNotification = () => {
  return {
    type: "CLEAR_NOTIIFICATION",
  };
};

export const setNotification = (message, notificationType) => {
  return {
    type: "SET_NOTIFICATION",
    message,
    notificationType,
  };
};
