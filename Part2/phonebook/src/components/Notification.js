const Notification = ({ message, notificationStyle }) => {
  if (message === null) {
    return null;
  }
  const successStyle = {
    color: "green",
    fontSize: 24,
    borderColor: "green",
    borderStyle: "solid",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  };
  const failureStyle = {
    color: "red",
    fontSize: 24,
    borderColor: "red",
    borderStyle: "solid",
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
  };

  const currentStyle =
    notificationStyle === "success" ? successStyle : failureStyle;

  return (
    <div className="error" style={currentStyle}>
      {message}
    </div>
  );
};
export default Notification;
