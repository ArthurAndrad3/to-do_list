import { useEffect } from "react";

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
    <div className="fixed bottom-5 right-10 bg-dracula-headerCard text-dracula-red p-4 rounded-lg shadow-2lg font-bold z-[1000] opacity-100 sm:right-5 ">
      <p className="m-0">{message}</p>
    </div>
  );
};

export default ErrorNotification;
