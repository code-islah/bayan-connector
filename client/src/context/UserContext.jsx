import { createContext, useState, useEffect } from "react";

import axios from "../API/axios.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/auth/me");

      setUser(res.data.user);
    } catch (err) {
      console.error("Failed to load user:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
