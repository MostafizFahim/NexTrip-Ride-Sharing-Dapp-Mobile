import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function SectionTitle({
  children,
  style,
  color = "#185a9d",
  subtitle,
  ...props
}) {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color }, style]} {...props}>
        {children}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginTop: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    letterSpacing: 0.8,
  },
  subtitle: {
    color: "#43cea2",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
});
