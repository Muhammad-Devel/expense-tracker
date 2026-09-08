import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const oylar = [
  "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
  "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr",
];

export default function Header({ title, subtitleDate = true, showLogout = false }) {
  const { logout } = useAuth();
  const now = new Date();
  const sana = `${now.getDate()} ${oylar[now.getMonth()]}, ${now.getFullYear()}`;

  return (
    <header style={styles.wrap}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {subtitleDate && <p style={styles.date}>{sana}</p>}
      </div>
      {showLogout && (
        <button style={styles.logoutBtn} onClick={logout} aria-label="Chiqish">
          <LogOut size={18} color="var(--text-muted)" />
        </button>
      )}
    </header>
  );
}

const styles = {
  wrap: {
    padding: "28px 20px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: "-0.02em",
  },
  date: {
    color: "var(--text-muted)",
    fontSize: 14,
    marginTop: 4,
  },
  logoutBtn: {
    background: "var(--surface)",
    border: "none",
    width: 38,
    height: 38,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
