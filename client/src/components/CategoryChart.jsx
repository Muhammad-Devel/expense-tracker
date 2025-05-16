import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#ff6384",
  "#36a2eb",
];

const CategoryChart = ({ data }) => {
  const grouped = data.reduce((acc, item) => {
    const cat = item.category || "Nomaʼlum";
    acc[cat] = (acc[cat] || 0) + parseFloat(item.amount);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="bg-white shadow p-4 rounded-lg my-6">
      <h3 className="text-lg font-semibold mb-4">
        Kategoriya bo‘yicha xarajatlar
      </h3>
      {data.length !== 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;
