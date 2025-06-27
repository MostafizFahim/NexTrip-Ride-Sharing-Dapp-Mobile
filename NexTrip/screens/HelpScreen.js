import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons, Feather } from "@expo/vector-icons";

const ICON_SIZE = 25;
const COLORS = {
  primary: "#43cea2",
  secondary: "#185a9d",
};

export default function HelpScreen({ navigation }) {
  const openEmail = () =>
    Linking.openURL("mailto:support@nextrip.com").catch(() =>
      Alert.alert("Could not open email app.")
    );

  const openCall = () =>
    Linking.openURL("tel:+8801XXXXXXXXX").catch(() =>
      Alert.alert("Could not initiate call.")
    );

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.subtitle}>
          We're here to help you with any issues or questions you have.
        </Text>

        <View style={styles.supportCard}>
          <Feather
            name="mail"
            size={ICON_SIZE}
            color={COLORS.secondary}
            accessibilityLabel="Email icon"
          />
          <Text style={styles.cardTitle}>Email Us</Text>
          <Text style={styles.cardText}>support@nextrip.com</Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={openEmail}
            accessibilityRole="button"
            accessibilityLabel="Send Email"
          >
            <Text style={styles.cardButtonText}>Send Email</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.supportCard}>
          <MaterialIcons
            name="call"
            size={ICON_SIZE}
            color={COLORS.primary}
            accessibilityLabel="Call icon"
          />
          <Text style={styles.cardTitle}>Call Support</Text>
          <Text style={styles.cardText}>+880-1XXXXXXXXX</Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={openCall}
            accessibilityRole="button"
            accessibilityLabel="Call Now"
          >
            <Text style={styles.cardButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.supportCard}>
          <Ionicons
            name="help-circle"
            size={ICON_SIZE}
            color={COLORS.secondary}
            accessibilityLabel="FAQ icon"
          />
          <Text style={styles.cardTitle}>FAQs & Guides</Text>
          <Text style={styles.cardText}>
            Common questions answered for you.
          </Text>
          <TouchableOpacity
            style={styles.cardButton}
            onPress={() => navigation.navigate("Faq")}
            accessibilityRole="button"
            accessibilityLabel="See FAQs"
          >
            <Text style={styles.cardButtonText}>See FAQs</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 26,
    alignItems: "center",
    paddingBottom: 50, // increased for better bottom spacing
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 7,
    textShadowColor: "#185a9d55",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    color: "#f1f1f1",
    fontSize: 15,
    marginBottom: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  supportCard: {
    width: "97%",
    backgroundColor: "#fff",
    borderRadius: 17,
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 18,
    shadowColor: "#185a9d99",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: 7,
  },
  cardText: {
    color: "#444",
    fontSize: 15,
    marginBottom: 11,
    textAlign: "center",
  },
  cardButton: {
    marginTop: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    alignSelf: "center",
  },
  cardButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },
});
