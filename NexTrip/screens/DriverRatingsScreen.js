import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy data: Replace with API or context
const reviews = [
  {
    id: "r1",
    passenger: "Rakibul Hasan",
    avatar: require("../assets/profile-avatar.png"),
    rating: 5,
    review: "Very polite and punctual driver. Ride was super smooth!",
    date: "2025-06-25",
    rideId: "#DRV-10032",
  },
  {
    id: "r2",
    passenger: "Naimur Rahman",
    avatar: require("../assets/profile-avatar.png"),
    rating: 4,
    review: "Good driving, but the AC was not working.",
    date: "2025-06-24",
    rideId: "#DRV-10028",
  },
  {
    id: "r3",
    passenger: "Sadia Anjum",
    avatar: require("../assets/profile-avatar.png"),
    rating: 5,
    review: "Helped me with luggage. Would ride again.",
    date: "2025-06-22",
    rideId: "#DRV-10020",
  },
];

export default function DriverRatingsScreen() {
  // Show stars
  const renderStars = (count) => (
    <View style={{ flexDirection: "row", marginRight: 4 }}>
      {[...Array(5)].map((_, i) => (
        <MaterialIcons
          key={i}
          name={i < count ? "star" : "star-border"}
          size={18}
          color="#FFD600"
        />
      ))}
    </View>
  );

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.headerRow}>
        <View style={styles.avatarWrap}>
          <FontAwesome5 name="user-circle" size={32} color="#43cea2" />
        </View>
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.passengerName}>{item.passenger}</Text>
          <View style={styles.starsRow}>
            {renderStars(item.rating)}
            <Text style={styles.rideId}>{item.rideId}</Text>
          </View>
        </View>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.reviewText}>{item.review}</Text>
    </View>
  );

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>My Passenger Reviews</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 35,
    paddingHorizontal: 8,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 11,
    letterSpacing: 1,
  },
  reviewCard: {
    width: width > 400 ? 355 : "97%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 14,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  avatarWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e7f9f4",
    alignItems: "center",
    justifyContent: "center",
  },
  passengerName: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.2,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: -2,
  },
  rideId: {
    color: "#888",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 7,
  },
  date: {
    color: "#43cea2",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 10,
  },
  reviewText: {
    color: "#222",
    fontSize: 14.5,
    marginTop: 4,
    marginBottom: 2,
    lineHeight: 21,
  },
});
