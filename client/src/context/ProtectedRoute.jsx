import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/";
import LoadingProtectRoute from "./LoadingProtectRoute";
import Pleasures from "../components/userGenresPleasures/Pleasures";
import Banned from "../components/banned/Banned";
import { getUserByFirebaseId } from "../redux/features/users/usersGetSlice";

const ProtectedRoute = ({ children }) => {
  const { userFirebase, loading, logout } = useAuth();
  const pleasures = useSelector(
    (state) => state?.users?.currentUser?.pleasures
  );
  const user = useSelector((state) => state?.users?.currentUser);
  const urls = ["/admin", "/admin/users", "/admin/posts", "/admin/graphs"];
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserByFirebaseId(userFirebase?.uid));
  }, [dispatch, userFirebase?.uid]);
  logout();
  if (loading || user === undefined || pleasures?.length === undefined)
    return <LoadingProtectRoute />;

  if (pleasures?.length < 2) return <Pleasures />;

  if (
    urls?.some((act) => act === pathname) &&
    user?.role !== "Admin" &&
    !loading
  )
    return <Navigate to="/home" />;

  if (user?.isBanned === true && !loading) return <Banned user={user} />;

  return <div>{children}</div>;
};

export default ProtectedRoute;
