import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy admin stats
const stats = [
  {
    label: "Total Rides",
    value: 1345,
    icon: "directions-car",
    color: "#185a9d",
  },
  {
    label: "Total Revenue",
    value: "৳3,22,000",
    icon: "attach-money",
    color: "#43cea2",
  },
  {
    label: "Active Drivers",
    value: 221,
    icon: "supervisor-account",
    color: "#00c853",
  },
  { label: "Active Passengers", value: 890, icon: "person", color: "#fbc02d" },
];

const quickActions = [
  {
    icon: <Feather name="users" size={22} color="#185a9d" />,
    label: "Users",
    onPress: (navigation) => navigation.navigate("UserManagement"),
  },
  {
    icon: <FontAwesome5 name="clipboard-list" size={21} color="#43cea2" />,
    label: "Rides",
    onPress: (navigation) => navigation.navigate("RideHistory"),
  },
  {
    icon: <Feather name="settings" size={22} color="#00c853" />,
    label: "Settings",
    onPress: (navigation) => navigation.navigate("Settings"),
  },
];

export default function AdminDashboardScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#185a9d", "#43cea2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Admin Dashboard</Text>
        <View style={styles.statsGrid}>
          {stats.map((item, i) => (
            <StatsCard key={i} {...item} />
          ))}
        </View>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionRow}>
          {quickActions.map((a, i) => (
            <ActionButton key={i} {...a} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

function StatsCard({ icon, label, value, color }) {
  return (
    <View style={[styles.statsCard, { shadowColor: color + "90" }]}>
      <MaterialIcons
        name={icon}
        size={36}
        color={color}
        style={{ marginBottom: 6 }}
      />
      <Text style={[styles.statsValue, { color }]}>{value}</Text>
      <Text style={styles.statsLabel}>{label}</Text>
    </View>
  );
}

function ActionButton({ icon, label, onPress, navigation }) {
  return (
    <TouchableOpacity
      style={styles.actionBtn}
      onPress={() => onPress(navigation)}
    >
      {icon}
      <Text style={styles.actionBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  content: { padding: 20, paddingBottom: 36 },
  heading: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginTop: 30,
    marginBottom: 15,
    textShadowColor: "#185a9d99",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  statsCard: {
    width: width > 700 ? "22%" : "47%",
    backgroundColor: "#fff",
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 18,
    elevation: 4,
    shadowOpacity: 0.16,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 4 },
  },
  statsValue: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 2,
  },
  statsLabel: {
    color: "#444",
    fontWeight: "700",
    fontSize: 14,
    letterSpacing: 0.2,
  },
  sectionTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 16,
    marginBottom: 12,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionBtn: {
    backgroundColor: "#fff",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: "32%",
    elevation: 3,
    shadowColor: "#43cea299",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  actionBtnText: {
    color: "#185a9d",
    fontWeight: "700",
    marginTop: 6,
    fontSize: 14,
    letterSpacing: 0.5,
  },
});
