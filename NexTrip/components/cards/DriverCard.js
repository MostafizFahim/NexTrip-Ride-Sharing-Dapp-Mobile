import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Avatar from "./Avatar";
import RatingStars from "./RatingStars";

export default function DriverCard({
  name,
  photo,
  vehicle,
  number,
  rating,
  phone,
  onCall,
  onPress,
  style,
  children,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <Avatar
        source={photo}
        size={55}
        borderColor="#43cea2"
        style={{ marginRight: 15 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.vehicle}>{vehicle}</Text>
        {number && <Text style={styles.number}>{number}</Text>}
        <View style={styles.ratingRow}>
          <RatingStars rating={rating} size={15} />
          <Text style={styles.rating}>{rating?.toFixed(1) ?? ""}</Text>
        </View>
      </View>
      {phone && (
        <TouchableOpacity style={styles.callBtn} onPress={onCall}>
          <MaterialIcons name="call" size={21} color="#fff" />
        </TouchableOpacity>
      )}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginVertical: 7,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  name: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 1,
  },
  vehicle: {
    color: "#43cea2",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 1,
  },
  number: {
    color: "#888",
    fontSize: 12.2,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  rating: {
    marginLeft: 7,
    color: "#FFD600",
    fontWeight: "bold",
    fontSize: 13.5,
  },
  callBtn: {
    backgroundColor: "#43cea2",
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
});
