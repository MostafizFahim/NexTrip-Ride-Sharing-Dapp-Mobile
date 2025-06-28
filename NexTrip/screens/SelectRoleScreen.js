// screens/SelectRoleScreen.js
import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../components/UserContext";

const { width, height } = Dimensions.get("window");
const isSmallScreen = height < 700;

// Card size adjustments
const CARD_HEIGHT = isSmallScreen ? 145 : 170;
const CARD_LABEL_SIZE = isSmallScreen ? 17 : 19;
const CARD_DESC_SIZE = isSmallScreen ? 12 : 13.5;

const ROLES = [
  {
    key: "passenger",
    label: "Passenger",
    icon: "person",
    iconColor: "#43cea2",
    gradient: ["#43cea2", "#185a9d"],
    desc: "Book rides instantly. Seamless travel.",
  },
  {
    key: "driver",
    label: "Driver",
    icon: "car",
    iconColor: "#185a9d",
    gradient: ["#185a9d", "#43cea2"],
    desc: "Earn by driving. Flexible & reliable.",
  },
  {
    key: "admin",
    label: "Admin",
    icon: "shield",
    iconColor: "#ff6b6b",
    gradient: ["#ff6b6b", "#ffc371"],
    desc: "Manage platform & operations.",
  },
];

export default function SelectRoleScreen({ navigation, route }) {
  const { login } = useUser();
  const anims = useRef(ROLES.map(() => new Animated.Value(0))).current;
  const tapAnims = useRef(ROLES.map(() => new Animated.Value(1))).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  const fromRegister = route?.params?.fromRegister;

  useEffect(() => {
    Animated.timing(headerAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.stagger(
      120,
      anims.map((a) =>
        Animated.spring(a, {
          toValue: 1,
          useNativeDriver: true,
          speed: 1.8,
          bounciness: 12,
        })
      )
    ).start();
  }, []);

  const selectRole = (role, idx) => {
    Animated.sequence([
      Animated.timing(tapAnims[idx], {
        toValue: 0.96,
        duration: 70,
        useNativeDriver: true,
      }),
      Animated.timing(tapAnims[idx], {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (fromRegister) {
        navigation.navigate("Register", { role: role });
      } else {
        login({
          id: `temp-${Date.now()}`,
          name: "Guest User",
          email: "",
          role,
        });

        if (role === "passenger") {
          navigation.replace("Passenger");
        } else if (role === "driver") {
          navigation.replace("Driver");
        } else if (role === "admin") {
          navigation.replace("Admin");
        }
      }
    });
  };

  return (
    <LinearGradient
      colors={["#e6f7ff", "#c2e9fb", "#a1c4fd"]}
      style={styles.bg}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      {/* Background decorative elements */}
      <View style={styles.circle}></View>
      <View style={[styles.circle, styles.circle2]}></View>

      <SafeAreaView style={{ flex: 1, width: "100%" }}>
        <View style={styles.topContainer}>
          {/* Animated Floating Header */}
          <Animated.View
            style={[
              styles.floatingHeaderBox,
              {
                opacity: headerAnim,
                transform: [
                  {
                    translateY: headerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-60, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={[
                "rgba(255,255,255,0.5)",
                "rgba(67,206,162,0.2)",
                "rgba(24,90,157,0.2)",
              ]}
              style={styles.floatingHeader}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.title}>Choose Your Role</Text>
              <Text style={styles.subtitle}>
                {fromRegister
                  ? "Select your account type"
                  : "Select how you want to use NexTrip"}
              </Text>
            </LinearGradient>
          </Animated.View>

          <View style={styles.cardsWrapper}>
            {ROLES.map((role, idx) => (
              <TouchableWithoutFeedback
                key={role.key}
                onPress={() => selectRole(role.key, idx)}
              >
                <Animated.View
                  style={[
                    styles.card,
                    {
                      opacity: anims[idx],
                      transform: [
                        {
                          translateY: anims[idx].interpolate({
                            inputRange: [0, 1],
                            outputRange: [30, 0],
                          }),
                        },
                        { scale: tapAnims[idx] },
                        {
                          rotate: anims[idx].interpolate({
                            inputRange: [0, 1],
                            outputRange: ["-2deg", "0deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={role.gradient}
                    style={styles.cardGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <View style={styles.glossOverlay}></View>

                    <View style={styles.cardContent}>
                      <View
                        style={[
                          styles.iconCircle,
                          { backgroundColor: `${role.iconColor}22` },
                        ]}
                      >
                        <Ionicons
                          name={role.icon}
                          size={32}
                          color={role.iconColor}
                          style={styles.icon}
                        />
                      </View>
                      <Text
                        style={[
                          styles.cardLabel,
                          { fontSize: CARD_LABEL_SIZE },
                        ]}
                      >
                        {role.label}
                      </Text>
                      <Text
                        style={[styles.cardDesc, { fontSize: CARD_DESC_SIZE }]}
                      >
                        {role.desc}
                      </Text>

                      <View style={styles.selectIndicator}>
                        <Text style={styles.selectText}>
                          {fromRegister ? "SELECT" : "CONTINUE"}
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </Animated.View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        {fromRegister && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>Back to Registration</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
  },
  topContainer: {
    width: "100%",
    marginTop: 30, // as you requested
    alignItems: "center",
    justifyContent: "center",
  },
  floatingHeaderBox: {
    width: "100%",
    alignItems: "center",
    marginTop: isSmallScreen ? 10 : 16,
    marginBottom: isSmallScreen ? 10 : 16,
    zIndex: 10,
  },
  floatingHeader: {
    paddingHorizontal: 20,
    paddingVertical: isSmallScreen ? 13 : 16,
    borderRadius: 18,
    shadowColor: "#185a9d",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    width: width > 420 ? (isSmallScreen ? 265 : 320) : "87%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
  },
  title: {
    color: "#185a9d",
    fontSize: isSmallScreen ? 22 : 25,
    fontWeight: "900",
    letterSpacing: 0.7,
    marginBottom: 3,
    textAlign: "center",
  },
  subtitle: {
    color: "#43cea2",
    fontSize: isSmallScreen ? 13 : 15,
    fontWeight: "500",
    letterSpacing: 0.45,
    textAlign: "center",
  },
  cardsWrapper: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: isSmallScreen ? 12 : 18,
    marginBottom: isSmallScreen ? 12 : 20,
  },
  card: {
    width: isSmallScreen ? width * 0.82 : width > 420 ? 250 : width * 0.86,
    height: CARD_HEIGHT,
    marginVertical: 5,
    borderRadius: 22,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.19,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  cardGradient: {
    flex: 1,
    width: "100%",
    padding: 2,
    borderRadius: 22,
  },
  cardContent: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.38)",
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: isSmallScreen ? 11 : 16,
    borderWidth: 0.9,
    borderColor: "rgba(255,255,255,0.23)",
  },
  iconCircle: {
    width: isSmallScreen ? 48 : 53,
    height: isSmallScreen ? 48 : 53,
    borderRadius: 26,
    marginBottom: isSmallScreen ? 7 : 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.32)",
  },
  icon: {
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  cardLabel: {
    color: "#185a9d",
    fontWeight: "800",
    letterSpacing: 0.6,
    textAlign: "center",
    marginBottom: isSmallScreen ? 2 : 4,
  },
  cardDesc: {
    color: "#2c5364",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: isSmallScreen ? 14 : 17,
    marginBottom: isSmallScreen ? 7 : 10,
  },
  selectIndicator: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingVertical: isSmallScreen ? 4 : 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  selectText: {
    color: "#185a9d",
    fontWeight: "700",
    fontSize: isSmallScreen ? 11 : 12.5,
    letterSpacing: 0.8,
  },
  circle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(67,206,162,0.11)",
    top: -50,
    left: -35,
  },
  circle2: {
    top: undefined,
    bottom: -90,
    left: undefined,
    right: -45,
    backgroundColor: "rgba(24,90,157,0.11)",
  },
  glossOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "38%",
    backgroundColor: "rgba(255,255,255,0.17)",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  backButton: {
    alignSelf: "center",
    marginTop: isSmallScreen ? 12 : 18,
    marginBottom: isSmallScreen ? 13 : 22,
    backgroundColor: "rgba(255,255,255,0.84)",
    paddingVertical: 9,
    paddingHorizontal: 23,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#43cea2",
  },
  backButtonText: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: isSmallScreen ? 13 : 15,
  },
});
