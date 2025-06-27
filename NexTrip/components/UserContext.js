import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Key for AsyncStorage
const USER_KEY = "NEXTRIP_USER_DATA";

// 1. Create Context
const UserContext = createContext();

// 2. Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // { name, email, role, ... }
  const [loading, setLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(USER_KEY);
        if (saved) setUser(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to load user", e);
      }
      setLoading(false);
    })();
  }, []);

  // Save user to storage
  const saveUser = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
  };

  // Login
  const login = async (userData) => {
    await saveUser(userData);
  };

  // Logout
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(USER_KEY);
  };

  // Update profile info
  const updateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    await saveUser(updated);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// 3. Custom hook for easy access
export function useUser() {
  return useContext(UserContext);
}
