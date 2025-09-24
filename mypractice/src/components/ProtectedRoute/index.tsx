import React from "react";
import { Navigate } from "react-router-dom";
import { UserModel } from "../../models/userModel";

const userModel = new UserModel();

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = userModel.getCurrentUser();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
