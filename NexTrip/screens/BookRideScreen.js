import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";

import { useUser } from "../components/UserContext";
import useRideHistory from "../components/hooks/useRideHistory";
import LoadingSpinner from "../components/ui/LoadingSpinner";

const { width } = Dimensions.get("window");

const rideTypes = [
  { label: "Bike", icon: "motorbike" },
  { label: "Car", icon: "car" },
  { label: "CNG", icon: "bus" },
];

export default function BookRideScreen({ navigation }) {
  const { user } = useUser();
  const { add: addRide, loading } = useRideHistory();

  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("Bike");
  const [submitting, setSubmitting] = useState(false);

  const swapLocations = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handleBook = async () => {
    if (!pickup.trim() || !dropoff.trim()) {
      alert("Please enter both pickup and drop-off locations.");
      return;
    }
    setSubmitting(true);

    // Optionally calculate fare (add logic as needed)
    const baseFare = rideType === "Bike" ? 60 : rideType === "Car" ? 140 : 80;
    const randomExtra = Math.floor(Math.random() * 100);
    const fare = baseFare + randomExtra;

    // Create ride object
    const ride = {
      pickup,
      dropoff,
      rideType,
      status: "Searching", // or "Booked"
      fare,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString(),
      user: user?.name || "You",
    };

    // Save to local ride history
    await addRide(ride);

    setSubmitting(false);
    setPickup("");
    setDropoff("");
    setRideType("Bike");

    // Optionally navigate to a searching/progress screen
    navigation.navigate("SearchingForDriver", { ride });
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Book a Ride</Text>
          <View style={styles.inputGroup}>
            <View style={styles.inputRow}>
              <MaterialCommunityIcons
                name="map-marker"
                size={22}
                color="#43cea2"
              />
              <TextInput
                style={styles.input}
                placeholder="Pickup Location"
                placeholderTextColor="#888"
                value={pickup}
                onChangeText={setPickup}
                editable={!submitting}
              />
            </View>
            <TouchableOpacity style={styles.swapBtn} onPress={swapLocations}>
              <Ionicons name="swap-vertical" size={22} color="#185a9d" />
            </TouchableOpacity>
            <View style={styles.inputRow}>
              <MaterialCommunityIcons
                name="map-marker-check"
                size={22}
                color="#185a9d"
              />
              <TextInput
                style={styles.input}
                placeholder="Dropoff Location"
                placeholderTextColor="#888"
                value={dropoff}
                onChangeText={setDropoff}
                editable={!submitting}
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Select Ride Type</Text>
          <View style={styles.rideTypeRow}>
            {rideTypes.map((type) => (
              <TouchableOpacity
                key={type.label}
                style={[
                  styles.rideTypeBtn,
                  rideType === type.label && styles.rideTypeBtnSelected,
                ]}
                onPress={() => setRideType(type.label)}
                activeOpacity={0.8}
                disabled={submitting}
              >
                <MaterialCommunityIcons
                  name={type.icon}
                  size={30}
                  color={rideType === type.label ? "#43cea2" : "#888"}
                />
                <Text
                  style={[
                    styles.rideTypeText,
                    rideType === type.label && { color: "#43cea2" },
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={handleBook}
            disabled={submitting || loading}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.bookGradient}
            >
              {submitting ? (
                <LoadingSpinner
                  visible
                  message="Booking..."
                  overlay={false}
                  color="#fff"
                  size={22}
                  textStyle={{ color: "#fff", marginLeft: 6 }}
                />
              ) : (
                <>
                  <FontAwesome name="check-circle" size={22} color="#fff" />
                  <Text style={styles.bookText}>Book Ride</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 50,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 24,
    letterSpacing: 0.8,
  },
  inputGroup: {
    width: width > 400 ? 340 : "93%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    shadowColor: "#185a9d",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#f7f9fb",
    borderRadius: 11,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
    paddingVertical: 7,
  },
  swapBtn: {
    alignSelf: "center",
    marginVertical: 2,
    marginBottom: 6,
    backgroundColor: "#f6f6f6",
    padding: 7,
    borderRadius: 8,
    alignItems: "center",
    width: 36,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 13,
    marginTop: -10,
    alignSelf: "flex-start",
    marginLeft: width > 400 ? 42 : 24,
  },
  rideTypeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
    width: "80%",
  },
  rideTypeBtn: {
    alignItems: "center",
    marginHorizontal: 13,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: "#f6f6f6",
  },
  rideTypeBtnSelected: {
    backgroundColor: "#e7f9f4",
    borderWidth: 1,
    borderColor: "#43cea2",
  },
  rideTypeText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 5,
  },
  bookBtn: {
    width: width > 400 ? 280 : "90%",
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 10,
  },
  bookGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 14,
  },
  bookText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 9,
    letterSpacing: 1.1,
  },
});
