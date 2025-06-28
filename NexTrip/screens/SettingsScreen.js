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
import { useUser } from "../components/UserContext";

export default function SettingsScreen({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout, updateRole } = useUser();

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
              await logout();
              await AsyncStorage.clear();
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

  // Role switching functions
  const switchToPassenger = () => {
    updateRole("passenger");
    Alert.alert("Role Changed", "You are now a Passenger");
  };

  const switchToDriver = () => {
    updateRole("driver");
    Alert.alert("Role Changed", "You are now a Driver");
  };

  const switchToAdmin = () => {
    updateRole("admin");
    Alert.alert("Role Changed", "You are now an Admin");
  };

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* Account Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>

          {user && (
            <View style={styles.roleSection}>
              <View style={styles.roleBadge}>
                <Text style={styles.roleText}>
                  Current Role:{" "}
                  <Text style={styles.roleHighlight}>{user.role}</Text>
                </Text>
              </View>

              <View style={styles.roleButtons}>
                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    user.role === "passenger" && styles.activeRoleButton,
                  ]}
                  onPress={switchToPassenger}
                  disabled={user.role === "passenger"}
                >
                  <Ionicons
                    name="person"
                    size={20}
                    color={user.role === "passenger" ? "#fff" : "#43cea2"}
                  />
                  <Text
                    style={[
                      styles.roleButtonText,
                      user.role === "passenger" && styles.activeRoleButtonText,
                    ]}
                  >
                    Passenger
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    user.role === "driver" && styles.activeRoleButton,
                  ]}
                  onPress={switchToDriver}
                  disabled={user.role === "driver"}
                >
                  <Ionicons
                    name="car"
                    size={20}
                    color={user.role === "driver" ? "#fff" : "#185a9d"}
                  />
                  <Text
                    style={[
                      styles.roleButtonText,
                      user.role === "driver" && styles.activeRoleButtonText,
                    ]}
                  >
                    Driver
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleButton,
                    user.role === "admin" && styles.activeRoleButton,
                  ]}
                  onPress={switchToAdmin}
                  disabled={user.role === "admin"}
                >
                  <Ionicons
                    name="shield"
                    size={20}
                    color={user.role === "admin" ? "#fff" : "#ff6b6b"}
                  />
                  <Text
                    style={[
                      styles.roleButtonText,
                      user.role === "admin" && styles.activeRoleButtonText,
                    ]}
                  >
                    Admin
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

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

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("NotificationsSettings")}
          >
            <Ionicons name="notifications-outline" size={20} color="#43cea2" />
            <Text style={styles.itemText}>Notification Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("LanguageSettings")}
          >
            <Ionicons name="language" size={20} color="#185a9d" />
            <Text style={styles.itemText}>Language Settings</Text>
          </TouchableOpacity>

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

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate("About")}
          >
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
  roleSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f9f7",
    borderRadius: 10,
  },
  roleBadge: {
    backgroundColor: "#e3f2fd",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  roleText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#185a9d",
  },
  roleHighlight: {
    color: "#43cea2",
    fontWeight: "bold",
  },
  roleButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  roleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 5,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  activeRoleButton: {
    backgroundColor: "#43cea2",
    borderColor: "#43cea2",
  },
  roleButtonText: {
    marginLeft: 5,
    fontWeight: "500",
    fontSize: 14,
    color: "#185a9d",
  },
  activeRoleButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
