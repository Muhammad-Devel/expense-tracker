import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import SummaryCard from "./components/SummaryCard";
import ExpenseChart from "./components/ExpenseChart";
import CategoryChart from "./components/CategoryChart";
// import DateFilter from "./components/DateFilter";
import { isWithinInterval, parseISO } from "date-fns"; // 📦
import { createExpense, fetchExpenses } from "./api/expenses";
import dayjs from "dayjs"; // 📦
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [loading, setLoading] = useState(true);

  const expensesFromDB = async () => {
    setLoading(true);
    const response = await fetchExpenses();
    if (response.status !== 200) {
      console.error("Error fetching expenses:", response);
      return [];
    } else {
      console.log("Expenses fetched successfully:", response.data);
    }
    setLoading(false);
    return setExpenses(response.data);
  };

  useEffect(() => {
    expensesFromDB();
  }, []);

  const addExpense = async (exp) => {
    if (!exp.title || !exp.amount || !exp.category || !exp.date) {
      console.error("All fields are required");
      return;
    }
    if (isNaN(exp.amount)) {
      console.error("Amount must be a number");
      return;
    }
    if (exp.amount <= 0) {
      console.error("Amount must be greater than 0");
      return;
    }
    setLoading(true);
    const response = await createExpense(exp);
    if (response.status !== 200 && response.status !== 201) {
      console.error("Error adding expense:", response);
      return;
    } else {
      console.log("Expense added successfully:", response.data);
    }

    expensesFromDB();
    // setExpenses((prev) => [...prev, response.data]);
  };

  // Filterlangan expenses
  const filteredExpenses = expenses.filter((exp) => {
    dayjs(exp.date).isSame(currentMonth, "month");
    const start = currentMonth.startOf("month").toDate();
    const end = currentMonth.endOf("month").toDate();
    const date = parseISO(exp.date);
    return isWithinInterval(date, { start, end });
  });

  const handlePrevMonth = () =>
    setCurrentMonth(currentMonth.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth(currentMonth.add(1, "month"));

  const total = filteredExpenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );

  const allSummary = expenses.reduce(
    (sum, e) => sum + parseFloat(e.amount || 0),
    0
  );
  const allCount = expenses.length;

  //Loader
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-6 bg-white w-full p-4 rounded">
          💲 Expense Tracker
        </h1>
        {/* <DateFilter
          fromDate={fromDate}
          toDate={toDate}
          onChange={handleDateChange}
        /> */}
        <ExpenseForm onAdd={addExpense} />
        <SummaryCard
          total={total}
          allCount={allCount}
          allSummary={allSummary}
        />
        <div className="flex justify-between items-center bg-white rounded my-4 p-2 shadow">
          <button
            onClick={handlePrevMonth}
            className="p-2 text-2xl hover:bg-gray-200"
          >
            <FaAngleLeft />
          </button>
          <h2 className="text-xl font-bold">
            {currentMonth.format("MMMM YYYY")}
          </h2>
          <button
            onClick={handleNextMonth}
            className=" p-2 text-2xl hover:bg-gray-200"
          >
            <FaAngleRight />
          </button>
        </div>

        <ExpenseList items={filteredExpenses} />

        <ExpenseChart data={expenses} />
        <CategoryChart data={expenses} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
