import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  console.log(notification);

  return (
    <div
      className={
        "notification " +
        (notification.type === "error" ? "border-red-500 text-red-500" : "")
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;
