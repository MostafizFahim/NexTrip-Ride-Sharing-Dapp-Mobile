import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function LegalPrivacyPolicyScreen({ navigation }) {
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Privacy Policy & Terms</Text>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
        >
          <Text style={styles.sectionTitle}>Your Privacy Matters</Text>
          <Text style={styles.text}>
            NexTrip is committed to protecting your privacy and data security.
            This Privacy Policy outlines how we collect, use, and safeguard your
            personal information when you use our blockchain-based ride-sharing
            platform.
          </Text>

          <Text style={styles.sectionTitle}>Information Collection</Text>
          <Text style={styles.text}>
            We collect information you provide when registering, booking rides,
            and using the app—such as your name, contact info, payment details,
            and location data (with your permission). For blockchain operations,
            public addresses and transaction records are stored transparently on
            the distributed ledger.
          </Text>

          <Text style={styles.sectionTitle}>Use of Information</Text>
          <Text style={styles.text}>
            Your information is used to:
            {"\n"}• Facilitate ride bookings and payments
            {"\n"}• Verify your identity and improve security
            {"\n"}• Provide customer support and app features
            {"\n"}• Comply with legal and regulatory requirements
          </Text>

          <Text style={styles.sectionTitle}>Blockchain Transparency</Text>
          <Text style={styles.text}>
            Key ride and payment transactions are recorded immutably on the
            blockchain. While these records are public, your sensitive data
            (phone, card number, etc.) is never stored on-chain.
          </Text>

          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.text}>
            We use strong encryption and best practices to protect your data.
            Access to your account and ride history is always protected by
            secure authentication.
          </Text>

          <Text style={styles.sectionTitle}>Third-Party Services</Text>
          <Text style={styles.text}>
            NexTrip may use trusted third-party partners for payments, mapping,
            and analytics, each with their own privacy policies.
          </Text>

          <Text style={styles.sectionTitle}>Your Choices</Text>
          <Text style={styles.text}>
            You can view, update, or delete your account at any time. You may
            also opt-out of promotional communications or location tracking in
            your device settings.
          </Text>

          <Text style={styles.sectionTitle}>Policy Updates</Text>
          <Text style={styles.text}>
            We may update this policy as the app evolves. Any changes will be
            clearly communicated within the app.
          </Text>

          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.text}>
            For questions about privacy, please contact our team at
            support@nextrip.com.
          </Text>
        </ScrollView>

        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          accessibilityHint="Navigates to the previous screen"
        >
          <MaterialIcons name="chevron-left" size={22} color="#43cea2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 50 : 36,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 8,
    letterSpacing: 1,
  },
  scroll: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width > 400 ? 360 : "98%",
    paddingHorizontal: 17,
    elevation: 7,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 7 },
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 50,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 14,
    marginBottom: 6,
  },
  text: {
    color: "#444",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 10,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 3,
    alignSelf: "flex-start",
  },
  backText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
});
