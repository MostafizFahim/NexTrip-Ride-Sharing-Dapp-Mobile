import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function EmptyState({
  message = "No data found.",
  icon = <MaterialIcons name="inbox" size={44} color="#43cea2" />,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 32,
    padding: 16,
  },
  text: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 16,
    marginVertical: 12,
    textAlign: "center",
    opacity: 0.9,
  },
});
