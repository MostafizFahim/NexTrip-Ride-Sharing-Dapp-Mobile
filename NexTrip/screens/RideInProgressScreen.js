import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import haversine from "haversine-distance";

const { width } = Dimensions.get("window");

const COLORS = {
  primaryLight: "#43cea2",
  primaryDark: "#185a9d",
  success: "#00c853",
  danger: "#b71c1c",
  white: "#fff",
  blackText: "#222",
  grayText: "#888",
  lightGray: "#eee",
};

// DEMO DRIVER DATA
const driver = {
  name: "Mehedi Hasan",
  car: "Toyota Prius (White)",
  number: "DHA-1234",
  rating: 4.8,
  phone: "+8801XXXXXXXXX",
};

// Generate route points for animation
const generateRoutePoints = (start, end, steps = 50) => {
  const latStep = (end.latitude - start.latitude) / steps;
  const lonStep = (end.longitude - start.longitude) / steps;
  let points = [];
  for (let i = 0; i <= steps; i++) {
    points.push({
      latitude: start.latitude + latStep * i,
      longitude: start.longitude + lonStep * i,
    });
  }
  return points;
};

export default function RideInProgressScreen({ navigation, route }) {
  // Get ride data from navigation params or use demo fallback
  const { ride: rideFromRoute } = route.params || {};

  const ride = rideFromRoute || {
    pickup: "Bashundhara R/A",
    dropoff: "Dhanmondi 27",
    pickupCoord: { latitude: 23.7808875, longitude: 90.2792371 },
    dropoffCoord: { latitude: 23.7921507, longitude: 90.4072755 },
    status: "In Progress",
    fare: 320,
  };

  // Use coords from ride or fallback coords
  const pickupCoord = ride.pickupCoord || {
    latitude: 23.7808875,
    longitude: 90.2792371,
  };
  const dropoffCoord = ride.dropoffCoord || {
    latitude: 23.7921507,
    longitude: 90.4072755,
  };

  const [driverPos, setDriverPos] = useState(pickupCoord);
  const [stepIndex, setStepIndex] = useState(0);
  const mapRef = useRef(null);

  const routePoints = generateRoutePoints(pickupCoord, dropoffCoord);

  // Animate driver marker along route points
  useEffect(() => {
    if (stepIndex >= routePoints.length) return;
    const timeout = setTimeout(() => {
      setDriverPos(routePoints[stepIndex]);
      setStepIndex(stepIndex + 1);
      mapRef.current?.animateToRegion(
        {
          ...routePoints[stepIndex],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }, 1000);
    return () => clearTimeout(timeout);
  }, [stepIndex]);

  // Calculate distance (meters) and ETA (minutes)
  const distanceMeters = haversine(pickupCoord, dropoffCoord);
  const distanceKm = (distanceMeters / 1000).toFixed(2);
  const avgSpeedKmh = 30; // assumed average speed
  const etaMinutes = Math.ceil((distanceKm / avgSpeedKmh) * 60);

  const handleCall = () => {
    Alert.alert("Call Driver", `Calling ${driver.phone}`, [
      { text: "Cancel", style: "cancel" },
      { text: "Call", onPress: () => {} },
    ]);
  };

  return (
    <LinearGradient
      colors={[COLORS.primaryLight, COLORS.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...pickupCoord,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsMyLocationButton={Platform.OS === "android"}
      >
        <Marker
          coordinate={pickupCoord}
          title="Pickup"
          pinColor={COLORS.primaryLight}
        />
        <Marker
          coordinate={dropoffCoord}
          title="Dropoff"
          pinColor={COLORS.primaryDark}
        />
        <Marker
          coordinate={driverPos}
          title="Driver"
          description={`${driver.name}`}
          pinColor="blue"
          anchor={{ x: 0.5, y: 0.5 }}
        />
        <Polyline
          coordinates={[pickupCoord, dropoffCoord]}
          strokeColor={COLORS.primaryLight}
          strokeWidth={4}
        />
      </MapView>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Ride In Progress</Text>
        <View style={styles.row}>
          <MaterialIcons
            name="my-location"
            size={18}
            color={COLORS.primaryLight}
          />
          <Text style={styles.label}>Pickup: </Text>
          <Text style={styles.value}>{ride.pickup}</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="location-on"
            size={18}
            color={COLORS.primaryDark}
          />
          <Text style={styles.label}>Dropoff: </Text>
          <Text style={styles.value}>{ride.dropoff}</Text>
        </View>
        <View style={styles.row}>
          <FontAwesome5 name="money-bill" size={16} color={COLORS.success} />
          <Text style={styles.label}>Fare: </Text>
          <Text style={[styles.value, { color: COLORS.success }]}>
            ৳{ride.fare}
          </Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="access-time"
            size={18}
            color={COLORS.primaryDark}
          />
          <Text style={styles.label}>ETA: </Text>
          <Text style={styles.value}>{etaMinutes} min</Text>
        </View>
        <View style={styles.row}>
          <MaterialIcons
            name="directions-car"
            size={18}
            color={COLORS.primaryDark}
          />
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.value}>{ride.status}</Text>
        </View>
      </View>

      <View style={styles.driverCard}>
        <View style={{ flex: 1 }}>
          <Text style={styles.driverName}>{driver.name}</Text>
          <Text style={styles.driverCar}>{driver.car}</Text>
          <Text style={styles.driverNumber}>{driver.number}</Text>
          <View style={styles.driverRatingRow}>
            <MaterialIcons name="star-rate" size={18} color="#FFD600" />
            <Text style={styles.driverRating}>{driver.rating}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.callBtn}
          onPress={handleCall}
          activeOpacity={0.7}
          accessibilityLabel={`Call driver ${driver.name}`}
        >
          <MaterialIcons name="call" size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.cancelBtn, { width: "48%" }]}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          accessibilityLabel="Cancel ride"
        >
          <Text style={styles.cancelBtnText}>Cancel Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.completeBtn, { width: "48%" }]}
          onPress={() => navigation.navigate("TripReceipt", { ride })}
          activeOpacity={0.7}
          accessibilityLabel="Mark ride as completed"
        >
          <Text style={styles.completeBtnText}>Mark as Completed</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  map: {
    flex: 1,
  },
  card: {
    position: "absolute",
    bottom: 120,
    left: 18,
    right: 18,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 18,
    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
    zIndex: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: COLORS.primaryDark,
    marginBottom: 13,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  label: {
    color: COLORS.grayText,
    fontWeight: "500",
    fontSize: 14,
    marginLeft: 5,
  },
  value: {
    color: COLORS.blackText,
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 3,
  },
  driverCard: {
    position: "absolute",
    bottom: 60,
    left: 18,
    right: 18,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 4,
    shadowColor: COLORS.primaryDark,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    zIndex: 11,
  },
  driverName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primaryDark,
  },
  driverCar: { color: COLORS.primaryLight, fontSize: 13, fontWeight: "600" },
  driverNumber: { color: COLORS.grayText, fontSize: 12 },
  driverRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  driverRating: { marginLeft: 5, fontWeight: "bold", color: "#FFD600" },
  callBtn: {
    backgroundColor: COLORS.primaryLight,
    padding: 8,
    borderRadius: 20,
    marginLeft: 14,
  },
  bottomBar: {
    position: "absolute",
    bottom: 10,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 20,
  },
  cancelBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.danger,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 26,
    marginRight: 7,
    shadowColor: COLORS.danger,
    shadowOpacity: 0.08,
    elevation: 3,
    alignItems: "center",
  },
  cancelBtnText: {
    color: COLORS.danger,
    fontWeight: "700",
    fontSize: 15,
  },
  completeBtn: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 26,
    shadowColor: COLORS.primaryLight,
    shadowOpacity: 0.15,
    elevation: 3,
    alignItems: "center",
  },
  completeBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 15,
  },
});
