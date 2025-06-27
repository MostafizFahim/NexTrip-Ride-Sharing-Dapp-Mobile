import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function PromoBanner({
  code,
  offer,
  description,
  expires,
  onApply,
  used = false,
  style,
  children,
}) {
  return (
    <LinearGradient
      colors={used ? ["#bdbdbd", "#888"] : ["#43cea2", "#185a9d"]}
      start={[0, 0]}
      end={[1, 1]}
      style={[styles.banner, style, used && { opacity: 0.7 }]}
    >
      <View style={styles.row}>
        <FontAwesome5 name="percent" size={22} color="#fff" />
        <View style={styles.textWrap}>
          <Text style={styles.code}>{code}</Text>
          <Text style={styles.offer}>{offer}</Text>
          {description && <Text style={styles.desc}>{description}</Text>}
          {expires && (
            <Text style={styles.expiry}>
              <MaterialIcons name="timer" size={13} color="#fff" /> Expires:{" "}
              {expires}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.bottomRow}>
        {onApply && !used && (
          <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        )}
        {used && (
          <Text style={styles.usedText}>
            <MaterialIcons name="check-circle" size={16} color="#fff" /> Used
          </Text>
        )}
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 9,
    width: "100%",
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.09,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  textWrap: {
    flex: 1,
    marginLeft: 13,
  },
  code: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 2,
  },
  offer: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 2,
  },
  desc: {
    color: "#e7f9f4",
    fontSize: 13.5,
    marginTop: 2,
    opacity: 0.93,
  },
  expiry: {
    color: "#e7f9f4",
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    justifyContent: "flex-end",
  },
  applyBtn: {
    backgroundColor: "#fff",
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 19,
    elevation: 1,
  },
  applyText: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14.3,
    letterSpacing: 1,
  },
  usedText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    opacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
  },
});
