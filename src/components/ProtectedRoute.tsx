
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // You can show a loading spinner here
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลด...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
