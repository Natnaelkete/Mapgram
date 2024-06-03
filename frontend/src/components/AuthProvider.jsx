import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("mapinuser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setCredential = (userData) => {
    setUser(userData);
  };

  const removeCredential = () => {
    setUser(null);
    localStorage.removeItem("mapinuser");
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("mapinuser", JSON.stringify(user));
    } else {
      localStorage.removeItem("mapinuser");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setCredential, removeCredential }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
