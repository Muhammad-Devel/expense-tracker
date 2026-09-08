import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { formatSum } from "../utils/format";

const oylarQisqa = ["Yan","Fev","Mar","Apr","May","Iyn","Iyl","Avg","Sen","Okt","Noy","Dek"];

function shortLabel(period, value) {
  if (period === "daily") return value.slice(8, 10);
  if (period === "yearly") return value;
  const [, m] = value.split("-");
  return oylarQisqa[Number(m) - 1] || value;
}

function CustomTooltip({ active, payload, label, period }) {
  if (!active || !payload || !payload.length) return null;
  const kirim = payload.find((p) => p.dataKey === "kirim")?.value || 0;
  const chiqim = payload.find((p) => p.dataKey === "chiqim")?.value || 0;
  return (
    <div style={ttStyles.box}>
      <p style={ttStyles.label}>{shortLabel(period, label)}</p>
      <p style={{ ...ttStyles.row, color: "var(--income)" }}>Kirim: {formatSum(kirim)}</p>
      <p style={{ ...ttStyles.row, color: "var(--expense)" }}>Chiqim: {formatSum(chiqim)}</p>
    </div>
  );
}

export default function AnalyticsChart({ data, period }) {
  const chartData = data.map((d) => ({ ...d, label: shortLabel(period, d.period) }));

  if (!chartData.length) {
    return (
      <div style={styles.emptyChart}>
        <p>Bu davr uchun ma'lumot yo'q</p>
      </div>
    );
  }

  return (
    <div style={styles.wrap}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={chartData} barGap={4} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--border)" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#9096B8", fontSize: 11 }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
          />
          <Tooltip
            content={<CustomTooltip period={period} />}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar dataKey="kirim" fill="var(--income)" radius={[6, 6, 0, 0]} maxBarSize={14} />
          <Bar dataKey="chiqim" fill="var(--expense)" radius={[6, 6, 0, 0]} maxBarSize={14} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  wrap: {
    margin: "8px 12px 0",
    background: "var(--surface)",
    borderRadius: "var(--radius-md)",
    padding: "16px 4px 6px",
    border: "1px solid var(--border)",
  },
  emptyChart: {
    margin: "8px 20px 0",
    padding: "36px 0",
    textAlign: "center",
    color: "var(--text-muted)",
    background: "var(--surface)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border)",
    fontSize: 13.5,
  },
};

const ttStyles = {
  box: {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    padding: "8px 12px",
  },
  label: { fontSize: 12, color: "var(--text-muted)", marginBottom: 4 },
  row: { fontSize: 12.5, fontWeight: 600 },
};
