import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const AutoLogoutHandler = () => {
  const { logout } = useAuth();

  useEffect(() => {
    const AUTO_LOGOUT_TIME = 10 * 60 * 1000; // 10 minutes in milliseconds
    let autoLogoutTimer;

    const handleActivity = () => {
      clearTimeout(autoLogoutTimer);
      autoLogoutTimer = setTimeout(logout, AUTO_LOGOUT_TIME);
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keypress", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keypress", handleActivity);
      clearTimeout(autoLogoutTimer);
    };
  }, [logout]);

  return null; // This component does not render anything
};

export default AutoLogoutHandler;
