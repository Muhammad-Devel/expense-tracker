import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import BalanceCard from "../components/BalanceCard";
import TransactionList from "../components/TransactionList";
import BottomNav from "../components/BottomNav";
import LoadingState from "../components/LoadingState";
import { withRetry, fetchSummary, fetchTransactions, deleteTransaction } from "../api/api";

export default function Home() {
  const [summary, setSummary] = useState({ kirim: 0, chiqim: 0, balans: 0 });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [waking, setWaking] = useState(false);
  const [error, setError] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setError(null);
      setWaking(false);
      const [s, t] = await withRetry(
        () => Promise.all([fetchSummary(), fetchTransactions({ limit: 30 })]),
        { onRetry: () => setWaking(true) }
      );
      setSummary(s);
      setTransactions(Array.isArray(t) ? t : []);
    } catch (err) {
      setError("Ma'lumotlarni yuklab bo'lmadi. Backend ishlab turganini tekshiring.");
    } finally {
      setLoading(false);
      setWaking(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id) => {
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    try {
      await deleteTransaction(id);
      loadData();
    } catch {
      loadData();
    }
  };

  return (
    <div className="app-shell">
      <Header title="Hisobim" showLogout />
      <BalanceCard {...summary} />

      <div style={styles.sectionHead}>
        <h3 style={styles.sectionTitle}>So'nggi yozuvlar</h3>
      </div>

      {loading ? (
        <LoadingState waking={waking} />
      ) : error ? (
        <p style={{ ...styles.status, color: "var(--expense)" }}>{error}</p>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      )}

      <BottomNav />
    </div>
  );
}

const styles = {
  sectionHead: {
    padding: "24px 20px 4px",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
  },
  status: {
    padding: "20px",
    color: "var(--text-muted)",
    fontSize: 14,
  },
};
