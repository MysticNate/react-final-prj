import React from "react";
import { Typography, Container, Box } from "@mui/material";
import Header from "../comps/Header";
import TransactionSummary from "../comps/TransactionSummary";
import TransactionList from "../comps/TransactionList";
import { useTransactions } from "../contexts/TransactionContext";
import { useUser } from "../contexts/UserContext";

export default function HomePage() {
    const { transactions } = useTransactions();
    const { currentUser } = useUser();

    // 3 recent transactions
    const recentTransactions = [...transactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    return (
        <Box>
            <Header />
            <Container maxWidth="lg">
                <Typography variant="h4" marginBottom="20px" marginTop="10px">
                    Welcome Back {currentUser?.name}!
                </Typography>

                {/* summary of transactions */}
                <TransactionSummary transactions={transactions} />

                {/* show recent transactions */}
                <Typography variant="h6" marginTop="20px">
                    Recent Transactions
                </Typography>
                <TransactionList
                    transactions={recentTransactions}
                />
            </Container>
        </Box>
    );
}
