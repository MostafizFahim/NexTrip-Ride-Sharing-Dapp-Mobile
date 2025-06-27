// screens/WalletScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const walletBalance = 1450;
const cards = [
  {
    id: "1",
    type: "Visa",
    last4: "1234",
    logo: require("../assets/visa.png"),
  },
  {
    id: "2",
    type: "MasterCard",
    last4: "8765",
    logo: require("../assets/mastercard.png"),
  },
];
const transactions = [
  { id: "1", title: "Ride to Dhanmondi", date: "2025-06-21", amount: -320 },
  { id: "2", title: "Added Money", date: "2025-06-19", amount: +1000 },
  { id: "3", title: "Ride to Banani", date: "2025-06-16", amount: -210 },
];

export default function WalletScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.title}>My Wallet</Text>
            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Wallet Balance</Text>
              <Text style={styles.balanceValue}>৳{walletBalance}</Text>
              <TouchableOpacity
                style={styles.addMoneyBtn}
                onPress={() => alert("Add Money feature coming soon!")}
              >
                <MaterialIcons
                  name="add-circle-outline"
                  size={22}
                  color="#43cea2"
                />
                <Text style={styles.addMoneyText}>Add Money</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Saved Cards</Text>
            <View style={styles.cardsRow}>
              {cards.map((card) => (
                <View key={card.id} style={styles.cardBox}>
                  <Image source={card.logo} style={styles.cardLogo} />
                  <Text style={styles.cardType}>{card.type}</Text>
                  <Text style={styles.cardNumber}>•••• {card.last4}</Text>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.cardBox, styles.addCardBox]}
                onPress={() => alert("Add Card")}
              >
                <FontAwesome name="plus" size={28} color="#185a9d" />
                <Text style={[styles.cardType, { color: "#185a9d" }]}>
                  Add Card
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
          </View>
        }
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.txnRow}>
            <View>
              <Text style={styles.txnTitle}>{item.title}</Text>
              <Text style={styles.txnDate}>{item.date}</Text>
            </View>
            <Text
              style={[
                styles.txnAmount,
                { color: item.amount > 0 ? "#43cea2" : "#b71c1c" },
              ]}
            >
              {item.amount > 0 ? "+" : ""}
              {item.amount}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 24,
    paddingBottom: 50,
    alignItems: "center",
    marginTop: 30,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 15,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  balanceCard: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginBottom: 22,
    shadowColor: "#185a9d77",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceLabel: {
    color: "#888",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },
  balanceValue: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 32,
    marginBottom: 7,
  },
  addMoneyBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    backgroundColor: "#f3faf8",
    borderRadius: 13,
    paddingVertical: 7,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: "#43cea2",
  },
  addMoneyText: {
    marginLeft: 7,
    color: "#43cea2",
    fontWeight: "700",
    fontSize: 15,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
    alignSelf: "flex-start",
    marginTop: 17,
    marginBottom: 9,
    marginLeft: 3,
  },
  cardsRow: {
    flexDirection: "row",
    marginBottom: 12,
    width: "100%",
  },
  cardBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    alignItems: "center",
    padding: 13,
    marginRight: 12,
    minWidth: 93,
    elevation: 2,
    shadowColor: "#185a9d33",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  addCardBox: {
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#185a9d",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  cardLogo: {
    width: 36,
    height: 22,
    resizeMode: "contain",
    marginBottom: 5,
  },
  cardType: {
    fontWeight: "700",
    color: "#185a9d",
    fontSize: 14,
    marginBottom: 2,
  },
  cardNumber: {
    fontSize: 13,
    color: "#888",
    letterSpacing: 1.3,
    fontWeight: "600",
  },
  txnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 13,
    paddingHorizontal: 18,
    marginBottom: 9,
    shadowColor: "#185a9d22",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    width: width - 48, // To match padding in container
  },
  txnTitle: {
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 15,
  },
  txnDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },
  txnAmount: {
    fontWeight: "bold",
    fontSize: 17,
  },
});
