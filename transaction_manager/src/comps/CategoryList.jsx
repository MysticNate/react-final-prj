import React, { useState } from "react";
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCategories } from "../contexts/CategoryContext";

export default function CategoryList() {
    const { categories, addCategory, removeCategory } = useCategories();
    const [newCategory, setNewCategory] = useState("");

    // adding a category
    const handleAddCategory = () => {
        addCategory(newCategory.trim());
        setNewCategory(""); 
    };

    return (
        <Box>
            {/* input field and button to add new category */}
            <Box display="flex" marginBottom="10px">
                <TextField
                    label="New Category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    fullWidth
                />
                <Button
                    onClick={handleAddCategory}
                    variant="contained"
                    color="primary"
                >
                    Add
                </Button>
            </Box>

            {/* list of categories */}
            <List>
                {categories.map((category, index) => (
                    <ListItem
                        key={index}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                onClick={() => removeCategory(category)}
                            >
                                <Delete />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={category} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}
