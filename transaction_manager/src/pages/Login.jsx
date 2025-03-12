import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const { login } = useUser();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // check if fields are filled
        if (!email || !password) {
            setErrorMsg("All fields are required");
            return;
        }

        // on login
        if (login(email, password)) {
            navigate("/");
        } else {
            setErrorMsg("Wrong email or password");
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
                    Login
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

                <form onSubmit={handleLogin}>
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
                        style={{ marginBottom: "20px" }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginBottom: "15px" }}
                    >
                        Login
                    </Button>

                    <Typography align="center">
                        No account yet?{" "}
                        <Link to="/register" style={{ textDecoration: "none" }}>
                            Register here!
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
}
