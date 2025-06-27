import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const notifications = [
  {
    id: "1",
    type: "ride",
    title: "Your ride is arriving soon!",
    body: "Your driver, Mehedi Hasan, is 2 minutes away.",
    date: "2025-06-26 18:32",
    read: false,
  },
  {
    id: "2",
    type: "promo",
    title: "Get 30% Off Your Next Ride",
    body: "Use code NEX30 on your next booking. Valid until June 30.",
    date: "2025-06-25 12:13",
    read: true,
  },
  {
    id: "3",
    type: "info",
    title: "App Update",
    body: "We’ve improved performance and fixed bugs in the latest version.",
    date: "2025-06-23 10:00",
    read: true,
  },
];

export default function NotificationsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={[styles.card, !item.read && styles.unreadCard]}>
      <View style={styles.iconBox}>
        {item.type === "ride" && (
          <MaterialIcons name="directions-car" size={22} color="#185a9d" />
        )}
        {item.type === "promo" && (
          <FontAwesome5 name="percentage" size={18} color="#43cea2" />
        )}
        {item.type === "info" && (
          <MaterialIcons name="info" size={22} color="#b39ddb" />
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Notifications</Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={() => alert("All notifications cleared!")}
        >
          <Text style={styles.clearBtnText}>Clear All</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    padding: 24,
    marginTop: 30,
  },
  header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 27,
    marginBottom: 16,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  list: {
    paddingBottom: 60,
  },
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 13,
    shadowColor: "#185a9d22",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 6,
    borderLeftColor: "#43cea2",
    backgroundColor: "#f6fffa",
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    marginTop: 4,
  },
  title: {
    fontWeight: "bold",
    color: "#185a9d",
    fontSize: 16,
    marginBottom: 3,
  },
  body: {
    color: "#444",
    fontSize: 14,
    marginBottom: 4,
  },
  date: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  clearBtn: {
    alignSelf: "center",
    backgroundColor: "#43cea2",
    borderRadius: 18,
    marginTop: 18,
    paddingVertical: 9,
    paddingHorizontal: 28,
    elevation: 2,
  },
  clearBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
