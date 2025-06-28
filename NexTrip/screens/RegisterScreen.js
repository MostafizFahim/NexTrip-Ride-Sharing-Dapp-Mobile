import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../components/UserContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const isSmallScreen = height < 700;

export default function RegisterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { login, loading: userLoading } = useUser();

  // Animation values
  const cardAnim = useRef(new Animated.Value(0)).current;
  const inputAnim = useRef(new Animated.Value(0)).current;
  const errorAnim = useRef(new Animated.Value(0)).current;

  // Get initial role from params (if any)
  const initialRole = route.params?.role || "Passenger";
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: initialRole,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Animations
  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.spring(cardAnim, {
        toValue: 1,
        friction: 8,
        tension: 60,
        useNativeDriver: true,
      }),
      Animated.stagger(70, [
        Animated.spring(inputAnim, {
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

  // Update role if changed from SelectRoleScreen
  useEffect(() => {
    if (route.params?.role && route.params.role !== form.role) {
      setForm((f) => ({ ...f, role: route.params.role }));
    }
  }, [route.params?.role]);

  // --- Register logic ---
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
    // Email validation
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("Invalid email format!");
      return;
    }

    setLoading(true);

    try {
      // 1. Get the list of registered users
      const usersRaw = await AsyncStorage.getItem("registeredUsers");
      const users = usersRaw ? JSON.parse(usersRaw) : [];

      // 2. Check for duplicate email (case-insensitive)
      const alreadyExists = users.some(
        (u) => u.email.trim().toLowerCase() === form.email.trim().toLowerCase()
      );
      if (alreadyExists) {
        setLoading(false);
        setError("An account already exists with this email.");
        return;
      }

      // 3. Append new user
      const newUser = {
        id: `user-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role.toLowerCase(),
        photo: null,
      };
      users.push(newUser);

      // 4. Save back to AsyncStorage
      await AsyncStorage.setItem("registeredUsers", JSON.stringify(users));

      // 5. Log in the new user (but do NOT save password in context)
      await login({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        photo: null,
      });

      setLoading(false);

      // 6. Navigate based on role
      if (newUser.role === "passenger") {
        navigation.reset({ index: 0, routes: [{ name: "Passenger" }] });
      } else if (newUser.role === "driver") {
        navigation.reset({ index: 0, routes: [{ name: "Driver" }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
      }
    } catch (e) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  const handleFocus = (field) => {
    setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field) => {
    setIsFocused({ ...isFocused, [field]: false });
  };

  const navigateToRoleSelection = () => {
    navigation.navigate("SelectRole", { fromRegister: true });
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
          <View style={styles.iconHeader}>
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.iconCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <MaterialCommunityIcons
                name="account-circle"
                size={40}
                color="#fff"
              />
            </LinearGradient>
          </View>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join NexTrip as</Text>

          {/* Role Selection */}
          <TouchableOpacity
            style={styles.roleSelector}
            onPress={navigateToRoleSelection}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.roleSelectorInner}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.roleText}>{form.role}</Text>
              <AntDesign name="right" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Name Input */}
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
                isFocused.name && styles.iconContainerFocused,
              ]}
            >
              <AntDesign
                name="user"
                size={20}
                color={isFocused.name ? "#43cea2" : "#777"}
              />
            </View>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#888"
              style={[styles.input, isFocused.name && styles.inputFocused]}
              value={form.name}
              onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
              editable={!loading && !userLoading}
              onFocus={() => handleFocus("name")}
              onBlur={() => handleBlur("name")}
            />
          </Animated.View>

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
                isFocused.email && styles.iconContainerFocused,
              ]}
            >
              <AntDesign
                name="mail"
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
              style={styles.eyeIcon}
              onPress={() => setShowPassword((v) => !v)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isFocused.password ? "#43cea2" : "#777"}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* Confirm Password Input */}
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
                isFocused.confirmPassword && styles.iconContainerFocused,
              ]}
            >
              <AntDesign
                name="lock"
                size={20}
                color={isFocused.confirmPassword ? "#43cea2" : "#777"}
              />
            </View>
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              style={[
                styles.input,
                isFocused.confirmPassword && styles.inputFocused,
              ]}
              value={form.confirmPassword}
              onChangeText={(text) =>
                setForm((f) => ({ ...f, confirmPassword: text }))
              }
              secureTextEntry={!showConfirmPassword}
              editable={!loading && !userLoading}
              onFocus={() => handleFocus("confirmPassword")}
              onBlur={() => handleBlur("confirmPassword")}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword((v) => !v)}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={isFocused.confirmPassword ? "#43cea2" : "#777"}
              />
            </TouchableOpacity>
          </Animated.View>

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
                  message="Signing up..."
                  textStyle={{ color: "#fff", marginLeft: 10, fontSize: 16 }}
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
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

// ---- styles remain exactly as in your previous code ----
const styles = StyleSheet.create({
  // ... same as your code above ...
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
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.4)",
    top: -100,
    left: -80,
  },
  circle2: {
    top: undefined,
    bottom: -150,
    left: undefined,
    right: -80,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  card: {
    width: width > 400 ? 360 : "90%",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    paddingVertical: 35,
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
  iconHeader: {
    marginBottom: 15,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#185a9d",
    marginBottom: 5,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  roleSelector: {
    width: "100%",
    marginBottom: 20,
  },
  roleSelectorInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  roleText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
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
  registerBtn: {
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
  registerBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.8,
  },
  signInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "500",
  },
  signInLink: {
    marginLeft: 8,
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 16,
  },
});
