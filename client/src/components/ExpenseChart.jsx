import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ data }) => {
  const grouped = data.reduce((acc, item) => {
    const month = item.date?.slice(0, 7); // YYYY-MM
    acc[month] = (acc[month] || 0) + parseFloat(item.amount);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([month, amount]) => ({
    month,
    amount,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-lg my-6">
      <h3 className="text-lg font-semibold mb-4">Oylik xarajatlar grafikasi</h3>
      {data.length !== 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ExpenseChart;
