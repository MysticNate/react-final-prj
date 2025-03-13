import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "./UserContext";

const TransactionContext = createContext(null); 

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => { 
    const { currentUser } = useUser();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (currentUser) {
            const allTransactions = JSON.parse(
                localStorage.getItem("transactions") || "[]"
            );
            const userTransactions = allTransactions.filter(
                (t) => t.userId === currentUser.id
            );
            setTransactions(userTransactions);
        } else {
            setTransactions([]);
        }
    }, [currentUser]);

    // save transactions to local storage
    const saveToStorage = (newTransactions) => {
        const allTransactions = JSON.parse(
            localStorage.getItem("transactions") || "[]"
        );
        const prevTransactions = allTransactions.filter(
            (t) => t.userId !== currentUser?.id
        );

        localStorage.setItem(
            "transactions",
            JSON.stringify([...prevTransactions, ...newTransactions])
        );

        setTransactions(newTransactions);
    };

    // add, edit, and delete transactions
    const addTransaction = (transaction) => {
        const newTransaction = {
            ...transaction,
            id: uuidv4(),
            userId: currentUser.id,
            date: new Date().toISOString(),
        };

        saveToStorage([...transactions, newTransaction]);
    };

    const editTransaction = (id, updates) => {
        const newTransactions = transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t 
        );
        saveToStorage(newTransactions);
    };

    const deleteTransaction = (id) => {
        const newTransactions = transactions.filter((t) => t.id !== id);
        saveToStorage(newTransactions);
    };

    return (
        <TransactionContext.Provider
            value={{
                transactions,
                addTransaction,
                editTransaction,
                deleteTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};