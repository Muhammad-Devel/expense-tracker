import { NavLink } from "react-router-dom";
import { Home, PieChart, Plus } from "lucide-react";

export default function BottomNav() {
  return (
    <nav style={styles.nav}>
      <NavLink to="/" end style={({ isActive }) => linkStyle(isActive)}>
        <Home size={22} strokeWidth={2.2} />
        <span style={styles.label}>Bosh sahifa</span>
      </NavLink>

      <NavLink to="/add" style={styles.addWrap} aria-label="Qo'shish">
        <span style={styles.addBtn}>
          <Plus size={26} color="#12172B" strokeWidth={2.6} />
        </span>
      </NavLink>

      <NavLink to="/analytics" style={({ isActive }) => linkStyle(isActive)}>
        <PieChart size={22} strokeWidth={2.2} />
        <span style={styles.label}>Tahlil</span>
      </NavLink>
    </nav>
  );
}

const linkStyle = (isActive) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 4,
  textDecoration: "none",
  color: isActive ? "var(--text)" : "var(--text-faint)",
  flex: 1,
});

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 480,
    display: "flex",
    alignItems: "center",
    padding: "12px 28px calc(14px + env(safe-area-inset-bottom))",
    background: "rgba(23,28,54,0.92)",
    backdropFilter: "blur(14px)",
    borderTop: "1px solid var(--border)",
  },
  label: {
    fontSize: 11,
    fontWeight: 600,
  },
  addWrap: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    textDecoration: "none",
    marginTop: -30,
  },
  addBtn: {
    width: 54,
    height: 54,
    borderRadius: "50%",
    background: "var(--gold)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 24px rgba(242,183,5,0.35)",
    border: "4px solid var(--bg)",
  },
};
