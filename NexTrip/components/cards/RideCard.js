import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import StatusChip from "../ui/StatusChip";

import Avatar from "../ui/Avatar";

export default function RideCard({
  pickup,
  dropoff,
  date,
  fare,
  driver,
  status = "Completed",
  onPress,
  showAvatar = true,
  style,
  children,
}) {
  return (
    <TouchableOpacity
      style={[styles.card, style]}
      activeOpacity={onPress ? 0.84 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.topRow}>
        {showAvatar && (
          <Avatar
            source={driver?.photo}
            size={44}
            borderColor="#43cea2"
            style={{ marginRight: 10 }}
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.driverName}>{driver?.name || "Driver"}</Text>
          <Text style={styles.date}>
            <MaterialIcons name="event" size={14} color="#43cea2" /> {date}
          </Text>
        </View>
        <StatusChip label={status} />
      </View>
      <View style={styles.row}>
        <MaterialIcons name="my-location" size={17} color="#43cea2" />
        <Text style={styles.label}>Pickup: </Text>
        <Text style={styles.value}>{pickup}</Text>
      </View>
      <View style={styles.row}>
        <MaterialIcons name="location-on" size={17} color="#185a9d" />
        <Text style={styles.label}>Dropoff: </Text>
        <Text style={styles.value}>{dropoff}</Text>
      </View>
      <View style={styles.fareRow}>
        <FontAwesome5 name="money-bill" size={14} color="#00c853" />
        <Text style={styles.label}>Fare: </Text>
        <Text style={[styles.value, { color: "#00c853" }]}>৳{fare}</Text>
      </View>
      {/* Actions or children (button, etc) */}
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    width: "100%",
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  driverName: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.3,
  },
  date: {
    color: "#888",
    fontSize: 12.2,
    marginTop: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  fareRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 1,
  },
  label: {
    color: "#888",
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 5,
  },
  value: {
    color: "#222",
    fontWeight: "600",
    fontSize: 14.1,
    marginLeft: 2,
  },
});
