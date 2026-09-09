import axios from "axios";

// Lokalda bo'sh qoldirilsa, vite.config.js dagi proxy "/api" ni backendga yo'naltiradi.
// Productionda (Vercel) VITE_API_URL environment variable orqali Render backend manzili beriladi,
// masalan: https://expense-tracker-backend.onrender.com/api
const baseURL = import.meta.env.VITE_API_URL || "https://expense-tracker-cieg.onrender.com/api";

const api = axios.create({
  baseURL,
  // timeout: 20000,
});

// --- Token boshqaruvi -------------------------------------------------

// JWT tokenni har bir so'rovga avtomatik biriktirish uchun.
// AuthContext token o'zgarganda shu funksiyani chaqiradi.
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

// Token muddati o'tgan yoki yaroqsiz bo'lsa (401), AuthContext'ga xabar beramiz
// (avtomatik logout qilish uchun).
let unauthorizedHandler = null;
export const onUnauthorized = (handler) => {
  unauthorizedHandler = handler;
};

// --- Javoblarni tekshirish ---------------------------------------------

api.interceptors.response.use(
  (response) => {
    // Agar backend manzili noto'g'ri sozlangan bo'lsa (masalan VITE_API_URL yo'q),
    // so'rov JSON o'rniga HTML sahifa qaytarishi mumkin (masalan Vercel'ning o'zi
    // qaytargan index.html). Buni aniq xato sifatida ushlaymiz, shunda ilova
    // "e.map is not a function" kabi tushunarsiz xato bilan buzilib qolmaydi.
    const contentType = response.headers?.["content-type"] || "";
    if (contentType.includes("text/html")) {
      return Promise.reject(
        new Error(
          "Backend manzilidan noto'g'ri javob keldi (HTML qaytdi). VITE_API_URL to'g'ri sozlanganini tekshiring."
        )
      );
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      unauthorizedHandler?.();
    }
    return Promise.reject(error);
  }
);

// --- Cold-start uchun avtomatik qayta urinish ---------------------------

// Render kabi bepul hosting'lar 15 daqiqa faolsizlikdan keyin "uxlab qoladi" va
// birinchi so'rovga ulanish xatosi (ERR_CONNECTION_RESET / Network Error) bilan
// javob berishi mumkin, chunki konteyner hali to'liq ishga tushmagan bo'ladi.
// Shu turdagi (server javob bermagan) xatolarda so'rovni bir necha marta,
// orada kutib, qayta yuboramiz.
const isColdStartError = (error) =>
  !error.response &&
  (error.code === "ECONNABORTED" || error.message === "Network Error" || !!error.request);

export const withRetry = async (fn, { retries = 4, delayMs = 4000, onRetry } = {}) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries && isColdStartError(error)) {
        onRetry?.(attempt + 1, retries);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
};

// --- Auth endpointlari ---------------------------------------------------

export const registerRequest = (email, password) =>
  api.post("/auth/register", { email, password }).then((r) => r.data);

export const loginRequest = (email, password) =>
  api.post("/auth/login", { email, password }).then((r) => r.data);

// --- Tranzaksiya endpointlari ---------------------------------------------

export const fetchTransactions = (params = {}) =>
  api.get("/transactions", { params }).then((r) => r.data);

export const fetchSummary = () =>
  api.get("/transactions/summary").then((r) => r.data);

export const fetchAnalytics = (period = "monthly") =>
  api.get("/transactions/analytics", { params: { period } }).then((r) => r.data);

export const addTransaction = (payload) =>
  api.post("/transactions", payload).then((r) => r.data);

export const updateTransaction = (id, payload) =>
  api.put(`/transactions/${id}`, payload).then((r) => r.data);

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`).then((r) => r.data);

export default api;
