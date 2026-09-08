import { useState } from "react";
import { KIRIM_CATEGORIES, CHIQIM_CATEGORIES } from "../utils/categories";

export default function TransactionForm({ onSubmit, submitting, waking }) {
  const [type, setType] = useState("chiqim");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(CHIQIM_CATEGORIES[0]);
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const categories = type === "kirim" ? KIRIM_CATEGORIES : CHIQIM_CATEGORIES;

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(newType === "kirim" ? KIRIM_CATEGORIES[0] : CHIQIM_CATEGORIES[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    onSubmit({ type, amount: Number(amount), category, note, date });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.toggle}>
        <button
          type="button"
          onClick={() => handleTypeChange("chiqim")}
          style={{
            ...styles.toggleBtn,
            background: type === "chiqim" ? "var(--expense)" : "transparent",
            color: type === "chiqim" ? "#1A1200" : "var(--text-muted)",
          }}
        >
          Chiqim
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange("kirim")}
          style={{
            ...styles.toggleBtn,
            background: type === "kirim" ? "var(--income)" : "transparent",
            color: type === "kirim" ? "#062018" : "var(--text-muted)",
          }}
        >
          Kirim
        </button>
      </div>

      <label style={styles.label}>Summa</label>
      <div style={styles.amountWrap}>
        <input
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={styles.amountInput}
          required
        />
        <span style={styles.suffix}>so'm</span>
      </div>

      <label style={styles.label}>Kategoriya</label>
      <div style={styles.chipsWrap}>
        {categories.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setCategory(c)}
            style={{
              ...styles.categoryChip,
              borderColor: category === c ? "var(--gold)" : "var(--border)",
              color: category === c ? "var(--gold)" : "var(--text-muted)",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <label style={styles.label}>Sana</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>Izoh (ixtiyoriy)</label>
      <input
        type="text"
        placeholder="Masalan: Bozordan sabzavot"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={styles.input}
        maxLength={80}
      />

      <button type="submit" style={styles.submitBtn} disabled={submitting}>
        {waking ? "Backend uyg'onmoqda..." : submitting ? "Saqlanmoqda..." : "Saqlash"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    padding: "4px 20px 24px",
    display: "flex",
    flexDirection: "column",
  },
  toggle: {
    display: "flex",
    background: "var(--surface)",
    borderRadius: "var(--radius-md)",
    padding: 4,
    gap: 4,
    marginBottom: 22,
  },
  toggleBtn: {
    flex: 1,
    border: "none",
    borderRadius: 14,
    padding: "11px 0",
    fontWeight: 700,
    fontSize: 14.5,
    transition: "background 0.15s ease",
  },
  label: {
    fontSize: 13,
    color: "var(--text-muted)",
    fontWeight: 600,
    marginBottom: 8,
    marginTop: 4,
  },
  amountWrap: {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    borderBottom: "2px solid var(--border)",
    paddingBottom: 10,
    marginBottom: 22,
  },
  amountInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    color: "var(--text)",
    fontFamily: "var(--font-display)",
    fontSize: 32,
    fontWeight: 700,
    outline: "none",
    minWidth: 0,
  },
  suffix: {
    color: "var(--text-muted)",
    fontSize: 15,
    fontWeight: 600,
  },
  chipsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 22,
  },
  categoryChip: {
    background: "var(--surface)",
    border: "1.5px solid var(--border)",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 13.5,
    fontWeight: 600,
  },
  input: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-sm)",
    padding: "13px 14px",
    color: "var(--text)",
    fontSize: 14.5,
    marginBottom: 22,
    outline: "none",
  },
  submitBtn: {
    marginTop: 6,
    background: "var(--gold)",
    color: "#1A1200",
    border: "none",
    borderRadius: "var(--radius-md)",
    padding: "16px 0",
    fontSize: 15.5,
    fontWeight: 700,
  },
};
