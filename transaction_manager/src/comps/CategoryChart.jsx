import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// register the necessary chart components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function CategoryBarChart({ transactions }) {
    // show only expense transactions
    const expenseTransactions = transactions.filter(
        (t) => t.type === "expense"
    );

    // group transactions by category and sum their amounts
    const categoryTotals = {};
    expenseTransactions.forEach((t) => {
        const category = t.category || "Uncategorized";
        categoryTotals[category] = (categoryTotals[category] || 0) + t.amount;
    });
    
    // extract labels and data values for the chart as arrays
    const labels = Object.keys(categoryTotals); 
    const dataValues = Object.values(categoryTotals);

    // Chart.js data
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Expenses by Category",
                data: dataValues,
                backgroundColor: "rgba(237, 24, 70, 0.6)",
            },
        ],
    };

    // Chart.js options to customize the chart
    const options = {
        responsive: true,
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
};