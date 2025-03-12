import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function LoginChecker({ children }) {
    const { isLoggedIn } = useUser();

    // if not logged in, redirect to login page
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />; 
    }
    // if logged in, render children components
    return <>{children}</>; 
};
