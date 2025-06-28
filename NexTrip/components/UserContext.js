// components/UserContext.js
import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from AsyncStorage when the app starts
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login: Set user in state and AsyncStorage
  const login = async (userData) => {
    setUser(userData);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (e) {
      console.error("Failed to save user", e);
    }
  };

  // Logout: Clear user from state and AsyncStorage
  const logout = async () => {
    setUser(null); // Immediate UI update
    try {
      await AsyncStorage.removeItem("user");
      // Optional: also remove other related keys
      await AsyncStorage.removeItem("userProfile");
      await AsyncStorage.removeItem("currentRole");
    } catch (e) {
      console.error("Failed to remove user", e);
    }
    // Don't do navigation here! RootNavigator will detect user == null.
  };

  // Update role: Safely update user's role in state and storage
  const updateRole = async (newRole) => {
    if (!user) return;
    const updatedUser = { ...user, role: newRole };
    setUser(updatedUser);
    try {
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (e) {
      console.error("Failed to update user role", e);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy usage
export const useUser = () => React.useContext(UserContext);
