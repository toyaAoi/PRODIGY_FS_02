import PropTypes from "prop-types";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import { useRef } from "react";

const Confirmation = forwardRef((_, ref) => {
  const [confirmation, setConfirmation] = useState({
    message: null,
    confirmButtonText: "Confirm",
  });
  const resolveRef = useRef(null);

  useImperativeHandle(ref, () => ({
    show: (message, confirmButtonText) =>
      new Promise((resolve) => {
        setConfirmation({
          message,
          confirmButtonText: confirmButtonText || "Confirm",
        });
        resolveRef.current = resolve;
      }),
  }));

  if (!confirmation.message) {
    return null;
  }

  const handleConfirm = () => {
    if (resolveRef.current) {
      resolveRef.current(true);
    }
    setConfirmation({
      message: null,
      confirmButtonText: "Confirm",
    });
  };

  const handleCancel = () => {
    if (resolveRef.current) {
      resolveRef.current(false);
    }
    setConfirmation({
      message: null,
      confirmButtonText: "Confirm",
    });
  };

  return (
    <div className="fade-in-container">
      <div className="popup-container h-auto w-auto">
        <p>{confirmation.message}</p>
        <div className="buttons-container justify-around">
          <button
            className={
              confirmation.confirmButtonText === "Delete" ||
              confirmation.confirmButtonText === "Logout"
                ? "danger-button"
                : "submit-button"
            }
            onClick={handleConfirm}
          >
            {confirmation.confirmButtonText}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
});

Confirmation.propTypes = {
  message: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

Confirmation.displayName = "Confirmation";
export default Confirmation;
