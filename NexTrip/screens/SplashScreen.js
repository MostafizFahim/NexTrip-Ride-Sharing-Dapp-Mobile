import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../components/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          switch (user.role) {
            case "admin":
              navigation.replace("Admin");
              break;
            case "driver":
              navigation.replace("Driver");
              break;
            case "passenger":
              navigation.replace("PassengerDashboard");
              break;
            default:
              navigation.replace("SelectRole");
          }
        } else {
          navigation.replace("Onboarding");
        }
      }, 1800);

      return () => clearTimeout(timer);
    }
  }, [loading, user, navigation]);

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View
          style={styles.centerBox}
          accessible
          accessibilityLabel="App logo and loading indicator"
        >
          <Image
            source={require("../assets/logo12.png")}
            style={styles.logo}
            resizeMode="contain"
            accessibilityLabel="NexTrip app logo"
          />
          <Text style={styles.title}>NexTrip</Text>
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 20 }}
            accessibilityLabel="Loading indicator"
          />
        </View>
        <Text style={styles.powered}>
          Powered by Your Team © {new Date().getFullYear()}
        </Text>
      </SafeAreaView>
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
  safeArea: {
    flex: 1,
    width: "100%",
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
