import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../components/UserContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, loading: userLoading } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);

    // DEMO LOGIN: Accept only certain domains; replace with backend call later
    if (
      form.email.endsWith("@admin.com") ||
      form.email.endsWith("@driver.com") ||
      form.email.endsWith("@user.com")
    ) {
      const role = form.email.endsWith("@admin.com")
        ? "admin"
        : form.email.endsWith("@driver.com")
        ? "driver"
        : "passenger";

      try {
        await login({
          name: form.email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
          email: form.email,
          role,
          photo: null,
        });
        setLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      } catch (e) {
        setLoading(false);
        setError("Login failed. Please try again.");
      }
    } else {
      setLoading(false);
      setError("Invalid credentials. Try demo@user.com or demo@driver.com.");
    }
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.avoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>NexTrip Login</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          {/* Social Login Row */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("Google login coming soon!")}
            >
              <AntDesign name="google" size={24} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("Facebook login coming soon!")}
            >
              <FontAwesome name="facebook" size={24} color="#3b5998" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("X login coming soon!")}
            >
              <AntDesign name="twitter" size={24} color="#1da1f2" />
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>— OR —</Text>

          {/* Email Input */}
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

          {/* Password Input */}
          <View style={{ width: "100%" }}>
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
              onPress={() => setShowPassword((p) => !p)}
              style={styles.eyeIcon}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#888"
              />
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              styles.signInBtn,
              !(form.email && form.password) && { opacity: 0.7 },
            ]}
            onPress={handleLogin}
            disabled={!(form.email && form.password) || loading || userLoading}
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
                  message="Signing in..."
                  textStyle={{ color: "#fff", marginLeft: 6 }}
                />
              ) : (
                <Text style={styles.signInBtnText}>Sign In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>New to NexTrip?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SelectRole")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* DEV QUICK LINKS */}
          {/* <View style={{ marginTop: 16, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => navigation.replace("Home")}
              style={styles.devBtn}
            >
              <Text style={styles.devBtnText}>Go to Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace("PassengerDashboard")}
              style={styles.devBtn}
            >
              <Text style={styles.devBtnText}>Go to Passenger Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.replace("Driver")}
              style={styles.devBtn}
            >
              <Text style={styles.devBtnText}>Go to Driver Dashboard</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  avoiding: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: width > 400 ? 360 : "90%",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 32,
    paddingHorizontal: 22,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#222",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 5 },
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#185a9d",
    marginBottom: 3,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 22,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 7,
    elevation: Platform.OS === "android" ? 2 : 0,
  },
  orText: {
    color: "#888",
    marginBottom: 10,
    marginTop: 4,
    fontSize: 16,
    textAlign: "center",
    letterSpacing: 1,
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#222",
  },
  eyeIcon: {
    position: "absolute",
    right: 18,
    top: 14,
  },
  errorText: {
    color: "#c62828",
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  signInBtn: {
    width: "100%",
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradientBtn: {
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 12,
  },
  signInBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  signUpText: {
    color: "#444",
    fontSize: 15,
  },
  signUpLink: {
    marginLeft: 7,
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
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
