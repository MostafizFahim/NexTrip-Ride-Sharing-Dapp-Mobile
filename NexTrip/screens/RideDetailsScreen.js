import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const defaultRide = {
  id: "#NT123456",
  date: "27 Jun 2025, 10:38 PM",
  status: "Completed",
  pickup: "Bashundhara R/A",
  dropoff: "Dhanmondi 27",
  fare: 320,
  distance: "7.4 km",
  duration: "23 min",
  payment: "NexTrip Wallet",
  paymentStatus: "Paid",
  driver: {
    name: "Mehedi Hasan",
    photo: require("../assets/driver-avatar.png"),
    car: "Toyota Prius (White)",
    number: "DHA-1234",
    rating: 4.8,
    phone: "+8801XXXXXXXXX",
  },
  blockchain: {
    txHash: "0xA6b23f1e8d...19bE6cD",
  },
};

export default function RideDetailsScreen({ navigation, route }) {
  const [ride, setRide] = useState(route?.params?.ride || defaultRide);

  useEffect(() => {
    if (route?.params?.ride) setRide(route.params.ride);
  }, [route]);

  const handleBlockchain = () => {
    Alert.alert(
      "Blockchain Transaction",
      `Transaction Hash:\n${ride.blockchain?.txHash || "Not available"}`,
      [{ text: "OK" }]
    );
  };

  const handleCallDriver = () => {
    Alert.alert(
      "Call Driver",
      `Do you want to call ${ride.driver.name} at ${ride.driver.phone}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Call",
          onPress: () => {
            // In a real app, integrate with Linking to call
            Alert.alert("Calling...", ride.driver.phone);
          },
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ride Details</Text>
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Ride ID</Text>
            <Text style={styles.value}>{ride.id}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Date</Text>
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
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Fare</Text>
            <Text style={styles.value}>৳{ride.fare}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>{ride.payment}</Text>
          </View>
          <View style={styles.rowSpace}>
            <Text style={styles.label}>Status</Text>
            <Text
              style={[
                styles.value,
                ride.status === "Completed"
                  ? { color: "#00c853" }
                  : ride.status === "Cancelled"
                  ? { color: "#d32f2f" }
                  : { color: "#ffab00" },
              ]}
            >
              {ride.status}
            </Text>
          </View>
        </View>

        {/* Driver Card */}
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
          <TouchableOpacity style={styles.callBtn} onPress={handleCallDriver}>
            <MaterialIcons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.actionBar}>
          <TouchableOpacity style={styles.actionBtn} onPress={handleBlockchain}>
            <FontAwesome5 name="lock" size={17} color="#43cea2" />
            <Text style={styles.actionText}>View on Blockchain</Text>
          </TouchableOpacity>
          {ride.status === "Completed" && (
            <>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => navigation.navigate("TripReceipt", { ride })}
              >
                <MaterialIcons name="receipt" size={18} color="#185a9d" />
                <Text style={[styles.actionText, { color: "#185a9d" }]}>
                  View Receipt
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  navigation.navigate("RateAndFeedbackScreen", { ride })
                }
              >
                <MaterialIcons name="rate-review" size={18} color="#43cea2" />
                <Text style={[styles.actionText, { color: "#43cea2" }]}>
                  Rate Ride
                </Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: "#e8f6f4" }]}
            onPress={() => navigation.navigate("HelpScreen")}
          >
            <Ionicons name="alert-circle" size={18} color="#185a9d" />
            <Text style={[styles.actionText, { color: "#185a9d" }]}>
              Need Help?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 38,
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 13,
    letterSpacing: 1,
  },
  card: {
    width: width > 400 ? 355 : "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 17,
    marginBottom: 17,
    shadowColor: "#185a9d",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
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
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width > 400 ? 355 : "97%",
    padding: 14,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    shadowRadius: 5,
  },
  driverAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#43cea2",
    backgroundColor: "#eee",
  },
  driverName: { fontSize: 15, fontWeight: "bold", color: "#185a9d" },
  driverCar: { color: "#43cea2", fontSize: 13, fontWeight: "600" },
  driverNumber: { color: "#888", fontSize: 12 },
  driverRatingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  driverRating: { marginLeft: 5, fontWeight: "bold", color: "#FFD600" },
  callBtn: {
    backgroundColor: "#43cea2",
    padding: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  actionBar: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width > 400 ? 355 : "97%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5fffc",
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 13,
    marginVertical: 4,
    elevation: 2,
    marginRight: 6,
    marginTop: 2,
  },
  actionText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 7,
  },
});
