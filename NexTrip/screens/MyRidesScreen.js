import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy ride data (replace with real API/data)
const rides = [
  {
    id: "#DRV-10032",
    date: "2025-06-25 19:04",
    pickup: "Dhanmondi 32",
    dropoff: "Bashundhara R/A",
    fare: 290,
    status: "Completed",
    passenger: "Rakibul Hasan",
    rating: 4.9,
    distance: "7.5 km",
    duration: "19 min",
  },
  {
    id: "#DRV-10028",
    date: "2025-06-24 15:21",
    pickup: "Mirpur 2",
    dropoff: "Shyamoli",
    fare: 130,
    status: "Cancelled",
    passenger: "Naimur Rahman",
    rating: null,
    distance: "4.2 km",
    duration: "10 min",
  },
  // Add more rides as needed
].sort((a, b) => new Date(b.date) - new Date(a.date)); // Recent first

export default function MyRidesScreen({ navigation }) {
  const renderRide = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.rideId}>{item.id}</Text>
        <Text
          style={[
            styles.status,
            item.status === "Completed"
              ? { color: "#00c853" }
              : item.status === "Cancelled"
              ? { color: "#d32f2f" }
              : { color: "#ffab00" },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="date-range" size={16} color="#43cea2" />
        <Text style={styles.label}>{item.date}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="my-location" size={16} color="#185a9d" />
        <Text style={styles.label}>From:</Text>
        <Text style={styles.value}>{item.pickup}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="location-on" size={16} color="#43cea2" />
        <Text style={styles.label}>To:</Text>
        <Text style={styles.value}>{item.dropoff}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesome5 name="user" size={14} color="#185a9d" />
        <Text style={styles.label}>Passenger:</Text>
        <Text style={styles.value}>{item.passenger}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="attach-money" size={16} color="#43cea2" />
        <Text style={styles.label}>Fare:</Text>
        <Text style={styles.value}>৳{item.fare}</Text>
        <MaterialIcons
          name="directions-car"
          size={16}
          color="#185a9d"
          style={{ marginLeft: 13 }}
        />
        <Text style={styles.label}>{item.distance}</Text>
        <MaterialIcons
          name="access-time"
          size={16}
          color="#43cea2"
          style={{ marginLeft: 13 }}
        />
        <Text style={styles.label}>{item.duration}</Text>
      </View>
      {item.rating !== null && (
        <View style={styles.row}>
          <MaterialIcons name="star-rate" size={16} color="#FFD600" />
          <Text style={styles.label}>Passenger Rating:</Text>
          <Text style={styles.value}>{item.rating}</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.detailsBtn}
        onPress={() => navigation.navigate("DriverRideDetails", { ride: item })}
      >
        <Text style={styles.detailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={renderRide}
        contentContainerStyle={{
          paddingBottom: 34,
          paddingTop: 36,
          paddingHorizontal: 8,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Text style={styles.title}>My Ride History</Text>}
        ListEmptyComponent={
          <View style={{ marginTop: 50 }}>
            <Text style={{ color: "#fff", fontSize: 17, opacity: 0.8 }}>
              No rides found.
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
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
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 7 },
    elevation: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
  },
  rideId: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.5,
  },
  status: {
    fontWeight: "bold",
    fontSize: 15,
  },
  label: {
    color: "#888",
    fontWeight: "500",
    fontSize: 13.5,
    marginLeft: 7,
  },
  value: {
    color: "#222",
    fontWeight: "600",
    fontSize: 13.5,
    marginLeft: 6,
  },
  detailsBtn: {
    alignSelf: "flex-end",
    backgroundColor: "#43cea2",
    paddingVertical: 7,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginTop: 9,
    elevation: 1,
  },
  detailsText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    letterSpacing: 0.6,
  },
});
