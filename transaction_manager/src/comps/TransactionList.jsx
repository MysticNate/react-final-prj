import React, { useState } from "react";
import {
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Dialog,
    Button,
    Box,
} from "@mui/material";
import { Edit, Trash2 } from "lucide-react"; 
import TransactionForm from "./TransactionForm";

export default function TransactionList({ transactions, onEdit, onDelete }) {
    const [editTransaction, setEditTransaction] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    // format money to 2 decimal places
    const formatMoney = (amount) => {
        return amount.toFixed(2);
    };

    // show message if no transactions exist
    if (transactions.length === 0) {
        return (
            <Paper style={{ padding: "20px", textAlign: "center" }}>
                <Typography>
                    No transactions yet!
                </Typography>
            </Paper>
        );
    }

    return (
        <>
            <Paper style={{ marginBottom: "20px" }}>
                <Typography variant="h6" style={{ padding: "15px" }}>
                    Transaction History
                </Typography>

                <List>
                    {transactions.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={
                                    <Box
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <Typography>
                                            {item.description}
                                        </Typography>
                                        <Typography
                                            style={{
                                                color:
                                                    item.type === "income"
                                                        ? "green"
                                                        : "red",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {item.type === "income" ? "+" : "-"}
                                            {formatMoney(item.amount)}
                                        </Typography>
                                    </Box>
                                }
                                secondary={item.type}
                            />
                            {/* show edit & delete button only if onEdit is provided */}
                            {onEdit && (
                                <IconButton
                                    onClick={() => setEditTransaction(item)}
                                >
                                    <Edit size={20} />
                                </IconButton>
                            )}
                            {onDelete && (
                                <IconButton
                                    onClick={() => setDeleteId(item.id)}
                                >
                                    <Trash2 size={20} />
                                </IconButton>
                            )}
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* edit box */}
            <Dialog
                open={!!editTransaction}
                onClose={() => setEditTransaction(null)}
            >
                <TransactionForm
                    initialValues={editTransaction}
                    onSubmit={(updated) => {
                        onEdit(editTransaction.id, updated);
                        setEditTransaction(null);
                    }}
                />
            </Dialog>

            {/* delete box */}
            <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
                <div style={{ padding: "20px" }}>
                    <Typography>Delete this transaction?</Typography>
                    <Box style={{ marginTop: "20px" }}>
                        <Button onClick={() => setDeleteId(null)}>
                            Cancel
                        </Button>
                        <Button
                            color="error"
                            onClick={() => {
                                onDelete(deleteId);
                                setDeleteId(null);
                            }}
                        >
                            Delete
                        </Button>
                    </Box>
                </div>
            </Dialog>
        </>
    );
};