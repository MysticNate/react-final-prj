import React from "react";
import { Paper, Typography, Grid, Box, useTheme } from "@mui/material";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default function TransactionSummary({ transactions }) {
    // get the current theme to check if we're in dark mode
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === "dark";

    // calculate totals
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0); // 0 is the initial value

    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    // format numbers to 2 decimal places
    const formatNumber = (num) => num.toFixed(2);

    // colors for light and dark mode
    const colors = {
        income: {
            light: {
                bg: "#e8f5e9",
                text: "rgba(0, 0, 0, 0.87)",
            },
            dark: {
                bg: "#1b5e20",
                text: "#ffffff",
            },
        },
        expense: {
            light: {
                bg: "#ffebee",
                text: "rgba(0, 0, 0, 0.87)",
            },
            dark: {
                bg: "#b71c1c",
                text: "#ffffff",
            },
        },
        balance: {
            light: {
                bg: "#e3f2fd",
                text: "rgba(0, 0, 0, 0.87)",
            },
            dark: {
                bg: "#0d47a1",
                text: "#ffffff",
            },
        },
    };

    return (
        <Paper style={{ padding: "20px", marginBottom: "20px" }}> 
            <Typography variant="h6">Summary</Typography>

            <Grid container spacing={3} style={{ marginTop: "10px" }}>
                {/* income box */}
                <Grid item xs={12} md={4}>
                    <Box
                        style={{
                            padding: "15px",
                            backgroundColor: isDarkMode
                                ? colors.income.dark.bg
                                : colors.income.light.bg,
                            color: isDarkMode
                                ? colors.income.dark.text
                                : colors.income.light.text,
                            borderRadius: "5px",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <TrendingUp
                                size={20}
                                style={{ marginRight: "5px" }}
                            />
                            <Typography>Income</Typography>
                        </Box>
                        <Typography variant="h5">
                            {formatNumber(income)}
                        </Typography>
                    </Box>
                </Grid>

                {/* expense box */}
                <Grid item xs={12} md={4}> 
                    <Box
                        style={{
                            padding: "15px",
                            backgroundColor: isDarkMode
                                ? colors.expense.dark.bg
                                : colors.expense.light.bg,
                            color: isDarkMode
                                ? colors.expense.dark.text
                                : colors.expense.light.text,
                            borderRadius: "5px",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <TrendingDown
                                size={20}
                                style={{ marginRight: "5px" }}
                            />
                            <Typography>Expenses</Typography>
                        </Box>
                        <Typography variant="h5">
                            {formatNumber(expense)}
                        </Typography>
                    </Box>
                </Grid>

                {/* balance box */}
                <Grid item xs={12} md={4}>
                    <Box
                        style={{
                            padding: "15px",
                            backgroundColor: isDarkMode
                                ? colors.balance.dark.bg
                                : colors.balance.light.bg,
                            color: isDarkMode
                                ? colors.balance.dark.text
                                : colors.balance.light.text,
                            borderRadius: "5px",
                            textAlign: "center",
                        }}
                    >
                        <Box
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <DollarSign
                                size={20}
                                style={{ marginRight: "5px" }}
                            />
                            <Typography>Balance</Typography>
                        </Box>
                        <Typography variant="h5">
                            {formatNumber(balance)}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
