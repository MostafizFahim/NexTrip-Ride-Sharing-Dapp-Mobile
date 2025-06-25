import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Navigate to Login or Home after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace("Profile"); // or "Home" if already logged in
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.centerBox}>
        <Image
          source={require("../assets/logo12.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>NexTrip</Text>
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{ marginTop: 20 }}
        />
      </View>
      <Text style={styles.powered}>
        Powered by Your Team © {new Date().getFullYear()}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  logo: {
    width: width * 0.23,
    height: width * 0.23,
    marginBottom: 18,
    borderRadius: 14,
    backgroundColor: "#fff",
    shadowColor: "#185a9d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 7,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: "#185a9d88",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  powered: {
    fontSize: 12,
    color: "#f8f8f8",
    position: "absolute",
    bottom: 34,
    alignSelf: "center",
    opacity: 0.8,
    letterSpacing: 1,
  },
});
