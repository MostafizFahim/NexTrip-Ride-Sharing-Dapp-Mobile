import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
// import Constants from "expo-constants"; // for app version if needed

const FEATURES = [
  {
    icon: <MaterialIcons name="verified-user" size={20} color="#43cea2" />,
    label: "Blockchain-secured rides & payments",
  },
  {
    icon: <MaterialIcons name="directions-car" size={20} color="#185a9d" />,
    label: "Real-time location & live ride tracking",
  },
  {
    icon: <MaterialIcons name="support-agent" size={20} color="#fbc02d" />,
    label: "24/7 customer support",
  },
];

const TEAM = [
  { name: "Rayhan Ferdous Srejon", role: "Full Stack Developer" },
  { name: "Mostafiz", role: "Frontend Developer" },
  { name: "Sk. Md. Shadman Ifaz", role: "Backend & Blockchain" },
];

export default function AboutScreen() {
  // const version = Constants.manifest.version || "v1.0.0";
  const version = "v1.0.0";
  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoBox}>
          <Image
            source={require("../assets/logo12.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>About NexTrip</Text>
        <Text style={styles.version}>{version}</Text>
        <Text style={styles.text}>
          NexTrip is a modern, privacy-focused ride-sharing platform built for
          Bangladesh. Our mission is to connect riders and drivers in a safe,
          affordable, and secure way.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          {FEATURES.map((f, i) => (
            <FeatureRow key={i} icon={f.icon} label={f.label} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Team</Text>
          {TEAM.map((m, i) => (
            <TeamMemberRow key={i} name={m.name} role={m.role} />
          ))}
        </View>
        <Text style={styles.footer}>
          © {new Date().getFullYear()} NexTrip. All rights reserved.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

function FeatureRow({ icon, label }) {
  return (
    <View style={styles.row}>
      {icon}
      <Text style={styles.rowText}>{label}</Text>
    </View>
  );
}

function TeamMemberRow({ name, role }) {
  return (
    <View style={{ marginBottom: 7 }}>
      <Text style={styles.rowText}>
        <Text style={{ fontWeight: "bold" }}>{name}</Text>
        {"  "}
        <Text style={{ color: "#888" }}>({role})</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 26,
    alignItems: "center",
    paddingBottom: 40,
    marginTop: 30,
  },
  logoBox: {
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: "#fff",
    elevation: 5,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 3,
    letterSpacing: 1.2,
  },
  version: {
    color: "#e0e0e0",
    fontSize: 13,
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 18,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 23,
  },
  section: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 17,
    paddingVertical: 19,
    paddingHorizontal: 20,
    marginBottom: 18,
    shadowColor: "#185a9d99",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 7,
    elevation: 2,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 11,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  rowText: {
    color: "#222",
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
  },
  footer: {
    color: "#f1f1f1",
    fontSize: 14,
    marginTop: 14,
    textAlign: "center",
  },
});
