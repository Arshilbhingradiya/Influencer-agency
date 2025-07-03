import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Logout = ({ setDrawerOpen }) => {
  const { LogoutUser } = useAuth();

  useEffect(() => {
    // Pass callback to reset drawer state when logging out
    LogoutUser(() => {
      if (setDrawerOpen) {
        setDrawerOpen(false);
      }
    });
  }, [LogoutUser, setDrawerOpen]);

  return <Navigate to="/login" />;
};
