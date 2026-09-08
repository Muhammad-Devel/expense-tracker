import { useState } from "react";
import { Trash2 } from "lucide-react";
import { formatSum } from "../utils/format";
import { categoryIcon } from "../utils/categories";

const oylarQisqa = [
  "Yan", "Fev", "Mar", "Apr", "May", "Iyn",
  "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek",
];

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${oylarQisqa[d.getMonth()]}`;
}

export default function TransactionList({ transactions, onDelete, emptyHint }) {
  const [openId, setOpenId] = useState(null);

  if (!transactions || transactions.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyEmoji}>🧾</p>
        <p style={styles.emptyTitle}>Hali yozuvlar yo'q</p>
        <p style={styles.emptyText}>
          {emptyHint || "Pastdagi tugma orqali birinchi kirim yoki chiqimingizni qo'shing."}
        </p>
      </div>
    );
  }

  return (
    <ul style={styles.list}>
      {transactions.map((t) => {
        const isOpen = openId === t._id;
        const isIncome = t.type === "kirim";
        return (
          <li
            key={t._id}
            style={styles.row}
            onClick={() => setOpenId(isOpen ? null : t._id)}
          >
            <span style={styles.iconCircle}>{categoryIcon(t.category)}</span>
            <div style={styles.mid}>
              <p style={styles.category}>{t.category}</p>
              <p style={styles.meta}>
                {formatDate(t.date)}
                {t.note ? ` · ${t.note}` : ""}
              </p>
            </div>

            {isOpen ? (
              <button
                style={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(t._id);
                }}
                aria-label="O'chirish"
              >
                <Trash2 size={16} color="var(--expense)" />
              </button>
            ) : (
              <span
                style={{
                  ...styles.amount,
                  color: isIncome ? "var(--income)" : "var(--expense)",
                }}
              >
                {isIncome ? "+" : "−"} {formatSum(t.amount)}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const styles = {
  list: {
    listStyle: "none",
    margin: "8px 20px 0",
    padding: 0,
    display: "flex",
    flexDirection: "column",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "13px 4px",
    borderBottom: "1px solid var(--border)",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    background: "var(--surface)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
  },
  mid: {
    flex: 1,
    minWidth: 0,
  },
  category: {
    fontSize: 14.5,
    fontWeight: 600,
  },
  meta: {
    fontSize: 12.5,
    color: "var(--text-muted)",
    marginTop: 3,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  amount: {
    fontSize: 14,
    fontWeight: 700,
    whiteSpace: "nowrap",
  },
  deleteBtn: {
    background: "var(--expense-soft)",
    border: "none",
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    textAlign: "center",
    padding: "48px 32px",
    color: "var(--text-muted)",
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyTitle: {
    color: "var(--text)",
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 13.5,
    lineHeight: 1.5,
  },
};
