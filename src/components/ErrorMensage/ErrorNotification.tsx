import { useEffect } from "react";
import "./ErrorNotification.css";

interface ErrorNotificationProps {
  message: string;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="error-notification">
      <p>{message}</p>
    </div>
  );
};

export default ErrorNotification;
