import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const appVersion = "1.0.0";
const buildNumber = "20250627";
const company = "NexTrip Technologies";
const website = "https://nextrip.com";
const copyright = "© 2025 NexTrip. All rights reserved.";

export default function AppInfoScreen() {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerRow}>
            <Ionicons name="information-circle" size={29} color="#43cea2" />
            <Text style={styles.title}>About NexTrip</Text>
          </View>

          <View style={styles.infoCard}>
            <InfoRow
              icon={
                <FontAwesome5 name="mobile-alt" size={19} color="#185a9d" />
              }
              label="App Version"
              value={appVersion}
            />
            <InfoRow
              icon={<MaterialIcons name="code" size={20} color="#43cea2" />}
              label="Build Number"
              value={buildNumber}
            />
            <InfoRow
              icon={<FontAwesome5 name="building" size={18} color="#185a9d" />}
              label="Company"
              value={company}
            />
            <InfoRow
              icon={<MaterialIcons name="public" size={20} color="#43cea2" />}
              label="Website"
              value={website}
              isLink
            />
          </View>

          <Text style={styles.desc}>
            NexTrip is a next-gen ride-sharing app powered by blockchain &
            Hyperledger. Our mission is to provide a secure, transparent, and
            efficient urban mobility solution.
          </Text>

          <Text style={styles.copyright}>{copyright}</Text>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function InfoRow({ icon, label, value, isLink }) {
  return (
    <View style={styles.infoRow}>
      {icon}
      <Text style={styles.label}>{label}</Text>
      {isLink ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(value)}
          accessible
          accessibilityRole="link"
          accessibilityLabel={`Open website ${value}`}
        >
          <Text
            style={[
              styles.value,
              { textDecorationLine: "underline", color: "#185a9d" },
            ]}
          >
            {value}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? 38 : 14,
    paddingBottom: 34,
    paddingHorizontal: 18,
    minHeight: "100%",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 13,
    letterSpacing: 1,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width > 400 ? 355 : "98%",
    padding: 15,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 9,
    paddingHorizontal: 3,
  },
  label: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 15.2,
    marginLeft: 12,
    flex: 1,
  },
  value: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 8,
  },
  desc: {
    color: "#fff",
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 7,
    marginBottom: 24,
    opacity: 0.95,
  },
  copyright: {
    color: "#e7f9f4",
    fontSize: 13,
    opacity: 0.85,
    textAlign: "center",
    marginTop: 9,
  },
});
