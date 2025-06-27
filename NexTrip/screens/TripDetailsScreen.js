import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import MapView, { Marker, Polyline } from "react-native-maps";

const { width } = Dimensions.get("window");

export default function TripDetailsScreen({ navigation, route }) {
  // Use trip data from navigation, or fallback to defaults
  const trip = route?.params?.trip || {
    date: "2025-06-21",
    time: "18:30",
    pickup: "Bashundhara R/A",
    dropoff: "Dhanmondi 27",
    fare: 320,
    status: "Completed",
    driver: "Mehedi Hasan",
    car: "Toyota Prius",
    number: "DHA-1234",
    rating: 4.8,
    // Optionally provide coordinates for preview map
    pickupCoord: { latitude: 23.8103, longitude: 90.4125 },
    dropoffCoord: { latitude: 23.7921507, longitude: 90.4072755 },
  };

  // fallback for coordinates if not present in trip
  const pickupCoord = trip.pickupCoord || {
    latitude: 23.8103,
    longitude: 90.4125,
  };
  const dropoffCoord = trip.dropoffCoord || {
    latitude: 23.7921507,
    longitude: 90.4072755,
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trip Details</Text>

        {/* Mini map preview */}
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

        {/* Trip details card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="date-range" size={20} color="#185a9d" />
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{trip.date}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="access-time" size={20} color="#43cea2" />
            <Text style={styles.label}>Time:</Text>
            <Text style={styles.value}>{trip.time}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="my-location" size={20} color="#43cea2" />
            <Text style={styles.label}>Pickup:</Text>
            <Text style={styles.value}>{trip.pickup}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={20} color="#185a9d" />
            <Text style={styles.label}>Dropoff:</Text>
            <Text style={styles.value}>{trip.dropoff}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome name="money" size={18} color="#00c853" />
            <Text style={styles.label}>Fare:</Text>
            <Text style={[styles.value, { color: "#00c853" }]}>
              ৳{trip.fare}
            </Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="directions-car" size={20} color="#185a9d" />
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{trip.status}</Text>
          </View>
        </View>

        {/* Driver Info */}
        <View style={styles.driverCard}>
          <Image
            source={require("../assets/driver-avatar.png")}
            style={styles.avatar}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.driverName}>{trip.driver}</Text>
            <Text style={styles.carInfo}>
              {trip.car} ({trip.number})
            </Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star-rate" size={18} color="#FFD600" />
              <Text style={styles.driverRating}>{trip.rating}</Text>
            </View>
          </View>
        </View>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={19} color="#fff" />
          <Text style={styles.backBtnText}>Back to History</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    padding: 24,
    paddingBottom: 40,
    marginTop: 30,
  },
  title: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 17,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  mapPreview: {
    width: "100%",
    height: 120,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#43cea2",
    overflow: "hidden",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
    shadowColor: "#185a9d77",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
  },
  label: {
    color: "#888",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 7,
  },
  value: {
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 13,
    width: "100%",
    elevation: 3,
    marginBottom: 16,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#43cea2",
    backgroundColor: "#fff",
  },
  driverName: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
  },
  carInfo: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 13,
    marginVertical: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  driverRating: {
    color: "#FFD600",
    fontWeight: "bold",
    marginLeft: 4,
  },
  backBtn: {
    marginTop: 20,
    backgroundColor: "#185a9d",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 13,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
});
