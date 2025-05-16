import { motion, MotionConfig } from "motion/react"; //

const ExpenseList = ({ items }) => {
  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 animate-fade-in">
        ❌ Bu oyda xarajat yo‘q.
      </p>
    );
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {items.map((item) => (
        <div key={item._id || item.id} className="bg-white p-2 shadow rounded">
          <div className="font-semibold">{item.title}</div>
          <div>
            {item.amount} so‘m - {item.category}
          </div>
          <div className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
