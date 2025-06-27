import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  PanResponder,
  AccessibilityInfo,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const slides = [
  {
    key: "one",
    title: "Welcome to NexTrip",
    description:
      "A secure, blockchain-powered ride-sharing app for your city. Book rides, pay seamlessly, and trust every trip.",
    image: require("../assets/onboard-1.png"),
    icon: <MaterialIcons name="security" size={38} color="#43cea2" />,
  },
  {
    key: "two",
    title: "Blockchain Transparency",
    description:
      "All rides are recorded on a tamper-proof ledger. Enjoy real privacy, data control, and true fairness.",
    image: require("../assets/onboard-2.png"),
    icon: <FontAwesome5 name="lock" size={36} color="#185a9d" />,
  },
  {
    key: "three",
    title: "Seamless Payment",
    description:
      "Pay with cards, crypto, or NexTrip tokens. Fast, secure, and easy—every ride, every time.",
    image: require("../assets/onboard-3.png"),
    icon: <FontAwesome5 name="money-bill-wave" size={36} color="#43cea2" />,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [slide, setSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    navigation.replace("Login");
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

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container} {...panResponder.panHandlers}>
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
          <View style={styles.imageWrap}>
            {slides[slide].image ? (
              <Image
                source={slides[slide].image}
                style={styles.image}
                resizeMode="contain"
                accessibilityIgnoresInvertColors={true}
                accessible={true}
                accessibilityLabel={slides[slide].title}
              />
            ) : (
              slides[slide].icon
            )}
          </View>

          <Text style={styles.title} accessibilityRole="header">
            {slides[slide].title}
          </Text>
          <Text style={styles.desc}>{slides[slide].description}</Text>

          <View style={styles.dotsRow} accessibilityRole="tablist" accessible>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === slide && styles.activeDot]}
                accessibilityRole="tab"
                accessibilityState={{ selected: i === slide }}
                accessibilityLabel={`Slide ${i + 1} of ${slides.length}`}
              />
            ))}
          </View>

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
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        {/* DEV QUICK LINKS: Visible for testing fast navigation */}
        {/* <View style={{ marginTop: 16, alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => navigation.replace("Register")}
            style={styles.devBtn}
          >
            <Text style={styles.devBtnText}>Go to Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("SelectRole")}
            style={styles.devBtn}
          >
            <Text style={styles.devBtnText}>Go to Select Role</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.replace("Home")}
            style={styles.devBtn}
          >
            <Text style={styles.devBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  skipBtn: {
    position: "absolute",
    top: 50,
    right: 22,
    paddingVertical: 5,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  skipText: {
    color: "#e7f9f4",
    fontSize: 16,
    fontWeight: "600",
  },
  contentWrap: {
    alignItems: "center",
  },
  imageWrap: {
    backgroundColor: "#fff",
    borderRadius: 90,
    padding: 26,
    marginBottom: 30,
    marginTop: 25,
    elevation: 8,
    shadowColor: "#185a9d",
    shadowOpacity: 0.13,
  },
  image: {
    width: width > 300 ? 170 : 130,
    height: width > 400 ? 170 : 130,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 12,
    textAlign: "center",
  },
  desc: {
    color: "#e7f9f4",
    fontSize: 15.2,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 23,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 7,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: "#d2efe9",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#43cea2",
    borderWidth: 2,
    borderColor: "#185a9d",
  },
  nextBtn: {
    width: width > 300 ? 220 : width * 0.9,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  btnGradient: {
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 16, // taller button
  },

  nextText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20, // bigger font for better legibility
    letterSpacing: 1,
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
