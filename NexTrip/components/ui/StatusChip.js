import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Map status to color (expand as needed)
const STATUS_COLORS = {
  Completed: "#43cea2",
  Active: "#43cea2",
  "In Progress": "#185a9d",
  Pending: "#ffab00",
  Cancelled: "#d32f2f",
  Banned: "#d32f2f",
  Default: "#bdbdbd",
};

export default function StatusChip({ label, color, style, textStyle }) {
  const bgColor = color || STATUS_COLORS[label] || STATUS_COLORS.Default;

  return (
    <View style={[styles.chip, { backgroundColor: bgColor }, style]}>
      <Text style={[styles.text, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 13,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: "flex-start",
    marginVertical: 2,
    backgroundColor: "#bdbdbd",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
    letterSpacing: 0.3,
  },
});
