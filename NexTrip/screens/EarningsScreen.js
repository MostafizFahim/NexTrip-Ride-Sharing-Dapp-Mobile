import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const earningsData = {
  balance: 2100,
  totalRides: 53,
  weekEarnings: 1240,
  payoutStatus: "Available",
  history: [
    {
      id: "1",
      date: "2025-06-22",
      fare: 240,
      pickup: "Mirpur",
      dropoff: "Bashundhara",
    },
    {
      id: "2",
      date: "2025-06-21",
      fare: 160,
      pickup: "Dhanmondi",
      dropoff: "Banani",
    },
    {
      id: "3",
      date: "2025-06-21",
      fare: 280,
      pickup: "Airport",
      dropoff: "Uttara",
    },
  ],
};

export default function EarningsScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Earnings</Text>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Earnings</Text>
          <Text style={styles.balanceValue}>৳{earningsData.balance}</Text>
          <Text style={styles.infoText}>
            {earningsData.totalRides} rides &nbsp;•&nbsp; ৳
            {earningsData.weekEarnings} this week
          </Text>
          <TouchableOpacity style={styles.payoutBtn}>
            <MaterialIcons name="payments" size={20} color="#fff" />
            <Text style={styles.payoutBtnText}>Request Payout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Recent Rides</Text>
        {earningsData.history.map((item) => (
          <View key={item.id} style={styles.rideRow}>
            <View>
              <Text style={styles.ridePickup}>
                <FontAwesome5 name="arrow-up" size={13} color="#43cea2" />{" "}
                {item.pickup}
              </Text>
              <Text style={styles.rideDropoff}>
                <FontAwesome5 name="arrow-down" size={13} color="#185a9d" />{" "}
                {item.dropoff}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.rideFare}>৳{item.fare}</Text>
              <Text style={styles.rideDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 24,
    paddingBottom: 60,
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 17,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  balanceCard: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginBottom: 24,
    shadowColor: "#185a9d77",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceLabel: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  balanceValue: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 33,
    marginBottom: 6,
  },
  infoText: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 10,
  },
  payoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#43cea2",
    borderRadius: 13,
    paddingVertical: 10,
    paddingHorizontal: 23,
  },
  payoutBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 3,
  },
  rideRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 17,
    marginBottom: 10,
    width: "100%",
    shadowColor: "#185a9d22",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 2,
    elevation: 1,
  },
  ridePickup: {
    color: "#43cea2",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 2,
  },
  rideDropoff: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  rideFare: {
    color: "#00c853",
    fontWeight: "bold",
    fontSize: 17,
  },
  rideDate: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },
});
