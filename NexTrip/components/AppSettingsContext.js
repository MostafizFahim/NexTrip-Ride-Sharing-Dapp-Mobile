import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "NEXTRIP_APP_SETTINGS";

// Default settings
const defaultSettings = {
  language: "en", // or "bn" etc
  notificationsEnabled: true, // push/email
  theme: "light", // "light" or "dark" (optional)
};

// 1. Create Context
const AppSettingsContext = createContext();

// 2. Provider
export function AppSettingsProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Restore from storage
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(SETTINGS_KEY);
        if (saved) setSettings({ ...defaultSettings, ...JSON.parse(saved) });
      } catch (e) {
        console.warn("Failed to load app settings", e);
      }
      setLoading(false);
    })();
  }, []);

  // Save to storage
  const saveSettings = async (newSettings) => {
    setSettings(newSettings);
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  // Update one or more keys
  const updateSettings = async (updates) => {
    const updated = { ...settings, ...updates };
    await saveSettings(updated);
  };

  // Individual helpers
  const setLanguage = (lang) => updateSettings({ language: lang });
  const setNotificationsEnabled = (enabled) =>
    updateSettings({ notificationsEnabled: enabled });
  const setTheme = (theme) => updateSettings({ theme });

  return (
    <AppSettingsContext.Provider
      value={{
        settings,
        loading,
        setLanguage,
        setNotificationsEnabled,
        setTheme,
        updateSettings,
      }}
    >
      {children}
    </AppSettingsContext.Provider>
  );
}

// 3. Custom hook
export function useAppSettings() {
  return useContext(AppSettingsContext);
}
