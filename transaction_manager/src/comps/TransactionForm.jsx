import React, { useState } from "react";
import {
    TextField,
    Button,
    FormControlLabel,
    Radio,
    Paper,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { useCategories } from "../contexts/CategoryContext";

export default function TransactionForm({ onSubmit, initialValues }) {
    const [description, setDescription] = useState(
        initialValues?.description || "" // ? checks if the value exists
    ); // we use || to set default value if it doesn't exist otherwise it will be undefined which is not a string
    const [amount, setAmount] = useState(
        initialValues?.amount?.toString() || ""
    );
    const [type, setType] = useState(initialValues?.type || "expense"); 
    const [category, setCategory] = useState(initialValues?.category || ""); 
    const { categories } = useCategories();

    const handleSubmit = (e) => {
        e.preventDefault(); // prevent form from refreshing the page

        // validation
        if (!description || !amount || amount <= 0) {
            alert("Please fill description and amount correctly");
            return;
        }

        onSubmit({
            description,
            amount: Number(amount),
            type,
            category,
        });

        // clear form if it's a new transaction
        if (!initialValues) {
            setDescription("");
            setAmount("");
            setType("expense");
            setCategory("");
        }
    };

    return (
        <Paper style={{ padding: "20px", marginBottom: "20px" }}>
            <Typography variant="h6">
                {initialValues ? "Edit Transaction" : "New Transaction"}
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />

                <TextField
                    label="Amount"
                    fullWidth
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        label="Category"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}> 
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <div style={{ margin: "20px 0" }}>
                    <FormControlLabel
                        value="income"
                        control={
                            <Radio
                                checked={type === "income"}
                                onChange={(e) => setType("income")}
                            />
                        }
                        label="Income"
                    />
                    <FormControlLabel
                        value="expense"
                        control={
                            <Radio
                                checked={type === "expense"}
                                onChange={(e) => setType("expense")}
                            />
                        }
                        label="Expense"
                    />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    {initialValues ? "Update" : "Add"} Transaction
                </Button>
            </Box>
        </Paper>
    );
};
