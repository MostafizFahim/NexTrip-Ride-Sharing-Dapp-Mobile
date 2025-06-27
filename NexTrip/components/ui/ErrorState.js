import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ErrorState({
  message = "Something went wrong.",
  onRetry,
  style,
  icon = <MaterialIcons name="error-outline" size={45} color="#d32f2f" />,
  retryText = "Retry",
}) {
  return (
    <View style={[styles.container, style]}>
      {icon}
      <Text style={styles.text}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.btn} onPress={onRetry}>
          <Text style={styles.btnText}>{retryText}</Text>
        </TouchableOpacity>
      )}
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
    color: "#d32f2f",
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 12,
    textAlign: "center",
  },
  btn: {
    backgroundColor: "#43cea2",
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginTop: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15.5,
  },
});
