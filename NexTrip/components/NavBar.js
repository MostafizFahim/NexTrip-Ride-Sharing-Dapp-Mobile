import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "./UserContext";

export default function NavBar() {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, setUser } = useUser();

  // Find alternate role if any
  const otherRole = user?.roles?.find(
    (r) => r !== (user.currentRole || user.role)
  );

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setMenuVisible(false);
    navigation.navigate("Login");
  };

  // Handle role switch
  const handleSwitchRole = () => {
    if (otherRole) {
      setUser({ ...user, currentRole: otherRole });
      setMenuVisible(false);
      navigation.navigate(otherRole === "Driver" ? "Driver" : "Passenger");
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#43cea2", "#185a9d"]}
        start={[0, 0]}
        end={[1, 0]}
        style={styles.appBar}
      >
        <TouchableOpacity
          style={styles.logoBox}
          onPress={() => navigation.navigate("Home")}
        >
          <Image source={require("../assets/logo12.png")} style={styles.logo} />
          <Text style={styles.appName}>NexTrip</Text>
          {user && (
            <View style={styles.roleChip}>
              <Text style={styles.roleChipText}>
                {user.currentRole || user.role}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.rightBox}>
          {user?.picture && (
            <Image source={{ uri: user.picture }} style={styles.avatar} />
          )}
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuSheet}>
            <MenuItem
              icon="home-outline"
              label="Home"
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Home");
              }}
            />
            {user && (
              <>
                {user.currentRole === "Passenger" && (
                  <MenuItem
                    icon="car-outline"
                    label="Passenger Dashboard"
                    onPress={() => {
                      setMenuVisible(false);
                      navigation.navigate("Passenger");
                    }}
                  />
                )}
                {user.currentRole === "Driver" && (
                  <MenuItem
                    icon="car-sports"
                    label="Driver Dashboard"
                    onPress={() => {
                      setMenuVisible(false);
                      navigation.navigate("Driver");
                    }}
                  />
                )}
                {user.currentRole === "Admin" && (
                  <MenuItem
                    icon="account-tie"
                    label="Admin Dashboard"
                    onPress={() => {
                      setMenuVisible(false);
                      navigation.navigate("Admin");
                    }}
                  />
                )}
                <MenuItem
                  icon="history"
                  label="Ride History"
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("RideHistory");
                  }}
                />
                {user.currentRole === "Passenger" && (
                  <MenuItem
                    icon="clock-outline"
                    label="Ride In Progress"
                    onPress={() => {
                      setMenuVisible(false);
                      navigation.navigate("RideInProgress");
                    }}
                  />
                )}
                {otherRole && (
                  <MenuItem
                    icon="swap-horizontal"
                    label={`Switch to ${otherRole}`}
                    onPress={handleSwitchRole}
                  />
                )}
                <MenuItem
                  icon="account-outline"
                  label="Profile"
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("Profile");
                  }}
                />
                <MenuItem
                  icon="logout"
                  label="Logout"
                  color="#b71c1c"
                  onPress={handleLogout}
                />
              </>
            )}
            {!user && (
              <>
                <MenuItem
                  icon="login"
                  label="Login"
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("Login");
                  }}
                />
                <MenuItem
                  icon="account-plus-outline"
                  label="Register"
                  onPress={() => {
                    setMenuVisible(false);
                    navigation.navigate("Register");
                  }}
                />
              </>
            )}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function MenuItem({ icon, label, onPress, color = "#222" }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons
        name={icon}
        size={23}
        color={color}
        style={{ marginRight: 13 }}
      />
      <Text style={[styles.menuItemText, { color }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 64,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 3,
    borderBottomColor: "#43cea2",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
    backgroundColor: "transparent",
  },
  logoBox: { flexDirection: "row", alignItems: "center" },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 7,
    marginRight: 7,
    backgroundColor: "#fff",
  },
  appName: { color: "#fff", fontWeight: "900", fontSize: 22, letterSpacing: 2 },
  rightBox: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  roleChip: {
    backgroundColor: "#00c896",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: 6,
  },
  roleChipText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#0007",
    justifyContent: "flex-end",
  },
  menuSheet: {
    backgroundColor: "#f4f6fb",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  menuItemText: { fontSize: 16, fontWeight: "500" },
});
