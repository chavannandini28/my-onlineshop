import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ CHECK USER + EXPIRY ON APP LOAD
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser"));
    const expiryTime = localStorage.getItem("expiryTime");

    if (savedUser && expiryTime) {
      if (Date.now() < expiryTime) {
        setUser(savedUser); // ✅ still valid
      } else {
        // ❌ expired → logout
        localStorage.removeItem("currentUser");
        localStorage.removeItem("expiryTime");
      }
    }
  }, []);

  // ✅ LOGIN FUNCTION (UPDATED)
  const login = (userData) => {
    const expiryTime = Date.now() + 30 * 60 * 1000; // ⏰ 30 minutes

    localStorage.setItem("currentUser", JSON.stringify(userData));
    localStorage.setItem("expiryTime", expiryTime);

    setUser(userData);
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("expiryTime");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;