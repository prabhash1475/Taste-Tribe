import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    window.addEventListener("offline", () => {
      setOnlineStatus(true);
    });
    window.addEventListener("online", () => {
      setOnlineStatus(false);
    });
  }, []);

  return onlineStatus;
};
export default useOnlineStatus;
