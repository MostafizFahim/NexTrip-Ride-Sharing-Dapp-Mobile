import React, { useState, useEffect, useRef } from "react";
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
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { useUser } from "../components/UserContext";
import useRideHistory from "../components/hooks/useRideHistory";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  useIsFocused,
  useRoute,
  CommonActions,
} from "@react-navigation/native";

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
  const [pickupCoord, setPickupCoord] = useState(null);
  const [dropoffCoord, setDropoffCoord] = useState(null);
  const [rideType, setRideType] = useState("Bike");
  const [submitting, setSubmitting] = useState(false);

  const isFocused = useIsFocused();
  const route = useRoute();
  const routeParamsRef = useRef(route.params);

  // Handle location updates from MapFullScreen
  useEffect(() => {
    if (isFocused && route.params && route.params !== routeParamsRef.current) {
      const { locationType, address, coordinates } = route.params;

      if (locationType === "pickup") {
        setPickup(address);
        setPickupCoord(coordinates);
      } else if (locationType === "dropoff") {
        setDropoff(address);
        setDropoffCoord(coordinates);
      }

      routeParamsRef.current = route.params;

      // Clear params without triggering update
      navigation.dispatch(
        CommonActions.setParams({
          locationType: undefined,
          address: undefined,
          coordinates: undefined,
        })
      );
    }
  }, [isFocused, route.params, navigation]);

  const swapLocations = () => {
    const tempAddress = pickup;
    const tempCoord = pickupCoord;

    setPickup(dropoff);
    setPickupCoord(dropoffCoord);
    setDropoff(tempAddress);
    setDropoffCoord(tempCoord);
  };

  const clearPickup = () => {
    setPickup("");
    setPickupCoord(null);
  };

  const clearDropoff = () => {
    setDropoff("");
    setDropoffCoord(null);
  };

  const getCoordinates = async (address, type) => {
    if (type === "pickup" && pickupCoord) return pickupCoord;
    if (type === "dropoff" && dropoffCoord) return dropoffCoord;

    try {
      const locations = await Location.geocodeAsync(address);
      return locations[0]
        ? {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          }
        : null;
    } catch (e) {
      console.warn("Geocoding failed:", e);
      return null;
    }
  };

  const handleBook = async () => {
    if (!pickup.trim() || !dropoff.trim()) {
      Alert.alert(
        "Missing Info",
        "Please enter both pickup and drop-off locations."
      );
      return;
    }

    setSubmitting(true);
    const pickupCoords = await getCoordinates(pickup, "pickup");
    const dropoffCoords = await getCoordinates(dropoff, "dropoff");

    if (!pickupCoords || !dropoffCoords) {
      Alert.alert(
        "Error",
        "Failed to find location coordinates. Please check your addresses."
      );
      setSubmitting(false);
      return;
    }

    const baseFare = rideType === "Bike" ? 60 : rideType === "Car" ? 140 : 80;
    const fare = baseFare + Math.floor(Math.random() * 100);

    const ride = {
      id: Date.now().toString(),
      pickup,
      dropoff,
      pickupCoord: pickupCoords,
      dropoffCoord: dropoffCoords,
      rideType,
      status: "Searching",
      fare,
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString(),
      user: user?.name || "You",
    };

    try {
      await addRide(ride);
      navigation.navigate("SearchingForDriver", { ride });
      setPickup("");
      setDropoff("");
      setPickupCoord(null);
      setDropoffCoord(null);
    } catch (e) {
      Alert.alert("Error", "Failed to book ride. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToMap = (locationType) => {
    navigation.navigate("MapFullScreen", {
      locationType,
      returnTo: "BookRide",
      initialLocation: locationType === "pickup" ? pickupCoord : dropoffCoord,
    });
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
                placeholderTextColor="#aaa"
                value={pickup}
                onChangeText={setPickup}
                editable={!submitting}
              />
              {!!pickup && (
                <TouchableOpacity onPress={clearPickup} style={styles.clearBtn}>
                  <AntDesign name="closecircle" size={18} color="#aaa" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.mapBtn}
                onPress={() => navigateToMap("pickup")}
              >
                <Ionicons name="map" size={18} color="#43cea2" />
                <Text style={styles.mapBtnText}>Map</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.swapBtn} onPress={swapLocations}>
              <Ionicons name="swap-vertical" size={26} color="#185a9d" />
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
                placeholderTextColor="#aaa"
                value={dropoff}
                onChangeText={setDropoff}
                editable={!submitting}
              />
              {!!dropoff && (
                <TouchableOpacity
                  onPress={clearDropoff}
                  style={styles.clearBtn}
                >
                  <AntDesign name="closecircle" size={18} color="#aaa" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.mapBtn}
                onPress={() => navigateToMap("dropoff")}
              >
                <Ionicons name="map" size={18} color="#185a9d" />
                <Text style={[styles.mapBtnText, { color: "#185a9d" }]}>
                  Map
                </Text>
              </TouchableOpacity>
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
            style={[
              styles.bookBtn,
              (!pickup || !dropoff || submitting || loading) && {
                opacity: 0.6,
              },
            ]}
            onPress={handleBook}
            disabled={!pickup || !dropoff || submitting || loading}
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
          <TouchableOpacity
            style={{
              backgroundColor: "#185a9d",
              borderRadius: 12,
              paddingVertical: 12,
              paddingHorizontal: 32,
              marginTop: 24,
              alignSelf: "center",
              elevation: 3,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Go to Home
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 28,
    letterSpacing: 0.8,
  },
  inputGroup: {
    width: width > 400 ? 340 : "93%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 36,
    shadowColor: "#185a9d",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    backgroundColor: "#f7f9fb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
    paddingVertical: Platform.OS === "ios" ? 10 : 7,
  },
  clearBtn: {
    marginLeft: 6,
  },
  swapBtn: {
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#f6f6f6",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
    width: 40,
  },
  mapBtn: {
    marginLeft: 12,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#e7f9f4",
    flexDirection: "row",
    alignItems: "center",
  },
  mapBtnText: {
    color: "#43cea2",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 16,
    alignSelf: "flex-start",
    marginLeft: width > 400 ? 36 : 24,
  },
  rideTypeRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    width: "80%",
  },
  rideTypeBtn: {
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: "#f6f6f6",
  },
  rideTypeBtnSelected: {
    backgroundColor: "#e7f9f4",
    borderWidth: 2,
    borderColor: "#43cea2",
  },
  rideTypeText: {
    color: "#666",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 6,
  },
  bookBtn: {
    width: width > 400 ? 280 : "90%",
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 10,
  },
  bookGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
  bookText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 19,
    marginLeft: 9,
    letterSpacing: 1.2,
  },
});
