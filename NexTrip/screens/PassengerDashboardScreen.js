import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const defaultUser = {
  name: "Rayhan Ferdous",
  avatar: require("../assets/srejon.jpg"),
  nextRide: {
    pickup: "Bashundhara R/A",
    dropoff: "Dhanmondi 27",
    time: "Today 5:30 PM",
    status: "Scheduled",
    rideId: "101",
  },
};

const defaultRideHistory = [
  {
    id: "1",
    pickup: "Banani",
    dropoff: "Gulshan",
    fare: 190,
    date: "2025-06-24",
  },
  {
    id: "2",
    pickup: "Farmgate",
    dropoff: "Bashundhara",
    fare: 270,
    date: "2025-06-20",
  },
];

export default function PassengerDashboardScreen({ navigation }) {
  const [user, setUser] = useState(defaultUser);
  const [rideHistory, setRideHistory] = useState(defaultRideHistory);

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");
        const savedRides = await AsyncStorage.getItem("rideHistory");
        if (savedUser) setUser(JSON.parse(savedUser));
        if (savedRides) setRideHistory(JSON.parse(savedRides));
      } catch (e) {
        Alert.alert("Failed to load data");
      }
    };
    loadData();
  }, []);

  // Save user & rides to AsyncStorage when changed
  useEffect(() => {
    AsyncStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    AsyncStorage.setItem("rideHistory", JSON.stringify(rideHistory));
  }, [rideHistory]);

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {user.name}</Text>
        <View style={styles.profileRow}>
          <Image source={user.avatar} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Feather name="edit-3" size={18} color="#43cea2" />
          </TouchableOpacity>
        </View>

        {/* Next Ride Card */}
        {user.nextRide ? (
          <View style={styles.nextRideCard}>
            <Text style={styles.cardTitle}>Your Next Ride</Text>
            <View style={styles.rideRow}>
              <MaterialIcons name="my-location" size={18} color="#43cea2" />
              <Text style={styles.rideLabel}>Pickup: </Text>
              <Text style={styles.rideValue}>
                {user.nextRide?.pickup || "Not scheduled"}
              </Text>
            </View>
            <View style={styles.rideRow}>
              <MaterialIcons name="location-on" size={18} color="#185a9d" />
              <Text style={styles.rideLabel}>Dropoff: </Text>
              <Text style={styles.rideValue}>
                {user.nextRide?.dropoff || "Not scheduled"}
              </Text>
            </View>
            <View style={styles.rideRow}>
              <FontAwesome5 name="clock" size={15} color="#00c853" />
              <Text style={styles.rideLabel}>Time: </Text>
              <Text style={[styles.rideValue, { color: "#00c853" }]}>
                {user.nextRide?.time || "--"}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.primaryButton}
              // Track ride in progress
              onPress={() =>
                navigation.navigate("RideInProgressScreen", {
                  rideId: user.nextRide?.rideId || "scheduled",
                })
              }
            >
              <Text style={styles.primaryButtonText}>Track Ride</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.nextRideCard}>
            <Text style={styles.cardTitle}>No Next Ride Scheduled</Text>
          </View>
        )}

        {/* Ride History */}
        <Text style={styles.sectionTitle}>Recent Rides</Text>
        <FlatList
          data={rideHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.rideHistoryRow}
              // Go to ride details (from here you can rate & feedback)
              onPress={() =>
                navigation.navigate("RideDetailsScreen", { rideId: item.id })
              }
            >
              <View>
                <Text style={styles.rideValue}>
                  {item.pickup} → {item.dropoff}
                </Text>
                <Text style={styles.rideDate}>{item.date}</Text>
              </View>
              <Text style={styles.rideFare}>৳{item.fare}</Text>
            </TouchableOpacity>
          )}
          style={{ width: "100%", marginTop: 8 }}
        />

        {/* Book New Ride Button */}
        <TouchableOpacity
          style={styles.bookBtn}
          // This starts the passenger booking flow!
          onPress={() => navigation.navigate("BookRide")}
        >
          <MaterialIcons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.bookBtnText}>Book New Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.goHomeBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.goHomeBtnText}>Go to Home</Text>
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
    padding: 22,
    paddingBottom: 40,
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 11,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#43cea2",
    marginRight: 10,
  },
  editBtn: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#185a9d44",
    marginLeft: 2,
  },
  nextRideCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 23,
    shadowColor: "#185a9d33",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardTitle: {
    fontWeight: "bold",
    color: "#185a9d",
    fontSize: 16,
    marginBottom: 9,
  },
  rideRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  rideLabel: { color: "#888", fontWeight: "500", fontSize: 13, marginLeft: 5 },
  rideValue: { color: "#222", fontWeight: "700", fontSize: 15, marginLeft: 3 },
  primaryButton: {
    marginTop: 10,
    backgroundColor: "#43cea2",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 11,
  },
  primaryButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 3,
    marginTop: 15,
  },
  rideHistoryRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#185a9d22",
  },
  rideDate: { color: "#888", fontSize: 12, marginTop: 2, fontWeight: "500" },
  rideFare: { color: "#43cea2", fontWeight: "700", fontSize: 16 },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#185a9d",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 28,
    shadowColor: "#185a9d88",
    elevation: 4,
  },
  bookBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 9,
  },
  goHomeBtn: {
    marginTop: 20,
    backgroundColor: "#43cea2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignSelf: "center",
    elevation: 3,
  },
  goHomeBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
