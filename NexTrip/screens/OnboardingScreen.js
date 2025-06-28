import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  AccessibilityInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    key: "one",
    title: "Welcome to NexTrip",
    description:
      "A secure, blockchain-powered ride-sharing app for your city. Book rides, pay seamlessly, and trust every trip.",
    lottie: require("../assets/onboard-1-lottie.json"),
    icon: <Ionicons name="shield-checkmark" size={50} color="#43cea2" />,
    gradient: ["#43cea2", "#185a9d"],
  },
  {
    key: "two",
    title: "Blockchain Transparency",
    description:
      "All rides are recorded on a tamper-proof ledger. Enjoy real privacy, data control, and true fairness.",
    lottie: require("../assets/onboard-2-lottie.json"),
    icon: <Ionicons name="lock-closed" size={50} color="#185a9d" />,
    gradient: ["#185a9d", "#0a192f"],
  },
  {
    key: "three",
    title: "Seamless Payment",
    description:
      "Pay with cards, crypto, or NexTrip tokens. Fast, secure, and easy—every ride, every time.",
    lottie: require("../assets/onboard-3-lottie.json"),
    icon: <Ionicons name="wallet" size={50} color="#43cea2" />,
    gradient: ["#ff9966", "#ff5e62"],
  },
];

export default function OnboardingScreen({ navigation }) {
  const [slide, setSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Progress animation
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (slide + 1) / slides.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [slide]);

  // Fade animation helper
  const fadeToSlide = (nextSlide) => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSlide(nextSlide);
    });
  };

  // Swipe gestures with PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -50 && slide < slides.length - 1) {
          fadeToSlide(slide + 1);
        } else if (gestureState.dx > 50 && slide > 0) {
          fadeToSlide(slide - 1);
        }
      },
    })
  ).current;

  // Save onboarding done flag
  const markDone = async () => {
    try {
      await AsyncStorage.setItem("@onboarding_done", "true");
    } catch {
      // fail silently
    }
  };

  // Complete onboarding and navigate as per app flow
  const completeOnboarding = () => {
    markDone();
    navigation.replace("Login"); // Or "Login"
  };

  // Handle next button press
  const handleNext = () => {
    if (slide < slides.length - 1) {
      fadeToSlide(slide + 1);
    } else {
      completeOnboarding();
    }
  };

  // Handle skip button press
  const handleSkip = completeOnboarding;

  // Accessibility: Announce slide changes
  useEffect(() => {
    const slideTitle = slides[slide].title;
    AccessibilityInfo.announceForAccessibility(
      `Slide ${slide + 1}: ${slideTitle}`
    );
  }, [slide]);

  // Progress bar width interpolation
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <LinearGradient
      colors={slides[slide].gradient}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[styles.progressBar, { width: progressWidth }]}
          />
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Skip onboarding"
          accessibilityHint="Skips the onboarding process and goes to login"
          style={styles.skipBtn}
          onPress={handleSkip}
        >
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Animated.View style={[styles.contentWrap, { opacity: fadeAnim }]}>
          {/* Floating Particles */}
          <View style={styles.particle1} />
          <View style={styles.particle2} />
          <View style={styles.particle3} />

          {/* Lottie Animation Container */}
          <View style={styles.imageContainer}>
            <Animated.View
              style={[
                styles.imageWrap,
                {
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
              <LinearGradient
                colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.05)"]}
                style={styles.imageBackground}
                start={[0, 0]}
                end={[1, 1]}
              >
                <LottieView
                  source={slides[slide].lottie}
                  autoPlay
                  loop
                  style={{ width: 160, height: 160 }}
                  accessibilityLabel={slides[slide].title}
                />
              </LinearGradient>
            </Animated.View>
            {/* Icon Floating Badge */}
            <View style={styles.iconBadge}>{slides[slide].icon}</View>
          </View>

          <Text style={styles.title} accessibilityRole="header">
            {slides[slide].title}
          </Text>

          <Text style={styles.desc}>{slides[slide].description}</Text>

          {/* Dots Indicator */}
          <View style={styles.dotsRow} accessibilityRole="tablist" accessible>
            {slides.map((_, i) => (
              <TouchableOpacity key={i} onPress={() => fadeToSlide(i)}>
                <View
                  style={[styles.dot, i === slide && styles.activeDot]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: i === slide }}
                  accessibilityLabel={`Slide ${i + 1} of ${slides.length}`}
                />
              </TouchableOpacity>
            ))}
          </View>

          {/* Next Button */}
          <TouchableOpacity
            accessible={true}
            accessibilityLabel={
              slide === slides.length - 1 ? "Get started" : "Next slide"
            }
            accessibilityHint={
              slide === slides.length - 1
                ? "Completes onboarding and opens login screen"
                : "Moves to the next slide"
            }
            style={styles.nextBtn}
            onPress={handleNext}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.btnGradient}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.nextText}>
                {slide === slides.length - 1 ? "Get Started" : "Next"}
              </Text>
              <Ionicons
                name="arrow-forward"
                size={24}
                color="#fff"
                style={styles.arrowIcon}
              />
            </LinearGradient>
          </TouchableOpacity>

          {/* Swipe Hint */}
          <Text style={styles.swipeHint}>Swipe left or right to navigate</Text>
        </Animated.View>
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
    paddingHorizontal: 22,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#fff",
  },
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
  },
  skipText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  contentWrap: {
    alignItems: "center",
    width: "100%",
  },
  imageContainer: {
    position: "relative",
    marginBottom: 40,
    marginTop: 20,
  },
  imageBackground: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  imageWrap: {
    backgroundColor: "transparent",
    borderRadius: 110,
    padding: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  iconBadge: {
    position: "absolute",
    bottom: -10,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 16,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  desc: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    paddingHorizontal: 30,
    fontWeight: "400",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25,
    marginTop: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 20,
    borderRadius: 10,
  },
  nextBtn: {
    width: width > 300 ? 260 : width * 0.9,
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  btnGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 18,
    flexDirection: "row",
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 0.5,
  },
  arrowIcon: {
    marginLeft: 10,
  },
  swipeHint: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginTop: 30,
    fontStyle: "italic",
  },
  particle1: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    top: "10%",
    left: "15%",
  },
  particle2: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    top: "20%",
    right: "20%",
  },
  particle3: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.15)",
    bottom: "15%",
    left: "25%",
  },
});
