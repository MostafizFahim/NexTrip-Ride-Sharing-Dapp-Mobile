// components/cards/FeatureCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function FeatureCard({ icon, title, description }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 14,
    alignItems: "center",
    shadowColor: "#185a9d",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#185a9d",
    marginBottom: 6,
    textAlign: "center",
  },
  desc: {
    fontSize: 14,
    color: "#43cea2",
    textAlign: "center",
  },
});
