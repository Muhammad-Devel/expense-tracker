export default function LoadingState({ waking }) {
  return (
    <div style={styles.wrap}>
      <span style={styles.spinner} />
      <p style={styles.title}>{waking ? "Backend uyg'onmoqda" : "Yuklanmoqda"}</p>
      {waking && (
        <p style={styles.subtitle}>
          Bepul server uxlab qolgan edi — odatda 30-50 soniya vaqt oladi
        </p>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "48px 32px",
    gap: 14,
  },
  spinner: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "3px solid var(--surface-soft)",
    borderTopColor: "var(--gold)",
    animation: "spin 0.8s linear infinite",
  },
  title: {
    fontSize: 14.5,
    fontWeight: 600,
    color: "var(--text)",
  },
  subtitle: {
    fontSize: 13,
    color: "var(--text-muted)",
    lineHeight: 1.5,
    maxWidth: 260,
  },
};
