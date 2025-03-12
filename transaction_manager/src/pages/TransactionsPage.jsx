import React from "react";
import { Box, Container, Typography } from "@mui/material";

import Header from "../comps/Header";
import TransactionForm from "../comps/TransactionForm";
import TransactionList from "../comps/TransactionList";
import CategoryList from "../comps/CategoryList";
import { useTransactions } from "../contexts/TransactionContext";
import { useCategories } from "../contexts/CategoryContext";
import CategoryChart from "../comps/CategoryChart";

export default function TransactionsPage() {
    const { transactions, addTransaction, editTransaction, deleteTransaction } =
        useTransactions(); // get transaction data and functions from context
    const { categories, addCategory, editCategory, deleteCategory } =
        useCategories(); // get category data and functions from context

    // sort transactions by date (latest first)
    const sortedTransactions = [...transactions].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );

    return (
        <Box>
            <Header />
            <Container maxWidth="lg">
            {/* page header */}
            <Typography variant="h4" marginBottom="20px" marginTop="10px">
                Transactions
            </Typography>

            {/* summary of transactions */}
            <CategoryChart transactions={transactions} />

            {/* form to add a new transaction */}
            <TransactionForm onSubmit={addTransaction} />

            {/* list of transactions with edit and delete options */}
            <TransactionList
                transactions={sortedTransactions}
                onEdit={editTransaction}
                onDelete={deleteTransaction}
            />
            
            {/* list of categories with add, edit and delete options */}
            <CategoryList
                categories={categories}
                onAdd={addCategory}
                onEdit={editCategory}
                onDelete={deleteCategory}
            />
            </Container>
        </Box>
    );
}
