import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function SelectRoleScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Select Your Role</Text>
        <Text style={styles.subtitle}>Choose how you'll use NexTrip.</Text>

        {/* Passenger Option */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => navigation.replace("Register", { role: "Passenger" })}
        >
          <FontAwesome5
            name="user-friends"
            size={38}
            color="#43cea2"
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.roleTitle}>Passenger</Text>
          <Text style={styles.roleDesc}>Book rides and travel securely.</Text>
        </TouchableOpacity>

        {/* Driver Option */}
        <TouchableOpacity
          style={styles.roleCard}
          onPress={() => navigation.replace("Register", { role: "Driver" })}
        >
          <FontAwesome5
            name="car"
            size={38}
            color="#185a9d"
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.roleTitle}>Driver</Text>
          <Text style={styles.roleDesc}>Offer rides and earn easily.</Text>
        </TouchableOpacity>

        {/* DEV/TEST QUICK LINKS */}
        {/* <View style={{ marginTop: 16, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.replace("Login")}
            style={styles.devBtn}
          >
            <Text style={styles.devBtnText}>Back to Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.devBtn}
          >
            <Text style={styles.devBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 70,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#f3fff9",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 23,
    opacity: 0.9,
  },
  roleCard: {
    backgroundColor: "#fff",
    width: width > 400 ? 330 : "98%",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 28,
    marginBottom: 18,
    elevation: 7,
    shadowColor: "#185a9d",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
  },
  roleTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 7,
    letterSpacing: 1,
  },
  roleDesc: {
    fontSize: 15,
    color: "#43cea2",
    marginBottom: 4,
    textAlign: "center",
  },
  devBtn: {
    marginVertical: 3,
    backgroundColor: "#185a9d",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 22,
  },
  devBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
