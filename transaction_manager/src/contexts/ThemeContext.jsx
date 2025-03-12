import React, { createContext, useState, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProviderWrapper = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {

        // check if user has a preference stored in localStorage
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    // toggle between light and dark mode
    const toggleDarkMode = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem("darkMode", JSON.stringify(newMode));
            return newMode;
        });
    };

    // create theme based on current mode
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#dc004e",
            },
        },
    });

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />{" "}
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
