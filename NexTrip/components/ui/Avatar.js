import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function Avatar({
  size = 54,
  source,
  style,
  borderColor = "#43cea2",
  icon = <MaterialIcons name="person" size={size * 0.62} color="#185a9d" />,
  ...props
}) {
  return (
    <View
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2, borderColor },
        style,
      ]}
    >
      {source ? (
        <Image
          source={typeof source === "string" ? { uri: source } : source}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            resizeMode: "cover",
          }}
          {...props}
        />
      ) : (
        <View style={styles.iconWrap}>{icon}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 2,
    backgroundColor: "#e7f9f4",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  iconWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
