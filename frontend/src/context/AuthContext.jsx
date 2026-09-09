import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { loginRequest, registerRequest, setAuthToken, onUnauthorized } from "../api/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "expense_tracker_token";
const EMAIL_KEY = "expense_tracker_email";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));
  const [email, setEmail] = useState(() => localStorage.getItem(EMAIL_KEY));
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthToken(token);
    setReady(true);
  }, [token]);

  const persist = (data) => {
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(EMAIL_KEY, data.email);
    setToken(data.token);
    setEmail(data.email);
  };

  const login = useCallback(async (emailInput, password) => {
    const data = await loginRequest(emailInput, password);
    console.log(data);
    
    persist(data);
    return data;
  }, []);

  const register = useCallback(async (emailInput, password) => {
    const data = await registerRequest(emailInput, password);
    console.log(data);
    persist(data);
    return data;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setAuthToken(null);
    setToken(null);
    setEmail(null);
  }, []);

  useEffect(() => {
    onUnauthorized(() => logout());
  }, [logout]);

  return (
    <AuthContext.Provider
      value={{ token, email, isAuthenticated: !!token, ready, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
