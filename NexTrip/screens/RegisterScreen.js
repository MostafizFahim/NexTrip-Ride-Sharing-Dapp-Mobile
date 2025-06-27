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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../components/UserContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { login, loading: userLoading } = useUser();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Passenger",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields!");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      await login({
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role.toLowerCase(),
        photo: null,
      });
      setLoading(false);
      navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    } catch (e) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
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

          {/* Role switch */}
          <View style={styles.roleSwitch}>
            {["Passenger", "Driver"].map((roleName) => (
              <TouchableOpacity
                key={roleName}
                style={[
                  styles.roleBtn,
                  form.role === roleName && styles.roleBtnActive,
                ]}
                onPress={() => setForm((f) => ({ ...f, role: roleName }))}
                disabled={loading || userLoading}
              >
                <Text
                  style={[
                    styles.roleBtnText,
                    form.role === roleName && styles.roleBtnTextActive,
                  ]}
                >
                  {roleName}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Inputs */}
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#888"
            value={form.name}
            onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
            editable={!loading && !userLoading}
          />
          <TextInput
            placeholder="Email"
            style={styles.input}
            placeholderTextColor="#888"
            value={form.email}
            onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading && !userLoading}
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
              editable={!loading && !userLoading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword((v) => !v)}
              activeOpacity={0.7}
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
              editable={!loading && !userLoading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword((v) => !v)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Sign Up button */}
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
              ) ||
              loading ||
              userLoading
            }
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.gradientBtn}
            >
              {loading || userLoading ? (
                <LoadingSpinner
                  visible
                  overlay={false}
                  color="#fff"
                  size={18}
                  message="Signing up..."
                  textStyle={{ color: "#fff", marginLeft: 6 }}
                />
              ) : (
                <Text style={styles.registerBtnText}>Sign Up</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign In link */}
          <View style={styles.signInRow}>
            <Text style={styles.signInText}>Already have an account?</Text>
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
  errorText: {
    color: "#c62828",
    marginBottom: 8,
    fontWeight: "600",
    textAlign: "center",
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
  signInText: {
    color: "#666",
    fontSize: 15,
  },
  signInLink: {
    marginLeft: 8,
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
  },
});
