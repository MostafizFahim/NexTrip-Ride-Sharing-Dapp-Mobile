import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
// import useWallet from "../components/hooks/useWallet"; // or useCards

const { width } = Dimensions.get("window");

// Dummy local card add; swap this for your wallet/cards hook
function useLocalCards() {
  const [cards, setCards] = useState([]);
  const addCard = async (card) => {
    setCards((prev) => [card, ...prev]);
  };
  return { cards, addCard };
}

export default function AddCardScreen({ navigation }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Swap this hook with your wallet/cards context!
  const { addCard } = useLocalCards();

  const handleSave = async () => {
    setError("");
    if (!cardNumber || !expiry || !cvv || !name) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\d{16,19}$/.test(cardNumber.replace(/\s/g, ""))) {
      setError("Invalid card number.");
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry must be MM/YY.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Invalid CVV.");
      return;
    }
    setSubmitting(true);
    // Save locally (or replace with API call)
    await addCard({
      cardNumber,
      expiry,
      cvv,
      name,
      added: new Date().toISOString(),
    });
    setSubmitting(false);
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setName("");
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Add Payment Card</Text>
          <View style={styles.cardIconWrap}>
            <FontAwesome name="credit-card" size={45} color="#43cea2" />
          </View>
          {error ? (
            <Text style={{ color: "#b71c1c", marginBottom: 10 }}>{error}</Text>
          ) : null}
          <View style={styles.inputRow}>
            <MaterialIcons name="payment" size={22} color="#185a9d" />
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              placeholderTextColor="#888"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={19}
              editable={!submitting}
            />
          </View>
          <View
            style={{ flexDirection: "row", width: width > 400 ? 330 : "96%" }}
          >
            <View style={[styles.inputRow, { flex: 1, marginRight: 6 }]}>
              <MaterialIcons name="date-range" size={20} color="#43cea2" />
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#888"
                value={expiry}
                onChangeText={setExpiry}
                keyboardType="numeric"
                maxLength={5}
                editable={!submitting}
              />
            </View>
            <View style={[styles.inputRow, { flex: 1, marginLeft: 6 }]}>
              <MaterialIcons name="lock" size={20} color="#185a9d" />
              <TextInput
                style={styles.input}
                placeholder="CVV"
                placeholderTextColor="#888"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry
                editable={!submitting}
              />
            </View>
          </View>
          <View style={styles.inputRow}>
            <MaterialIcons name="person" size={22} color="#43cea2" />
            <TextInput
              style={styles.input}
              placeholder="Cardholder Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              editable={!submitting}
            />
          </View>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleSave}
            disabled={submitting || !cardNumber || !expiry || !cvv || !name}
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.btnGradient}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.saveText}>
                {submitting ? "Saving..." : "Save Card"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingTop: 35,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    letterSpacing: 1,
  },
  cardIconWrap: {
    backgroundColor: "#fff",
    borderRadius: 32,
    padding: 14,
    marginBottom: 25,
    shadowColor: "#185a9d",
    shadowOpacity: 0.11,
    elevation: 7,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 7,
    marginBottom: 14,
    width: width > 400 ? 330 : "96%",
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
    paddingVertical: 6,
  },
  saveBtn: {
    width: width > 400 ? 220 : "90%",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 18,
  },
  btnGradient: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 15,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    letterSpacing: 0.9,
  },
});
