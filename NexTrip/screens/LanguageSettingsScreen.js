import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy language options (expand as you localize)
const languages = [
  { key: "en", label: "English", icon: "flag-usa" },
  { key: "bn", label: "বাংলা (Bangla)", icon: "flag" },
  { key: "hi", label: "हिंदी (Hindi)", icon: "flag" },
  // Add more as needed
];

export default function LanguageSettingsScreen() {
  const [selected, setSelected] = useState("en");

  const handleChange = (langKey) => {
    setSelected(langKey);
    // TODO: Integrate with i18n, redux, or backend as needed
    Alert.alert("Language changed", "App will reload with your new language.");
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Choose Language</Text>
        <View style={styles.listCard}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.key}
              style={[
                styles.optionRow,
                selected === lang.key && styles.optionRowSelected,
              ]}
              onPress={() => handleChange(lang.key)}
            >
              <FontAwesome5
                name={lang.icon}
                size={19}
                color={selected === lang.key ? "#43cea2" : "#185a9d"}
                style={{ marginRight: 15 }}
              />
              <Text
                style={[
                  styles.optionText,
                  selected === lang.key && { color: "#43cea2" },
                ]}
              >
                {lang.label}
              </Text>
              <MaterialIcons
                name={
                  selected === lang.key
                    ? "radio-button-checked"
                    : "radio-button-unchecked"
                }
                size={21}
                color={selected === lang.key ? "#43cea2" : "#bbb"}
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.note}>
          More languages coming soon. Contact us to request a language!
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 35,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 16,
    letterSpacing: 1,
  },
  listCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: width > 400 ? 350 : "97%",
    padding: 12,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    paddingHorizontal: 8,
  },
  optionRowSelected: {
    backgroundColor: "#e7f9f4",
    borderRadius: 10,
  },
  optionText: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 15.3,
  },
  note: {
    color: "#fff",
    fontSize: 13.5,
    marginTop: 9,
    opacity: 0.85,
    textAlign: "center",
  },
});
