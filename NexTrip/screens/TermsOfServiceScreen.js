import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Sample TOS text – Replace with your actual terms!
const terms = [
  {
    heading: "1. Acceptance of Terms",
    body: `By using NexTrip, you agree to comply with and be legally bound by these terms and conditions. If you do not agree, please do not use the app.`,
  },
  {
    heading: "2. User Accounts",
    body: `You must provide accurate information when creating your account and keep it updated. You are responsible for maintaining your account security.`,
  },
  {
    heading: "3. Ride Booking and Payments",
    body: `All rides must be booked through the app. Payments are processed securely. NexTrip is not responsible for direct transactions outside the platform.`,
  },
  {
    heading: "4. Conduct and Safety",
    body: `All users agree to behave respectfully and follow local laws. Abusive, fraudulent, or unsafe conduct may result in account suspension or removal.`,
  },
  {
    heading: "5. Data Privacy",
    body: `We collect and use your information as outlined in our Privacy Policy. By using NexTrip, you consent to this use.`,
  },
  {
    heading: "6. Changes to Terms",
    body: `NexTrip reserves the right to update these terms at any time. Continued use of the app means you accept the updated terms.`,
  },
  {
    heading: "7. Contact Us",
    body: `For any questions about these terms, contact us at support@nextrip.com.`,
  },
];

export default function TermsOfServiceScreen() {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <MaterialIcons name="gavel" size={28} color="#43cea2" />
          <Text style={styles.title}>Terms & Conditions</Text>
        </View>
        {terms.map((section, i) => (
          <View key={i} style={styles.section}>
            <Text style={styles.heading}>{section.heading}</Text>
            <Text style={styles.body}>{section.body}</Text>
          </View>
        ))}
        <Text style={styles.lastUpdated}>Last updated: June 2025</Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    paddingTop: 35,
    paddingHorizontal: 18,
    paddingBottom: 34,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 13,
    letterSpacing: 1,
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16.3,
    marginBottom: 2,
  },
  body: {
    color: "#fff",
    fontSize: 14.5,
    lineHeight: 22,
    opacity: 0.93,
  },
  lastUpdated: {
    color: "#e7f9f4",
    fontSize: 13,
    marginTop: 24,
    alignSelf: "center",
    opacity: 0.8,
  },
});
