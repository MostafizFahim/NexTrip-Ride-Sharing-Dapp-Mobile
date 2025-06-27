import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const faqs = [
  {
    question: "How do I book a ride?",
    answer: "Select 'Book Ride', enter your pickup and drop-off, and confirm.",
  },
  {
    question: "How do I become a driver?",
    answer:
      "Go to 'Become a Driver' on the home page and fill out your details.",
  },
  {
    question: "How do I pay for my ride?",
    answer:
      "You can pay by cash or securely through the app using digital payment.",
  },
  {
    question: "What if I have an issue during my ride?",
    answer: "Contact support anytime from the Help screen.",
  },
];

export default function FAQScreen({ navigation }) {
  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        {faqs.map((item, idx) => (
          <View style={styles.card} key={idx}>
            <View style={styles.questionRow}>
              <MaterialIcons name="help-outline" size={22} color="#43cea2" />
              <Text style={styles.question}>{item.question}</Text>
            </View>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backBtnText}>Back to Help</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 36,
    marginTop: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 18,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: "98%",
    marginBottom: 16,
    padding: 18,
    shadowColor: "#185a9d44",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  questionRow: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  question: {
    fontWeight: "700",
    color: "#185a9d",
    fontSize: 16,
    marginLeft: 8,
  },
  answer: { color: "#444", fontSize: 15, marginLeft: 2 },
  backBtn: {
    marginTop: 18,
    backgroundColor: "#43cea2",
    borderRadius: 12,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  backBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
