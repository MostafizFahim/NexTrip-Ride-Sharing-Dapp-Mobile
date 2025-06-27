import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function RegisterScreen({ navigation, route }) {
  const initialRole = route.params?.role || "Passenger";

  const [role, setRole] = useState(initialRole);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Save registration data locally (mock backend)
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      // Simple user object
      const userData = { name, email, role, password };

      // Save user data to AsyncStorage (key: "userData")
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      Alert.alert(
        "Success",
        `Registered as ${role}!`,
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate based on role
              if (role === "Passenger") {
                navigation.replace("PassengerDashboard");
              } else if (role === "Driver") {
                navigation.replace("DriverDashboard");
              } else {
                navigation.replace("Home");
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert("Error", "Failed to register user.");
    }
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.title}>Register as {role}</Text>

        {/* Role Selection */}
        <View style={styles.roleRow}>
          {["Passenger", "Driver"].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleBtn, role === r && styles.roleBtnSelected]}
              onPress={() => setRole(r)}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  role === r && styles.roleBtnTextSelected,
                ]}
              >
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Name */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="#b5c5c5"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoComplete="name"
          />
        </View>

        {/* Email */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#b5c5c5"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>

        {/* Password */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#b5c5c5"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            style={styles.btnGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Text style={styles.registerBtnText}>Register</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Link to Login */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>
            Already have an account?{" "}
            <Text style={{ color: "#43cea2", fontWeight: "bold" }}>Login</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 25,
    letterSpacing: 1,
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  roleBtn: {
    borderWidth: 1.7,
    borderColor: "#43cea2",
    paddingVertical: 9,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderRadius: 14,
  },
  roleBtnSelected: {
    backgroundColor: "#43cea2",
  },
  roleBtnText: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 15,
  },
  roleBtnTextSelected: {
    color: "#fff",
  },
  inputRow: {
    width: width > 400 ? 360 : "95%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 18,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 14,
    fontSize: 16,
    color: "#222",
  },
  registerBtn: {
    width: width > 400 ? 360 : "95%",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
  btnGradient: {
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 16,
  },
  registerBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 1,
  },
  loginLink: {
    marginTop: 22,
  },
  loginText: {
    color: "#fff",
    fontSize: 15,
  },
});
