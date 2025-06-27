import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Default NexTrip theme gradient
const defaultColors = ["#43cea2", "#185a9d"];

export default function GradientBackground({
  colors = defaultColors,
  start = [0, 0],
  end = [1, 1],
  style,
  children,
}) {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={[styles.bg, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "stretch",
  },
});
