import React from "react";
import useAuth from "../hooks/useAuth.js";
import useRefreshToken from "../hooks/useRefreshToken.js";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
    const [isLoding, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        auth.accessToken ? setIsLoading(false) : verifyRefreshToken();
        return () => {
            isMounted = false;
        };
    }, []);

    return <>{isLoding ? <h1>Loding...</h1> : <Outlet />}</>;
};

export default PersistLogin;
