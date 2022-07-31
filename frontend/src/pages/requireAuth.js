import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

import React from "react";

const RequireAuth = () => {
    const { auth } = useAuth();

    return auth?.accessToken ? <Outlet /> : <Navigate to="/" />;
};

export default RequireAuth;
