import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Avatar,
    IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Brightness4Icon from "@mui/icons-material/Brightness4"; 
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";

export default function Header() {
    const navigate = useNavigate();
    const { logout, currentUser } = useUser(); 
    const { darkMode, toggleDarkMode } = useTheme(); 

    return (
        <AppBar position="static">
            <Toolbar>
                {/* title, avatar and dark mode button in a box */}
                <Box
                    sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                    <Typography
                        variant="h6"
                        sx={{ cursor: "pointer" }} 
                        onClick={() => navigate("/")}
                    >
                        Bag Chasers
                    </Typography>
                    <Avatar
                        src={currentUser.profilePic}
                        alt={currentUser.username[0]}
                        sx={{ marginLeft: 1 }}
                    />
                    {/* dark mode button */}
                    <IconButton
                        color="inherit"
                        onClick={toggleDarkMode}
                        sx={{ ml: 1 }}
                    >
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Box>
                <Box>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/TransactionsPage")}
                    >
                        Transactions
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/Profile")}
                    >
                        Profile
                    </Button>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
