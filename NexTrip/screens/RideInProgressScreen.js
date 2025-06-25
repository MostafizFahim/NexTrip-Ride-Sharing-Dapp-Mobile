import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy data – replace with real state/props
const driver = {
  name: "Mehedi Hasan",
  photo: require("../assets/driver-avatar.png"),
  car: "Toyota Prius (White)",
  number: "DHA-1234",
  rating: 4.8,
  phone: "+8801XXXXXXXXX",
};
const ride = {
  pickup: "Bashundhara R/A",
  dropoff: "Dhanmondi 27",
  status: "In Progress",
  fare: 320,
  eta: "9 min",
};

export default function RideInProgressScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <View style={styles.container}>
        {/* Map Placeholder */}
        <View style={styles.mapBox}>
          <Image
            source={require("../assets/map-sample.jpg")}
            style={styles.map}
            resizeMode="cover"
          />
          <View style={styles.etaBox}>
            <MaterialIcons name="access-time" size={22} color="#185a9d" />
            <Text style={styles.etaText}>{ride.eta} to destination</Text>
          </View>
        </View>

        {/* Ride Summary Card */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ride In Progress</Text>
          <View style={styles.row}>
            <MaterialIcons name="my-location" size={18} color="#43cea2" />
            <Text style={styles.label}>Pickup: </Text>
            <Text style={styles.value}>{ride.pickup}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={18} color="#185a9d" />
            <Text style={styles.label}>Dropoff: </Text>
            <Text style={styles.value}>{ride.dropoff}</Text>
          </View>
          <View style={styles.row}>
            <FontAwesome5 name="money-bill" size={16} color="#00c853" />
            <Text style={styles.label}>Fare: </Text>
            <Text style={[styles.value, { color: "#00c853" }]}>৳{ride.fare}</Text>
          </View>
          <View style={styles.row}>
            <MaterialIcons name="directions-car" size={18} color="#185a9d" />
            <Text style={styles.label}>Status: </Text>
            <Text style={styles.value}>{ride.status}</Text>
          </View>
        </View>

        {/* Driver Card */}
        <View style={styles.driverCard}>
          <Image source={driver.photo} style={styles.driverAvatar} />
          <View style={{ flex: 1, marginLeft: 13 }}>
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
            onPress={() => alert(`Calling ${driver.phone}`)}
          >
            <MaterialIcons name="call" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelBtnText}>Cancel Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.completeBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.completeBtnText}>Mark as Completed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 0,
  },
  mapBox: {
    width: "100%",
    height: width * 0.65,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
    position: "absolute",
    top: 0,
    zIndex: 1,
    elevation: 2,
  },
  map: { width: "100%", height: "100%" },
  etaBox: {
    position: "absolute",
    top: 20,
    right: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  etaText: { color: "#185a9d", marginLeft: 7, fontWeight: "700", fontSize: 15 },
  card: {
    marginTop: width * 0.61,
    backgroundColor: "#fff",
    marginHorizontal: 18,
    borderRadius: 18,
    padding: 18,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
    marginBottom: 12,
    zIndex: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 13,
  },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  label: { color: "#888", fontWeight: "500", fontSize: 14, marginLeft: 5 },
  value: { color: "#222", fontWeight: "600", fontSize: 15, marginLeft: 3 },
  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 18,
    padding: 14,
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    zIndex: 2,
  },
  driverAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: "#43cea2",
    backgroundColor: "#eee",
  },
  driverName: { fontSize: 16, fontWeight: "bold", color: "#185a9d" },
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
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 18,
    marginBottom: 30,
    marginTop: 5,
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#b71c1c",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 26,
    marginRight: 7,
    shadowColor: "#b71c1c",
    shadowOpacity: 0.08,
    elevation: 3,
  },
  cancelBtnText: {
    color: "#b71c1c",
    fontWeight: "700",
    fontSize: 15,
  },
  completeBtn: {
    backgroundColor: "#43cea2",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 26,
    shadowColor: "#43cea2",
    shadowOpacity: 0.15,
    elevation: 3,
  },
  completeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
