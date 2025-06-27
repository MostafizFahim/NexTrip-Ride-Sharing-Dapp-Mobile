import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function NotificationItem({
  title,
  message,
  time,
  icon,
  unread = false,
  onPress,
  style,
  children,
}) {
  return (
    <TouchableOpacity
      style={[styles.item, unread && styles.unread, style]}
      activeOpacity={onPress ? 0.85 : 1}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.iconWrap}>
        {icon || (
          <MaterialIcons
            name="notifications"
            size={22}
            color={unread ? "#43cea2" : "#185a9d"}
          />
        )}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, unread && { color: "#185a9d" }]}>
          {title}
        </Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.row}>
          <Text style={styles.time}>{time}</Text>
          {children}
        </View>
      </View>
      {unread && <View style={styles.dot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 11,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
    position: "relative",
  },
  unread: {
    borderLeftWidth: 4,
    borderLeftColor: "#43cea2",
  },
  iconWrap: {
    marginRight: 11,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 1,
  },
  message: {
    color: "#444",
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.93,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  time: {
    color: "#999",
    fontSize: 12.3,
    marginRight: 7,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#43cea2",
    position: "absolute",
    top: 17,
    right: 13,
  },
});
