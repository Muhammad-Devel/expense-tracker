import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { formatSum } from "../utils/format";

export default function BalanceCard({ kirim = 0, chiqim = 0, balans = 0 }) {
  return (
    <div style={styles.card}>
      <div style={styles.meshA} />

      <p style={styles.label}>Umumiy balans</p>
      <h2 style={styles.amount}>{formatSum(balans)}</h2>

      <div style={styles.row}>
        <div style={styles.chip}>
          <span style={{ ...styles.iconWrap, background: "var(--income-soft)" }}>
            <ArrowDownLeft size={16} color="var(--income)" />
          </span>
          <div>
            <p style={styles.chipLabel}>Kirim</p>
            <p style={{ ...styles.chipValue, color: "var(--income)" }}>
              {formatSum(kirim)}
            </p>
          </div>
        </div>

        <div style={styles.chip}>
          <span style={{ ...styles.iconWrap, background: "var(--expense-soft)" }}>
            <ArrowUpRight size={16} color="var(--expense)" />
          </span>
          <div>
            <p style={styles.chipLabel}>Chiqim</p>
            <p style={{ ...styles.chipValue, color: "var(--expense)" }}>
              {formatSum(chiqim)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    margin: "12px 20px 0",
    borderRadius: "var(--radius-lg)",
    padding: "24px 22px 22px",
    background: "linear-gradient(160deg, #1B2148 0%, #141834 70%)",
    border: "1px solid var(--border)",
    position: "relative",
    overflow: "hidden",
  },
  meshA: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(242,183,5,0.14), transparent 70%)",
    top: -110,
    right: -90,
    pointerEvents: "none",
  },
  label: {
    color: "var(--text-muted)",
    fontSize: 13,
    fontWeight: 500,
    position: "relative",
  },
  amount: {
    fontFamily: "var(--font-display)",
    fontSize: 34,
    fontWeight: 700,
    marginTop: 6,
    letterSpacing: "-0.01em",
    position: "relative",
  },
  row: {
    display: "flex",
    gap: 12,
    marginTop: 22,
    position: "relative",
  },
  chip: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 10,
    background: "rgba(255,255,255,0.03)",
    border: "1px solid var(--border)",
    borderRadius: "var(--radius-md)",
    padding: "10px 12px",
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  chipLabel: {
    fontSize: 12,
    color: "var(--text-muted)",
  },
  chipValue: {
    fontSize: 14,
    fontWeight: 600,
    marginTop: 2,
  },
};
