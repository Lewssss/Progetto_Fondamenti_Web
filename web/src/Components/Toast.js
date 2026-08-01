import { useEffect, useState } from "react";
import { subscribeToMessages } from "../api/messageHandler";
import "./Toast.css";

function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    return subscribeToMessages((payload) => {
      setToast(payload);
    });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  if (!toast) return null;

  return (
    <div className={`app-toast app-toast--${toast.type}`} role="status">
      {toast.message}
    </div>
  );
}

export default Toast;
