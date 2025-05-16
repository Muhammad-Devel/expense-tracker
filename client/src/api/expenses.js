import axios from "axios";

const API = axios.create({
  baseURL: "/api/expenses",
});

// GET all expenses
export const fetchExpenses = () => API.get("/");

// POST new expense
export const createExpense = (data) => API.post("/", data);
