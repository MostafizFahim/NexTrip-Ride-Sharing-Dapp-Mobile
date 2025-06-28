import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Animated,
  Easing,
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const isSmallScreen = height < 700;

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login, loading: userLoading } = useUser();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  // Animation values
  const cardAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const socialAnim = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: 1,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.stagger(100, [
        Animated.spring(inputAnim, {
          toValue: 1,
          friction: 10,
          tension: 60,
          useNativeDriver: true,
        }),
        Animated.spring(socialAnim, {
          toValue: 1,
          friction: 10,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  useEffect(() => {
    // Error animation
    if (error) {
      Animated.sequence([
        Animated.timing(errorAnim, {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(errorAnim, {
          toValue: 0,
          duration: 3000,
          delay: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => setError(""));
    }
  }, [error]);

  // ----------- LOGIN LOGIC -----------
  const handleLogin = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Please enter email and password");
      return;
    }
    setLoading(true);

    try {
      // 1. Check for registered users in AsyncStorage
      const usersRaw = await AsyncStorage.getItem("registeredUsers");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      // 2. Try to find user by email
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === form.email.trim().toLowerCase() &&
          u.password === form.password
      );

      if (user) {
        // Found registered user
        await login({
          ...user,
          email: user.email.toLowerCase(),
        });
        setLoading(false);

        // Navigate based on role
        if (user.role === "passenger" || user.role === "Passenger") {
          navigation.reset({ index: 0, routes: [{ name: "Passenger" }] });
        } else if (user.role === "driver" || user.role === "Driver") {
          navigation.reset({ index: 0, routes: [{ name: "Driver" }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        }
        return;
      }

      // 3. Fallback: allow DEMO LOGINS for admin/driver domains
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
        await login({
          name: form.email.split("@")[0].replace(/^\w/, (c) => c.toUpperCase()),
          email: form.email,
          role,
          photo: null,
        });
        setLoading(false);
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        return;
      }

      setLoading(false);
      setError(
        "Invalid credentials. Use demo@user.com, demo@driver.com or sign up first."
      );
    } catch (e) {
      setLoading(false);
      setError("Login failed. Please try again.");
    }
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  return (
    <LinearGradient
      colors={["#e6f7ff", "#c2e9fb", "#a1c4fd"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      {/* Decorative Elements */}
      <View style={styles.circle}></View>
      <View style={[styles.circle, styles.circle2]}></View>

      <KeyboardAvoidingView
        style={styles.avoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Animated.View
          style={[
            styles.card,
            {
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          {/* Email Input */}
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: inputAnim,
                transform: [
                  {
                    translateX: inputAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused.email && styles.iconContainerFocused,
              ]}
            >
              <AntDesign
                name="user"
                size={20}
                color={isFocused.email ? "#43cea2" : "#777"}
              />
            </View>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#888"
              style={[styles.input, isFocused.email && styles.inputFocused]}
              value={form.email}
              onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading && !userLoading}
              onFocus={() => handleFocus("email")}
              onBlur={() => handleBlur("email")}
            />
          </Animated.View>

          {/* Password Input */}
          <Animated.View
            style={[
              styles.inputContainer,
              {
                opacity: inputAnim,
                transform: [
                  {
                    translateX: inputAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused.password && styles.iconContainerFocused,
              ]}
            >
              <AntDesign
                name="lock"
                size={20}
                color={isFocused.password ? "#43cea2" : "#777"}
              />
            </View>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              style={[styles.input, isFocused.password && styles.inputFocused]}
              value={form.password}
              onChangeText={(text) =>
                setForm((f) => ({ ...f, password: text }))
              }
              secureTextEntry={!showPassword}
              editable={!loading && !userLoading}
              onFocus={() => handleFocus("password")}
              onBlur={() => handleBlur("password")}
            />
            <TouchableOpacity
              onPress={() => setShowPassword((p) => !p)}
              style={styles.eyeIcon}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isFocused.password ? "#43cea2" : "#777"}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Error Message */}
          <Animated.View
            style={[
              styles.errorContainer,
              {
                opacity: errorAnim,
                transform: [
                  {
                    scale: errorAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </Animated.View>

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
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientBtn}
            >
              {loading || userLoading ? (
                <LoadingSpinner
                  visible
                  overlay={false}
                  color="#fff"
                  size={18}
                  message="Signing in..."
                  textStyle={{ color: "#fff", marginLeft: 10, fontSize: 16 }}
                />
              ) : (
                <Text style={styles.signInBtnText}>Sign In</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine}></View>
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine}></View>
          </View>

          {/* Social Login Row */}
          <Animated.View
            style={[
              styles.socialRow,
              {
                opacity: socialAnim,
                transform: [
                  {
                    translateY: socialAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [30, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("Google login coming soon!")}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F5F5F5"]}
                style={styles.socialBtnInner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <AntDesign name="google" size={24} color="#EA4335" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("Facebook login coming soon!")}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F5F5F5"]}
                style={styles.socialBtnInner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <FontAwesome name="facebook" size={24} color="#3b5998" />
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={() => alert("X login coming soon!")}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F5F5F5"]}
                style={styles.socialBtnInner}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <AntDesign name="twitter" size={24} color="#1da1f2" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>

          {/* Sign Up Link */}
          <View style={styles.signUpRow}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
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
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  circle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "rgba(67,206,162,0.1)",
    top: -100,
    left: -60,
  },
  circle2: {
    top: undefined,
    bottom: -140,
    left: undefined,
    right: -60,
    backgroundColor: "rgba(24,90,157,0.1)",
  },
  card: {
    width: width > 400 ? 360 : "90%",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingVertical: 35, // Reduced from 40
    paddingHorizontal: 30,
    alignItems: "center",
    elevation: 12,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#185a9d",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 30,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  iconContainerFocused: {
    backgroundColor: "#f0f9ff",
    borderColor: "#43cea2",
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingLeft: 60,
    paddingRight: 50,
    fontSize: 16,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    color: "#333",
  },
  inputFocused: {
    borderColor: "#43cea2",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(67, 206, 162, 0.3)",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    zIndex: 10,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: -10,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 14,
  },
  errorContainer: {
    width: "100%",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffebee",
    borderRadius: 12,
  },
  errorText: {
    color: "#c62828",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 14,
  },
  signInBtn: {
    width: "100%",
    marginTop: 10,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "rgba(24, 90, 157, 0.3)",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  gradientBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    flexDirection: "row",
  },
  signInBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  dividerText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
  },
  socialBtn: {
    width: 60,
    height: 60,
    borderRadius: 20,
    overflow: "hidden",
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  socialBtnInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  signUpText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
  signUpLink: {
    marginLeft: 8,
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 16,
  },
});
