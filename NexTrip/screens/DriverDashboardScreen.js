import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy data – replace with real driver info
const driver = {
  name: "Mehedi Hasan",
  rating: 4.85,
  totalEarnings: 12500,
  totalTrips: 87,
  car: "Toyota Prius (White)",
  number: "DHA-1234",
  photo: require("../assets/driver-avatar.png"),
};

const recentTrips = [
  {
    id: "1",
    date: "2025-06-25",
    pickup: "Bashundhara R/A",
    dropoff: "Banani",
    fare: 400,
    status: "Completed",
  },
  {
    id: "2",
    date: "2025-06-24",
    pickup: "Gulshan 2",
    dropoff: "Dhanmondi 27",
    fare: 370,
    status: "Completed",
  },
  // Add more...
];

export default function DriverDashboardScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#185a9d", "#43cea2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Driver Info Card */}
        <View style={styles.driverCard}>
          <Image source={driver.photo} style={styles.avatar} />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.name}>{driver.name}</Text>
            <Text style={styles.infoText}>
              {driver.car} ({driver.number})
            </Text>
            <View style={styles.ratingRow}>
              <MaterialIcons name="star-rate" size={18} color="#FFD600" />
              <Text style={styles.rating}>{driver.rating}</Text>
            </View>
          </View>
        </View>

        {/* Earnings & Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>৳{driver.totalEarnings}</Text>
            <Text style={styles.statsLabel}>Total Earnings</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={styles.statsValue}>{driver.totalTrips}</Text>
            <Text style={styles.statsLabel}>Total Trips</Text>
          </View>
        </View>

        {/* Go Online Button */}
        <TouchableOpacity
          style={styles.onlineBtn}
          onPress={() => alert("Going online...")}
        >
          <Text style={styles.onlineBtnText}>Go Online</Text>
        </TouchableOpacity>

        {/* Recent Trips */}
        <Text style={styles.sectionTitle}>Recent Trips</Text>
        {recentTrips.length === 0 ? (
          <Text style={{ color: "#fff", opacity: 0.6, textAlign: "center" }}>
            No trips yet
          </Text>
        ) : (
          recentTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripRow}>
                <MaterialIcons
                  name="my-location"
                  size={16}
                  color="#185a9d"
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.tripText}>{trip.pickup}</Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={15}
                  color="#43cea2"
                  style={{ marginHorizontal: 7 }}
                />
                <Text style={styles.tripText}>{trip.dropoff}</Text>
              </View>
              <View style={styles.tripBottomRow}>
                <Text style={styles.tripDate}>{trip.date}</Text>
                <FontAwesome5 name="money-bill" size={14} color="#00c853" />
                <Text style={styles.tripFare}>৳{trip.fare}</Text>
                <Text
                  style={[
                    styles.tripStatus,
                    trip.status === "Completed"
                      ? styles.completed
                      : styles.cancelled,
                  ]}
                >
                  {trip.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  content: { padding: 20, paddingBottom: 36 },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 17,
    padding: 16,
    marginTop: 30,
    marginBottom: 20,
    elevation: 7,
    shadowColor: "#185a9d",
    shadowOpacity: 0.11,
    shadowRadius: 8,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#43cea2",
  },
  name: { fontSize: 18, fontWeight: "bold", color: "#185a9d" },
  infoText: { color: "#43cea2", fontSize: 13, fontWeight: "600" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  rating: { marginLeft: 5, fontWeight: "bold", color: "#FFD600" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statsBox: {
    backgroundColor: "#fff",
    flex: 1,
    marginHorizontal: 7,
    borderRadius: 14,
    alignItems: "center",
    paddingVertical: 20,
    elevation: 4,
    shadowColor: "#43cea2",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  statsValue: { fontSize: 21, color: "#185a9d", fontWeight: "bold" },
  statsLabel: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 13,
    marginTop: 3,
  },
  onlineBtn: {
    backgroundColor: "#43cea2",
    borderRadius: 13,
    paddingVertical: 15,
    marginBottom: 18,
    marginTop: 3,
    elevation: 3,
  },
  onlineBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
    letterSpacing: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 16,
    marginBottom: 12,
    textShadowColor: "#185a9d66",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  tripCard: {
    backgroundColor: "#fff",
    borderRadius: 13,
    padding: 14,
    marginBottom: 13,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.09,
    shadowRadius: 6,
  },
  tripRow: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  tripText: { color: "#185a9d", fontWeight: "600", fontSize: 14 },
  tripBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tripDate: { color: "#888", fontSize: 12, fontWeight: "600" },
  tripFare: {
    color: "#00c853",
    fontWeight: "700",
    fontSize: 14,
    marginHorizontal: 8,
  },
  tripStatus: {
    fontWeight: "bold",
    fontSize: 13,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 11,
    marginLeft: 8,
    overflow: "hidden",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  completed: { backgroundColor: "#43cea211", color: "#43cea2" },
  cancelled: { backgroundColor: "#b71c1c18", color: "#b71c1c" },
});
