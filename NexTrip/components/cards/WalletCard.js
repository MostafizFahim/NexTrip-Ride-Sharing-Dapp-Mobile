import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function WalletCard({
  balance = 0,
  currency = "৳",
  cardLast4 = "4321",
  onAdd,
  onWithdraw,
  onDetails,
  style,
  children,
}) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.rowBetween}>
        <Text style={styles.label}>Wallet Balance</Text>
        <FontAwesome5 name="wallet" size={23} color="#43cea2" />
      </View>
      <Text style={styles.balance}>
        {currency}
        {balance.toLocaleString()}
      </Text>
      <Text style={styles.cardNum}>
        <MaterialIcons name="credit-card" size={16} color="#185a9d" />
        {"  "}
        **** **** **** {cardLast4}
      </Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionBtn} onPress={onAdd}>
          <MaterialIcons name="add-circle" size={20} color="#43cea2" />
          <Text style={styles.actionText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onWithdraw}>
          <MaterialIcons name="remove-circle" size={20} color="#d32f2f" />
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={onDetails}>
          <MaterialIcons name="receipt" size={19} color="#185a9d" />
          <Text style={styles.actionText}>Details</Text>
        </TouchableOpacity>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginVertical: 9,
    width: "100%",
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  label: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15,
  },
  balance: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 25,
    marginVertical: 4,
    letterSpacing: 1,
  },
  cardNum: {
    color: "#185a9d",
    fontSize: 14.5,
    marginVertical: 4,
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    marginTop: 13,
    alignItems: "center",
    flexWrap: "wrap",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f9f4",
    borderRadius: 11,
    marginRight: 12,
    paddingVertical: 7,
    paddingHorizontal: 13,
    marginBottom: 6,
  },
  actionText: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 14.5,
    marginLeft: 5,
  },
});
