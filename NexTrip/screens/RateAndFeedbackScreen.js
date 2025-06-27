import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// If no driver/ride is passed, fallback
const fallbackDriver = {
  name: "Mehedi Hasan",
  photo: require("../assets/driver-avatar.png"),
  car: "Toyota Prius (White)",
  rating: 4.8,
};

export default function RateAndFeedbackScreen({ navigation, route }) {
  // Try to get driver from ride, or fallback
  const ride = route?.params?.ride || {};
  const driver = ride.driver || fallbackDriver;

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const renderStars = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
        <MaterialIcons
          name={rating > i ? "star" : "star-border"}
          size={36}
          color={rating > i ? "#FFD600" : "#ccc"}
          style={{ marginHorizontal: 2 }}
        />
      </TouchableOpacity>
    ));

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Oops!", "Please select a rating.");
      return;
    }
    Keyboard.dismiss();

    // Optionally, update your ride history with this feedback/rating here

    Alert.alert("Thank you!", "Your feedback has been submitted.");

    // Go to TripReceipt if you want, or RideHistory, or Home
    navigation.replace("TripReceipt", { ride: { ...ride, feedback, rating } });
    // Or: navigation.replace("Home");
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Rate Your Trip</Text>
          <Image source={driver.photo} style={styles.avatar} />
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverCar}>{driver.car}</Text>
          <View style={styles.starsRow}>{renderStars()}</View>
          <TextInput
            style={styles.input}
            placeholder="Write feedback (optional)..."
            placeholderTextColor="#aaa"
            value={feedback}
            onChangeText={setFeedback}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity
            style={[styles.submitBtn, { opacity: rating === 0 ? 0.5 : 1 }]}
            onPress={handleSubmit}
            disabled={rating === 0}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.btnGradient}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.submitText}>Submit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingTop: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 1,
    marginBottom: 20,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: "#43cea2",
    marginBottom: 10,
  },
  driverName: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 19,
    marginTop: 3,
  },
  driverCar: {
    color: "#43cea2",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 10,
  },
  input: {
    width: width > 400 ? 320 : "96%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 13,
    fontSize: 15,
    color: "#222",
    minHeight: 60,
    marginBottom: 23,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    elevation: 4,
  },
  submitBtn: {
    width: width > 400 ? 210 : "85%",
    borderRadius: 15,
    overflow: "hidden",
  },
  btnGradient: {
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 15,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.8,
  },
});
