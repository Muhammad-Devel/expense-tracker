import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authStyles as styles } from "../styles/authStyles";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Kirishda xatolik yuz berdi");
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
        <h2 style={styles.title}>Kirish</h2>

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
          placeholder="••••••••"
          required
        />

        <button type="submit" style={styles.submitBtn} disabled={submitting}>
          {submitting ? "Kirilmoqda..." : "Kirish"}
        </button>

        <p style={styles.switchText}>
          Hisobingiz yo'qmi? <Link to="/register" style={styles.link}>Ro'yxatdan o'ting</Link>
        </p>
      </form>
    </div>
  );
}
