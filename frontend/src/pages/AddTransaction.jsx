import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import TransactionForm from "../components/TransactionForm";
import { addTransaction, withRetry } from "../api/api";

export default function AddTransaction() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [waking, setWaking] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (payload) => {
    setSubmitting(true);
    setWaking(false);
    setError(null);
    try {
      await withRetry(() => addTransaction(payload), {
        onRetry: () => setWaking(true),
      });
      navigate("/");
    } catch (err) {
      setError("Saqlashda xatolik yuz berdi. Qaytadan urinib ko'ring.");
      setSubmitting(false);
      setWaking(false);
    }
  };

  return (
    <div className="app-shell">
      <header style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate(-1)} aria-label="Orqaga">
          <ChevronLeft size={22} />
        </button>
        <h1 style={styles.title}>Yangi yozuv</h1>
        <span style={{ width: 22 }} />
      </header>

      {error && <p style={styles.error}>{error}</p>}

      <TransactionForm onSubmit={handleSubmit} submitting={submitting} waking={waking} />
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 16px 12px",
  },
  backBtn: {
    background: "var(--surface)",
    border: "none",
    width: 36,
    height: 36,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text)",
  },
  title: {
    fontSize: 17,
    fontWeight: 700,
  },
  error: {
    margin: "0 20px 16px",
    color: "var(--expense)",
    fontSize: 13.5,
  },
};
