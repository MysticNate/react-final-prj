import React, { createContext, useContext, useState } from "react";

const CategoryContext = createContext();

export function useCategories() {
    return useContext(CategoryContext);
}

// provider component to manage categories
export function CategoryProvider({ children }) {
    const [categories, setCategories] = useState(["Food", "Clothes", "Salary", "Taxes"]); 

    // add a new category
    const addCategory = (newCategory) => {
        if (newCategory && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
        }
    };

    // remove a category
    const removeCategory = (categoryToRemove) => {
        setCategories(
            categories.filter((category) => category !== categoryToRemove) 
        );
    };

    return (
        <CategoryContext.Provider
            value={{ categories, addCategory, removeCategory }}
        >
            {children}
        </CategoryContext.Provider>
    );
}
