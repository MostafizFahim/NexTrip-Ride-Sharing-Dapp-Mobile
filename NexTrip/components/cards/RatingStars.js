import React from "react";
import { View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function RatingStars({ rating = 5, size = 16, style }) {
  const stars = [];
  for (let i = 1; i <= 5; ++i) {
    let name =
      rating >= i ? "star" : rating >= i - 0.5 ? "star-half" : "star-border";
    stars.push(
      <MaterialIcons key={i} name={name} size={size} color="#FFD600" />
    );
  }
  return <View style={[{ flexDirection: "row" }, style]}>{stars}</View>;
}
