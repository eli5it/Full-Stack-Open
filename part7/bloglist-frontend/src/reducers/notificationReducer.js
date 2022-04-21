const notificationReducer = (
  state = { errorMessage: null, successMessage: null },
  action
) => {
  switch (action.type) {
    case "CLEAR_NOTIFICATION":
      return state;
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
