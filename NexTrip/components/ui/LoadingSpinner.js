import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoadingSpinner({
  visible = true,
  message = "Loading...",
  overlay = true,
  color = "#43cea2",
  size = "large",
  style,
  textStyle,
}) {
  if (!visible) return null;
  return (
    <View style={[overlay ? styles.overlay : styles.inline, style]}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={[styles.text, textStyle]}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width,
    height,
    backgroundColor: "rgba(24, 90, 157, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },
  inline: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  text: {
    color: "#185a9d",
    marginTop: 9,
    fontWeight: "bold",
    fontSize: 15.5,
    letterSpacing: 0.5,
  },
});
