import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppHeader({
  title,
  onBack,
  leftIcon,
  rightIcon,
  rightAction,
  style,
  titleStyle,
  gradient = ["#43cea2", "#185a9d"],
  ...props
}) {
  return (
    <LinearGradient
      colors={gradient}
      start={[0, 0]}
      end={[1, 1]}
      style={[styles.bg, style]}
    >
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.iconBtn}>
            {leftIcon || (
              <MaterialIcons name="arrow-back" size={26} color="#fff" />
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} /> // empty space for layout
        )}
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
        {rightIcon && rightAction ? (
          <TouchableOpacity onPress={rightAction} style={styles.iconBtn}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.iconBtn} /> // empty space for layout
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    paddingTop: Platform.OS === "ios" ? 48 : 22,
    paddingBottom: 12,
    paddingHorizontal: 14,
    borderBottomLeftRadius: 19,
    borderBottomRightRadius: 19,
    elevation: 6,
    shadowColor: "#185a9d",
    shadowOpacity: 0.14,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.8,
  },
  iconBtn: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
  },
});
