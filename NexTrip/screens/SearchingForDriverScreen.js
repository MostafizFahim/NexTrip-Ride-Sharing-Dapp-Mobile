import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  AccessibilityInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const DRIVER_SEARCH_DELAY = 3200; // ms

export default function SearchingForDriverScreen({ navigation, route }) {
  const ride = route?.params?.ride;
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.18,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();

    AccessibilityInfo.announceForAccessibility("Finding you a driver");

    const timer = setTimeout(() => {
      navigation.replace("RideProgress", { ride }); // <-- pass ride forward!
    }, DRIVER_SEARCH_DELAY);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container}>
        <Animated.View
          style={[styles.pulseWrapper, { transform: [{ scale: pulse }] }]}
          accessible
          accessibilityRole="image"
          accessibilityLabel="Car icon pulsing to indicate searching for driver"
        >
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons
              name="car-hatchback"
              size={46}
              color="#fff"
            />
          </View>
        </Animated.View>
        <Text
          style={styles.title}
          accessibilityRole="header"
          accessibilityLevel={1}
        >
          Finding you a driver...
        </Text>
        <ActivityIndicator
          size="large"
          color="#43cea2"
          style={{ marginTop: 20 }}
          accessibilityLabel="Loading indicator"
          accessibilityLiveRegion="polite"
        />
        <Text style={styles.text} accessibilityLiveRegion="polite">
          Please wait while we match you with the nearest driver.
        </Text>

        <TouchableOpacity
          style={styles.cancelBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Cancel driver search"
        >
          <Text style={styles.cancelBtnText}>Cancel Search</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingTop: 70,
  },
  pulseWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 38,
  },
  iconCircle: {
    backgroundColor: "#43cea2",
    width: width > 400 ? 105 : 88,
    height: width > 400 ? 105 : 88,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#185a9d",
    shadowOpacity: 0.23,
    shadowOffset: { width: 0, height: 3 },
    elevation: 7,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    letterSpacing: 1,
  },
  text: {
    fontSize: 15,
    color: "#f6f6f6",
    textAlign: "center",
    marginTop: 24,
    opacity: 0.85,
  },
  cancelBtn: {
    marginTop: 30,
    backgroundColor: "#b71c1c",
    paddingVertical: 12,
    paddingHorizontal: 38,
    borderRadius: 25,
    elevation: 3,
  },
  cancelBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 1,
  },
});
