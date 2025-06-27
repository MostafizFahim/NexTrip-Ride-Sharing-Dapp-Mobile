import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    (async () => {
      try {
        const notif = await AsyncStorage.getItem("notificationsEnabled");
        if (notif !== null) setNotificationsEnabled(JSON.parse(notif));

        const dark = await AsyncStorage.getItem("darkMode");
        if (dark !== null) setDarkMode(JSON.parse(dark));
      } catch (e) {
        console.warn("Failed to load settings", e);
      }
    })();
  }, []);

  // Save notifications toggle changes
  useEffect(() => {
    AsyncStorage.setItem(
      "notificationsEnabled",
      JSON.stringify(notificationsEnabled)
    ).catch((e) => console.warn("Failed to save notifications", e));
  }, [notificationsEnabled]);

  // Save dark mode toggle changes
  useEffect(() => {
    AsyncStorage.setItem("darkMode", JSON.stringify(darkMode)).catch((e) =>
      console.warn("Failed to save dark mode", e)
    );
  }, [darkMode]);

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("EditProfile")}
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="user" size={20} color="#185a9d" />
            <Text style={styles.itemText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ChangePassword")}
            accessibilityRole="button"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons name="lock-outline" size={20} color="#185a9d" />
            <Text style={styles.itemText}>Change Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Preferences</Text>
          <View style={styles.itemRow}>
            <Ionicons name="notifications-outline" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Enable Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: "#43cea2", false: "#ccc" }}
              thumbColor={notificationsEnabled ? "#43cea2" : "#ccc"}
              style={{ marginLeft: "auto" }}
            />
          </View>
          <View style={styles.itemRow}>
            <Ionicons name="moon-outline" size={20} color="#185a9d" />
            <Text style={styles.itemText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: "#185a9d", false: "#ccc" }}
              thumbColor={darkMode ? "#185a9d" : "#ccc"}
              style={{ marginLeft: "auto" }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("HelpScreen")}
          >
            <MaterialIcons name="help-outline" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item}>
            <Feather name="info" size={20} color="#185a9d" />
            <Text style={styles.itemText}>About NexTrip</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 26,
    paddingBottom: 40,
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 12,
    textAlign: "center",
  },
  section: {
    marginTop: 25,
    marginBottom: 8,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    elevation: 2,
    shadowColor: "#185a9d88",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
  },
  sectionTitle: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 12,
    marginLeft: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    paddingVertical: 4,
  },
  itemText: {
    marginLeft: 12,
    fontWeight: "500",
    fontSize: 15,
    color: "#185a9d",
  },
});
