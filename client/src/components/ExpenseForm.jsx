import { useState } from "react";
import { GrAdd, GrClose } from "react-icons/gr";

const ExpenseForm = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const categorys = [
    "Oziq-ovqat",
    "Transport/Ijara",
    "Ovqatlanish",
    "Xaridlar",
    "Boshqa",
  ];
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() });
    setForm({ title: "", amount: "", category: "", date: "" });
    setOpen(false); // Forma yuborilgandan so‘ng yopish
  };

  return (
    <div>
      {/* Markazlashtirilgan tugma */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setOpen(!open)}
          className="flex justify-center mb-4 bg-white text-black text-3xl p-2 border-1 rounded-full shadow-md hover:scale-105 transition"
        >
          {open ? (
            <GrClose className="animate-btn-close" />
          ) : (
            <GrAdd className="animate-btn-open" />
          )}
        </button>
      </div>

      {/* Forma animatsiya bilan chiqadi */}
      {open && (
        <div
          className={`w-full bg-gray-100 p-4 rounded shadow-md mb-4 mx-auto
          transform transition duration-300 ease-out form-container ${
            open ? "open" : "close"
          }
`}
        >
          <form
            onSubmit={handleSubmit}
            className={`flex flex-col space-y-3 
          }`}
          >
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nomi"
              className="input"
              required
            />
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              placeholder="Summa"
              className="input"
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="" disabled>
                Kategoriyani tanlang
              </option>
              {categorys.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
              className="input"
              required
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Qo‘shish
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExpenseForm;
