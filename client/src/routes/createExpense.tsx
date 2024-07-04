import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/createExpense")({
  component: createExpenses,
});

function createExpenses() {
  return <div className="">Hello from Create Expense!</div>;
}
