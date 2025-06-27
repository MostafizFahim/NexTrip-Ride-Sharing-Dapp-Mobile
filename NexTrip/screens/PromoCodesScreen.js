import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const codes = [
  {
    id: "1",
    code: "SUMMER20",
    desc: "20% off your next ride",
    valid: "Valid until 31 Jul",
  },
  {
    id: "2",
    code: "WELCOME50",
    desc: "৳50 discount for new users",
    valid: "Valid until 30 Sep",
  },
];

export default function PromoCodesScreen() {
  const [appliedCode, setAppliedCode] = useState(null);

  const applyCode = (code) => {
    if (appliedCode === code) {
      Alert.alert("Info", `Promo code "${code}" is already applied.`);
      return;
    }
    setAppliedCode(code);
    Alert.alert("Success", `Promo code "${code}" applied!`);
  };

  return (
    <LinearGradient colors={["#43cea2", "#185a9d"]} style={styles.bg}>
      <View style={styles.container}>
        <Text style={styles.title}>Promo Codes</Text>
        <FlatList
          data={codes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <MaterialIcons name="local-offer" size={24} color="#43cea2" />
              <View style={{ marginLeft: 13 }}>
                <Text style={styles.code}>{item.code}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.valid}>{item.valid}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.applyBtn,
                  appliedCode === item.code && styles.applyBtnDisabled,
                ]}
                onPress={() => applyCode(item.code)}
                disabled={appliedCode === item.code}
              >
                <Text style={styles.applyBtnText}>
                  {appliedCode === item.code ? "Applied" : "Apply"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, marginTop: 30, padding: 22 },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginBottom: 15,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 13,
    shadowColor: "#185a9d22",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  code: { color: "#185a9d", fontWeight: "bold", fontSize: 15 },
  desc: { color: "#444", fontSize: 14, marginTop: 3 },
  valid: { color: "#888", fontSize: 11, marginTop: 2 },
  applyBtn: {
    marginLeft: "auto",
    backgroundColor: "#43cea2",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 9,
  },
  applyBtnDisabled: {
    backgroundColor: "#a0d8c7",
  },
  applyBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
