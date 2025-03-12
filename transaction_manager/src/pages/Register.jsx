import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { register } = useUser();
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // check if fields are empty
        if (!username || !email || !password || !confirmPassword) {
            setErrorMsg("All fields are required");
            return;
        }

        // check if email is valid using regex + test method
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { 
            setErrorMsg("Invalid email format");
            return;
        }

        // check if passwords match
        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }

        // check password length
        if (password.length < 6) {
            setErrorMsg("Password must be at least 6 characters");
            return;
        }

        // try to register
        if (register(username, email, password)) {
            navigate("/");
        } else {
            setErrorMsg("Email already taken");
        }
    };

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "70vh",
            }}
        >
            <Paper
                style={{ padding: "30px", maxWidth: "400px", width: "100%" }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    style={{ marginBottom: "20px" }}
                >
                    Register
                </Typography>

                {errorMsg && (
                    <Typography
                        color="error"
                        align="center"
                        style={{ marginBottom: "20px" }}
                    >
                        {errorMsg}
                    </Typography>
                )}

                <form onSubmit={handleRegister}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ marginBottom: "15px" }}
                    />

                    <TextField
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginBottom: "15px" }}
                    >
                        Register
                    </Button>

                    <Typography align="center">
                        Already have an account?{" "}
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            Login here
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
}
