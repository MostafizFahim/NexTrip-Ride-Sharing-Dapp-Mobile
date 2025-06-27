import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "../components/UserContext"; // Import your user hook

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { logout } = useUser(); // Get logout from context

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

  useEffect(() => {
    AsyncStorage.setItem(
      "notificationsEnabled",
      JSON.stringify(notificationsEnabled)
    ).catch((e) => console.warn("Failed to save notifications", e));
  }, [notificationsEnabled]);

  useEffect(() => {
    AsyncStorage.setItem("darkMode", JSON.stringify(darkMode)).catch((e) =>
      console.warn("Failed to save dark mode", e)
    );
  }, [darkMode]);

  const handleReset = () => {
    Alert.alert(
      "Reset App",
      "Are you sure you want to reset the app? This will clear all your data and log you out.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await logout(); // clear user data from context and AsyncStorage
              await AsyncStorage.clear(); // clear all AsyncStorage data (optional)
              navigation.reset({
                index: 0,
                routes: [{ name: "Onboarding" }],
              });
            } catch (e) {
              console.warn("Failed to reset app data", e);
            }
          },
        },
      ]
    );
  };

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* Account Section */}
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

        {/* App Preferences Section */}
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

        {/* More Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More</Text>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialIcons name="notifications" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("Wallet")}
          >
            <MaterialIcons
              name="account-balance-wallet"
              size={20}
              color="#185a9d"
            />
            <Text style={styles.itemText}>Wallet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("PromoCodes")}
          >
            <MaterialIcons name="local-offer" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Promo Codes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("InviteFriends")}
          >
            <MaterialIcons name="group-add" size={20} color="#185a9d" />
            <Text style={styles.itemText}>Invite Friends</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("HelpScreen")}
          >
            <MaterialIcons name="help-outline" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("ContactUs")}
          >
            <MaterialIcons name="call" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Contact Us</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Feather name="info" size={20} color="#185a9d" />
            <Text style={styles.itemText}>About NexTrip</Text>
          </TouchableOpacity>
        </View>

        {/* Reset App Button */}
        <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
          <Text style={styles.resetBtnText}>Reset App / Logout</Text>
        </TouchableOpacity>
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
  resetBtn: {
    marginTop: 30,
    backgroundColor: "#b71c1c",
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  resetBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
