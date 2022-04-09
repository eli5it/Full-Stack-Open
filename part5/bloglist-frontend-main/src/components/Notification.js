const Notification = ({ errorMessage, successMessage }) => {
  if (successMessage) {
    return <div className='success'>{successMessage}</div>;
  }
  if (errorMessage) {
    console.log('error!', errorMessage);
    return <div className='error'>{errorMessage}</div>;
  }
  return null;
};

export default Notification;
