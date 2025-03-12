import React, { createContext, useState, useContext } from "react";
import { v4 as uuidv4 } from "../utils/uuid"; // id generator

const UserContext = createContext(null); 

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    // check if user is logged in
    const isLoggedIn = !!currentUser; // !! converts to boolean

    // login, register, update, and logout functions
    const login = (email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find(
            (u) => u.email === email && u.password === password 
        );

        if (user) {
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
            return true;
        }
        return false;
    };

    const register = (username, email, password) => {
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const userExists = users.some((u) => u.email === email); // some returns true if at least one element is true

        if (userExists) {
            return false;
        }

        const newUser = { id: uuidv4(), username, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        setCurrentUser(newUser);
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        return true;
    };

    const updateUser = (updatedUser) => {
        setCurrentUser((prevUser) => {
            const newUser = { ...prevUser, ...updatedUser };
            localStorage.setItem("currentUser", JSON.stringify(newUser));
            const users = JSON.parse(localStorage.getItem("users") || "[]");
            const updatedUsers = users.map((user) =>
                user.id === prevUser.id ? newUser : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return newUser;
        });
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    return (
        <UserContext.Provider
            value={{
                currentUser,
                isLoggedIn,
                login,
                register,
                updateUser,
                logout,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
