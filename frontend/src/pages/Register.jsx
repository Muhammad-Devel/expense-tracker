import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authStyles as styles } from "../styles/authStyles";

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("Parol kamida 6 belgidan iborat bo'lishi kerak");
      return;
    }
    if (password !== confirm) {
      setError("Parollar mos kelmadi");
      return;
    }

    setSubmitting(true);
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Ro'yxatdan o'tishda xatolik yuz berdi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell" style={styles.shell}>
      <div style={styles.logoWrap}>
        <span style={styles.logoCircle}>💰</span>
        <h1 style={styles.appName}>Hisobim</h1>
        <p style={styles.tagline}>Kirim-chiqimlaringizni nazorat qiling</p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Ro'yxatdan o'tish</h2>

        {error && <p style={styles.error}>{error}</p>}

        <label style={styles.label}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          placeholder="siz@misol.com"
          required
        />

        <label style={styles.label}>Parol</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="Kamida 6 belgi"
          required
        />

        <label style={styles.label}>Parolni takrorlang</label>
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          style={styles.input}
          placeholder="••••••••"
          required
        />

        <button type="submit" style={styles.submitBtn} disabled={submitting}>
          {submitting ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
        </button>

        <p style={styles.switchText}>
          Hisobingiz bormi? <Link to="/login" style={styles.link}>Kiring</Link>
        </p>
      </form>
    </div>
  );
}
