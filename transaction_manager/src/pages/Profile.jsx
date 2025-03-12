import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Paper,
} from "@mui/material";
import { useUser } from "../contexts/UserContext";
import Header from "../comps/Header";

export default function Profile() {
    const { currentUser, updateUser } = useUser(); // get user data and update function from context
    const [name, setName] = useState(currentUser?.name || ""); // set initial value to user's name
    const [profilePic, setProfilePic] = useState(currentUser?.profilePic || "");
    const [message, setMessage] = useState("");

    // update user data
    const handleSave = () => {
        updateUser({ name, profilePic });
        setMessage("Profile updated successfully!");
    };

    return (
        <>
            <Header />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="70vh"
            >
                <Paper
                    style={{
                        padding: "30px",
                        maxWidth: "400px",
                        width: "100%",
                    }}
                >
                    <Typography variant="h5" align="center" marginBottom="20px">
                        Profile
                    </Typography>
                    {message && (
                        <Typography
                            color="success.main"
                            align="center"
                            marginBottom="20px"
                        >
                            {message}
                        </Typography>
                    )}
                    <Box
                        display="flex"
                        justifyContent="center"
                        marginBottom="20px"
                    >
                        <Avatar
                            src={profilePic}
                            sx={{ width: 80, height: 80 }}
                        />
                    </Box>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Profile Picture URL"
                        fullWidth
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSave}
                        style={{ marginTop: "20px" }}
                    >
                        Save Changes
                    </Button>
                </Paper>
            </Box>
        </>
    );
}
