import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function SelectRoleScreen() {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Get Started with NexTrip</Text>
        <Text style={styles.subtitle}>Who are you?</Text>
        <View style={styles.rolesRow}>
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("Register", { role: "Passenger" })
            }
          >
            <LinearGradient
              colors={["#43cea2", "#5cc7b2"]}
              style={styles.roleIconGradient}
            >
              <MaterialCommunityIcons
                name="account"
                size={48}
                color="#fff"
                style={{ marginBottom: 2 }}
              />
            </LinearGradient>
            <Text style={styles.roleName}>Passenger</Text>
            <Text style={styles.roleDesc}>Book rides quickly</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roleCard}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Register", { role: "Driver" })}
          >
            <LinearGradient
              colors={["#185a9d", "#43cea2"]}
              style={styles.roleIconGradient}
            >
              <FontAwesome
                name="car"
                size={43}
                color="#fff"
                style={{ marginBottom: 6 }}
              />
            </LinearGradient>
            <Text style={styles.roleName}>Driver</Text>
            <Text style={styles.roleDesc}>Earn by driving</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{" "}
            <Text style={{ color: "#43cea2" }}>Sign In</Text>
          </Text>
        </TouchableOpacity>

        {/* Continue as Guest Option */}
        <TouchableOpacity
          style={styles.guestBtn}
          onPress={() => navigation.replace("Home")} // or another guest-allowed screen
        >
          <Feather name="user" size={18} color="#185a9d" />
          <Text style={styles.guestText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    width: width > 400 ? 380 : "93%",
    marginTop: 30,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 26,
    paddingVertical: 34,
    paddingHorizontal: 22,
    shadowColor: "#185a9d",
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 9 },
    elevation: 11,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1.3,
  },
  subtitle: {
    fontSize: 17,
    color: "#43cea2",
    fontWeight: "600",
    marginBottom: 26,
    textAlign: "center",
    letterSpacing: 0.7,
  },
  rolesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "100%",
  },
  roleCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 17,
    marginHorizontal: 8,
    paddingVertical: 25,
    paddingHorizontal: 8,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#43cea2",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 4 },
    minWidth: 120,
  },
  roleIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },
  roleName: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#185a9d",
    marginTop: 6,
    marginBottom: 2,
  },
  roleDesc: {
    fontSize: 13,
    color: "#888",
    marginBottom: 0,
    textAlign: "center",
  },
  loginLink: {
    marginTop: 18,
  },
  loginLinkText: {
    color: "#185a9d",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  guestBtn: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#e6f7f4",
    borderRadius: 11,
    paddingHorizontal: 18,
    paddingVertical: 9,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  guestText: {
    color: "#185a9d",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 15,
  },
});
