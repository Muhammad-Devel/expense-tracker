import { useEffect, useState, useCallback } from "react";
import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";
import BottomNav from "../components/BottomNav";
import LoadingState from "../components/LoadingState";
import { fetchAnalytics, withRetry } from "../api/api";
import { formatSum, periodLabel } from "../utils/format";
import { categoryIcon } from "../utils/categories";

const PERIODS = ["daily", "monthly", "yearly"];

export default function Analytics() {
  const [period, setPeriod] = useState("monthly");
  const [data, setData] = useState({ timeline: [], byCategory: [] });
  const [loading, setLoading] = useState(true);
  const [waking, setWaking] = useState(false);

  const load = useCallback(async (p) => {
    setLoading(true);
    setWaking(false);
    try {
      const res = await withRetry(() => fetchAnalytics(p), {
        onRetry: () => setWaking(true),
      });
      setData({
        timeline: Array.isArray(res?.timeline) ? res.timeline : [],
        byCategory: Array.isArray(res?.byCategory) ? res.byCategory : [],
      });
    } catch {
      setData({ timeline: [], byCategory: [] });
    } finally {
      setLoading(false);
      setWaking(false);
    }
  }, []);

  useEffect(() => {
    load(period);
  }, [period, load]);

  const chiqimCategories = data.byCategory
    .filter((c) => c.type === "chiqim")
    .sort((a, b) => b.total - a.total);

  const maxChiqim = chiqimCategories[0]?.total || 1;

  const totalKirim = data.timeline.reduce((s, d) => s + d.kirim, 0);
  const totalChiqim = data.timeline.reduce((s, d) => s + d.chiqim, 0);

  return (
    <div className="app-shell">
      <Header title="Tahlil" subtitleDate={false} />

      <div style={styles.periodToggle}>
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            style={{
              ...styles.periodBtn,
              background: period === p ? "var(--gold)" : "transparent",
              color: period === p ? "#1A1200" : "var(--text-muted)",
            }}
          >
            {periodLabel(p)}
          </button>
        ))}
      </div>

      <div style={styles.totalsRow}>
        <div>
          <p style={styles.totalsLabel}>Jami kirim</p>
          <p style={{ ...styles.totalsValue, color: "var(--income)" }}>
            {formatSum(totalKirim)}
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={styles.totalsLabel}>Jami chiqim</p>
          <p style={{ ...styles.totalsValue, color: "var(--expense)" }}>
            {formatSum(totalChiqim)}
          </p>
        </div>
      </div>

      {loading ? (
        <LoadingState waking={waking} />
      ) : (
        <>
          <AnalyticsChart data={data.timeline} period={period} />

          <div style={styles.sectionHead}>
            <h3 style={styles.sectionTitle}>Kategoriyalar bo'yicha chiqim</h3>
          </div>

          {chiqimCategories.length === 0 ? (
            <p style={styles.status}>Hali chiqimlar mavjud emas.</p>
          ) : (
            <ul style={styles.catList}>
              {chiqimCategories.map((c) => (
                <li key={c.category} style={styles.catRow}>
                  <span style={styles.catIcon}>{categoryIcon(c.category)}</span>
                  <div style={styles.catMid}>
                    <div style={styles.catTop}>
                      <span style={styles.catName}>{c.category}</span>
                      <span style={styles.catValue}>{formatSum(c.total)}</span>
                    </div>
                    <div style={styles.barTrack}>
                      <div
                        style={{
                          ...styles.barFill,
                          width: `${Math.max(6, (c.total / maxChiqim) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      <BottomNav />
    </div>
  );
}

const styles = {
  periodToggle: {
    display: "flex",
    gap: 6,
    margin: "8px 20px 0",
    background: "var(--surface)",
    borderRadius: "var(--radius-md)",
    padding: 4,
  },
  periodBtn: {
    flex: 1,
    border: "none",
    borderRadius: 14,
    padding: "9px 0",
    fontSize: 13,
    fontWeight: 700,
  },
  totalsRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 20px 4px",
  },
  totalsLabel: {
    fontSize: 12,
    color: "var(--text-muted)",
    marginBottom: 4,
  },
  totalsValue: {
    fontSize: 16,
    fontWeight: 700,
  },
  sectionHead: {
    padding: "24px 20px 4px",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 700,
  },
  status: {
    padding: "16px 20px",
    color: "var(--text-muted)",
    fontSize: 14,
  },
  catList: {
    listStyle: "none",
    margin: "8px 20px 0",
    padding: 0,
  },
  catRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 0",
  },
  catIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    background: "var(--surface)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
    flexShrink: 0,
  },
  catMid: {
    flex: 1,
    minWidth: 0,
  },
  catTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
    fontSize: 13.5,
  },
  catName: {
    fontWeight: 600,
  },
  catValue: {
    color: "var(--text-muted)",
    fontWeight: 600,
  },
  barTrack: {
    height: 6,
    borderRadius: 4,
    background: "var(--surface)",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 4,
    background: "linear-gradient(90deg, var(--expense), #FFAA66)",
  },
};
