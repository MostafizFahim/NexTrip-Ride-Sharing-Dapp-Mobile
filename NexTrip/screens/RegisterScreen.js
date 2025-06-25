import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Passenger",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill in all fields!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Registration logic goes here
    alert("Registration successful!");
    navigation.navigate("Login");
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.bg}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <View style={styles.iconHeader}>
            <MaterialCommunityIcons
              name="account-circle"
              size={60}
              color="#43cea2"
            />
          </View>
          <Text style={styles.title}>Create Account</Text>
          <View style={styles.roleSwitch}>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                form.role === "Passenger" && styles.roleBtnActive,
              ]}
              onPress={() => setForm((f) => ({ ...f, role: "Passenger" }))}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  form.role === "Passenger" && styles.roleBtnTextActive,
                ]}
              >
                Passenger
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                form.role === "Driver" && styles.roleBtnActive,
              ]}
              onPress={() => setForm((f) => ({ ...f, role: "Driver" }))}
            >
              <Text
                style={[
                  styles.roleBtnText,
                  form.role === "Driver" && styles.roleBtnTextActive,
                ]}
              >
                Driver
              </Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#888"
            value={form.email}
            onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={{ width: "100%", position: "relative" }}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#888"
              value={form.password}
              onChangeText={(text) =>
                setForm((f) => ({ ...f, password: text }))
              }
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((v) => !v)}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <View style={{ width: "100%", position: "relative" }}>
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              placeholderTextColor="#888"
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm((f) => ({ ...f, confirmPassword: text }))
              }
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword((v) => !v)}
            >
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              styles.registerBtn,
              !(
                form.name &&
                form.email &&
                form.password &&
                form.confirmPassword
              ) && { opacity: 0.7 },
            ]}
            onPress={handleRegister}
            disabled={
              !(
                form.name &&
                form.email &&
                form.password &&
                form.confirmPassword
              )
            }
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientBtn}
            >
              <Text style={styles.registerBtnText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.signInRow}>
            <Text style={{ color: "#666", fontSize: 15 }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
  },
  card: {
    width: width > 400 ? 350 : "92%",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 34,
    paddingHorizontal: 22,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#185a9d",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 7 },
    marginTop: 30,
    marginBottom: 30,
  },
  iconHeader: {
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 8,
    letterSpacing: 1,
  },
  roleSwitch: {
    flexDirection: "row",
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    marginBottom: 18,
    marginTop: 4,
    overflow: "hidden",
  },
  roleBtn: {
    paddingVertical: 9,
    paddingHorizontal: 23,
  },
  roleBtnActive: {
    backgroundColor: "#43cea2",
  },
  roleBtnText: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.7,
  },
  roleBtnTextActive: {
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#222",
  },
  eyeIcon: {
    position: "absolute",
    right: 18,
    top: 14,
    zIndex: 1,
  },
  registerBtn: {
    width: "100%",
    marginTop: 6,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientBtn: {
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 12,
  },
  registerBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    justifyContent: "center",
  },
  signInLink: {
    marginLeft: 8,
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
  },
});
