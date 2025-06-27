import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import {
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Default user data
const defaultUser = {
  name: "Rayhan Ferdous Srejon",
  email: "srejon@email.com",
  avatar: require("../assets/srejon.jpg"),
  role: "Passenger",
  totalRides: 26,
  totalSpent: 4890,
};

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(defaultUser);

  // Load user data from AsyncStorage on mount
  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem("userProfile");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (e) {
        console.warn("Failed to load user profile:", e);
      }
    })();
  }, []);

  // Confirm logout before proceeding
  const confirmLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            // Clear any user data if needed
            AsyncStorage.removeItem("userProfile").finally(() =>
              navigation.replace("Login")
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.avatarBox}>
            <Image source={user.avatar} style={styles.avatar} />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <View style={styles.roleChip}>
            <Text style={styles.roleChipText}>{user.role}</Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="history" size={22} color="#185a9d" />
              <Text style={styles.statValue}>{user.totalRides}</Text>
              <Text style={styles.statLabel}>Total Rides</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialCommunityIcons name="cash" size={22} color="#43cea2" />
              <Text style={styles.statValue}>৳{user.totalSpent}</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RideHistory")}
            accessibilityRole="button"
            accessibilityLabel="View ride history"
          >
            <MaterialIcons name="history" size={22} color="#185a9d" />
            <Text style={styles.buttonText}>Ride History</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("EditProfile")}
            accessibilityRole="button"
            accessibilityLabel="Edit profile"
          >
            <Feather name="edit-3" size={20} color="#43cea2" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: "#fff0f0", borderColor: "#b71c1c" },
            ]}
            onPress={confirmLogout}
            accessibilityRole="button"
            accessibilityLabel="Logout"
          >
            <Feather name="log-out" size={20} color="#b71c1c" />
            <Text style={[styles.buttonText, { color: "#b71c1c" }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width > 400 ? 350 : "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    elevation: 7,
    shadowColor: "#185a9d",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 5 },
  },
  avatarBox: {
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#43cea2",
    padding: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#185a9d",
    marginBottom: 3,
    marginTop: 6,
  },
  email: {
    fontSize: 15,
    color: "#888",
    marginBottom: 6,
  },
  roleChip: {
    backgroundColor: "#43cea2",
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  roleChipText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "92%",
    marginBottom: 26,
  },
  statCard: {
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 15,
    padding: 12,
    width: "47%",
    elevation: 2,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#185a9d",
    marginTop: 7,
    marginBottom: 1,
  },
  statLabel: {
    fontSize: 13,
    color: "#43cea2",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#43cea2",
    borderWidth: 1,
    borderRadius: 13,
    backgroundColor: "#fff",
    marginTop: 13,
    paddingVertical: 12,
    paddingHorizontal: 27,
    width: "100%",
    justifyContent: "center",
    shadowColor: "#43cea2",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 0.5,
  },
});
