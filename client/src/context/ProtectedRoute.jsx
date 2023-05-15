import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";
import Pleasures from "../components/userGenresPleasures/Pleasures";
import Banned from "../components/banned/Banned";

const ProtectedRoute = ({ children }) => {
  const { userFirebase, loading } = useAuth();
  const pleasures = useSelector((state) => state.users.currentUser.pleasures);
  const user = useSelector((state) => state?.users?.currentUser);
  const urls = ["/admin", "/admin/users", "/admin/posts", "/admin/graphs"];
  const { pathname } = useLocation();

  if (pleasures?.length <= 0) return <LoadingProtectRoute />;

  if (loading) return <LoadingProtectRoute />;

  if (pleasures?.length < 2) return <Pleasures />;

  if (
    urls?.some((act) => act === pathname) &&
    user?.role !== "Admin" &&
    !loading
  )
    return <Navigate to="/home" />;

  if (user?.isBanned === true && !loading) return <Banned user={user} />;

  if (!userFirebase.username && !loading) return <Navigate to="/login" />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
