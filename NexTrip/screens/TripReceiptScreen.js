import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width } = Dimensions.get("window");

// Dummy data, replace with real props!
const ride = {
  date: "27 Jun 2025, 10:38 PM",
  id: "#NT123456",
  pickup: "Bashundhara R/A",
  dropoff: "Dhanmondi 27",
  fare: 320,
  distance: "7.4 km",
  duration: "23 min",
  payment: "NexTrip Wallet",
  paymentStatus: "Paid",
  surge: 1.2,
  breakdown: [
    { label: "Base Fare", value: 80 },
    { label: "Distance Fare", value: 170 },
    { label: "Time Fare", value: 40 },
    { label: "Surge x1.2", value: 24 },
    { label: "Discount", value: -14 },
  ],
  pickupCoord: { latitude: 23.8103, longitude: 90.4125 },
  dropoffCoord: { latitude: 23.7921507, longitude: 90.4072755 },
  driver: {
    name: "Mehedi Hasan",
    photo: require("../assets/driver-avatar.png"),
    car: "Toyota Prius (White)",
    number: "DHA-1234",
    rating: 4.8,
  },
};

export default function TripReceiptScreen({ navigation }) {
  const pickupCoord = ride.pickupCoord || {
    latitude: 23.8103,
    longitude: 90.4125,
  };
  const dropoffCoord = ride.dropoffCoord || {
    latitude: 23.7921507,
    longitude: 90.4072755,
  };

  // ---- USE RESET TO RETURN TO HOME TAB ----
  const handleDone = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: "PassengerFlow",
          state: {
            index: 0,
            routes: [{ name: "Home" }],
          },
        },
      ],
    });
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Trip Receipt</Text>
        {/* Map preview */}
        <MapView
          style={styles.mapPreview}
          initialRegion={{
            latitude: (pickupCoord.latitude + dropoffCoord.latitude) / 2,
            longitude: (pickupCoord.longitude + dropoffCoord.longitude) / 2,
            latitudeDelta:
              Math.abs(pickupCoord.latitude - dropoffCoord.latitude) * 5 + 0.03,
            longitudeDelta:
              Math.abs(pickupCoord.longitude - dropoffCoord.longitude) * 5 +
              0.03,
          }}
          pointerEvents="none"
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={pickupCoord} pinColor="#43cea2" />
          <Marker coordinate={dropoffCoord} pinColor="#185a9d" />
          <Polyline
            coordinates={[pickupCoord, dropoffCoord]}
            strokeColor="#43cea2"
            strokeWidth={4}
          />
        </MapView>

        {/* Main Ride Info */}
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Ride ID</Text>
            <Text style={styles.value}>{ride.id}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Date & Time</Text>
            <Text style={styles.value}>{ride.date}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="my-location" size={18} color="#43cea2" />
            <Text style={styles.label2}>From</Text>
            <Text style={styles.value2}>{ride.pickup}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={18} color="#185a9d" />
            <Text style={styles.label2}>To</Text>
            <Text style={styles.value2}>{ride.dropoff}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Distance</Text>
            <Text style={styles.value}>{ride.distance}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Duration</Text>
            <Text style={styles.value}>{ride.duration}</Text>
          </View>
        </View>

        {/* Fare Breakdown */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fare Breakdown</Text>
          {ride.breakdown.map((item, idx) => (
            <View key={idx} style={styles.rowSpace}>
              <Text style={styles.breakLabel}>{item.label}</Text>
              <Text
                style={[
                  styles.breakValue,
                  item.value < 0 && { color: "#d32f2f" },
                ]}
              >
                {item.value < 0
                  ? `-৳${Math.abs(item.value)}`
                  : `৳${item.value}`}
              </Text>
            </View>
          ))}
          <View style={styles.separator} />
          <View style={styles.rowSpace}>
            <Text style={styles.totalText}>Total Fare</Text>
            <Text style={styles.totalValue}>৳{ride.fare}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.payText}>Paid via</Text>
            <Text style={styles.payValue}>{ride.payment}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.payStatusText}>{ride.paymentStatus}</Text>
          </View>
        </View>

        {/* Driver Summary */}
        <View style={styles.driverCard}>
          <Image source={ride.driver.photo} style={styles.driverAvatar} />
          <View style={{ flex: 1, marginLeft: 13 }}>
            <Text style={styles.driverName}>{ride.driver.name}</Text>
            <Text style={styles.driverCar}>{ride.driver.car}</Text>
            <Text style={styles.driverNumber}>{ride.driver.number}</Text>
            <View style={styles.driverRatingRow}>
              <MaterialIcons name="star-rate" size={18} color="#FFD600" />
              <Text style={styles.driverRating}>{ride.driver.rating}</Text>
            </View>
          </View>
        </View>

        {/* Done Button */}
        <TouchableOpacity style={styles.doneBtn} onPress={handleDone}>
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            style={styles.btnGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <FontAwesome5 name="check-circle" size={20} color="#fff" />
            <Text style={styles.doneText}>Done</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 38,
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 10,
    letterSpacing: 1,
  },
  mapPreview: {
    width: width > 400 ? 350 : "98%",
    height: 100,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#43cea2",
    overflow: "hidden",
  },
  card: {
    width: width > 400 ? 350 : "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "#888",
    fontWeight: "500",
    fontSize: 14,
  },
  value: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14,
  },
  label2: {
    color: "#888",
    fontWeight: "500",
    fontSize: 13,
    marginLeft: 6,
  },
  value2: {
    color: "#222",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 3,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 12,
  },
  breakLabel: { color: "#888", fontSize: 14 },
  breakValue: { color: "#222", fontWeight: "bold", fontSize: 14 },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 10,
  },
  totalText: {
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 16,
  },
  totalValue: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 16,
  },
  payText: { color: "#888", fontSize: 13, fontWeight: "500" },
  payValue: { color: "#185a9d", fontWeight: "bold", fontSize: 13 },
  payStatusText: { color: "#43cea2", fontWeight: "700", fontSize: 13 },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width > 400 ? 350 : "97%",
    padding: 14,
    marginBottom: 13,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  driverAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#43cea2",
    backgroundColor: "#eee",
  },
  driverName: { fontSize: 15, fontWeight: "bold", color: "#185a9d" },
  driverCar: { color: "#43cea2", fontSize: 13, fontWeight: "600" },
  driverNumber: { color: "#888", fontSize: 12 },
  driverRatingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  driverRating: { marginLeft: 5, fontWeight: "bold", color: "#FFD600" },
  doneBtn: {
    width: width > 400 ? 190 : "90%",
    borderRadius: 13,
    overflow: "hidden",
    marginTop: 13,
  },
  btnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    borderRadius: 13,
  },
  doneText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 8,
    letterSpacing: 1,
  },
});
