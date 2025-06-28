import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useUser } from "../components/UserContext";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const { user, loading } = useUser();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.9);

  useEffect(() => {
    // Static animation effects
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigation logic
    if (!loading) {
      const timer = setTimeout(() => {
        if (user) {
          navigation.replace("MainApp");
        } else {
          navigation.replace("Onboarding");
        }
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [loading, user, navigation]);

  return (
    <LinearGradient
      colors={["#0a192f", "#112240", "#1a365d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerBox}>
          {/* Floating particles (static animation) */}
          <View style={styles.particle1} />
          <View style={styles.particle2} />
          <View style={styles.particle3} />

          <Animated.View
            style={[
              styles.logoContainer,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.gradientCircle}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={require("../assets/logo12.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </LinearGradient>

            {/* Subtle ring effect */}
            <View style={styles.ring} />
          </Animated.View>

          <Animated.Text
            style={[
              styles.title,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            NexTrip
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Your Journey, Elevated
          </Animated.Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.powered}>POWERED BY INNOVATIVE TECHNOLOGY</Text>
          <View style={styles.divider} />
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} NEXTRIP INC.
          </Text>
        </View>
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
    overflow: "hidden",
  },
  safeArea: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
  },
  centerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  particle1: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#43cea255",
    top: "25%",
    left: "20%",
  },
  particle2: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#185a9d55",
    top: "40%",
    right: "25%",
  },
  particle3: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff33",
    bottom: "30%",
    left: "30%",
  },
  logoContainer: {
    position: "relative",
    marginBottom: 30,
  },
  gradientCircle: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#43cea2",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 2,
  },
  ring: {
    position: "absolute",
    width: width * 0.34,
    height: width * 0.34,
    borderRadius: width * 0.17,
    borderWidth: 2,
    borderColor: "#43cea255",
    zIndex: 1,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.18,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 1.5,
    marginTop: 15,
    textShadowColor: "rgba(67, 206, 162, 0.7)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    marginTop: 8,
    letterSpacing: 2,
    fontWeight: "300",
  },
  footer: {
    paddingBottom: 30,
    alignItems: "center",
  },
  powered: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    width: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
  },
  copyright: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.3)",
    letterSpacing: 1,
    fontWeight: "500",
  },
});
