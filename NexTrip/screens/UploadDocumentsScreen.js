import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Document fields for easy mapping/extension
const DOCUMENTS = [
  { key: "license", label: "Driving License" },
  { key: "nid", label: "NID / Passport" },
  { key: "vehiclePaper", label: "Vehicle Papers" },
];

export default function UploadDocumentsScreen({ navigation }) {
  const [uploaded, setUploaded] = useState({
    license: false,
    nid: false,
    vehiclePaper: false,
  });

  const handleUpload = (docKey) => {
    setUploaded((prev) => ({ ...prev, [docKey]: true }));
    Alert.alert(
      "Success!",
      `${DOCUMENTS.find((d) => d.key === docKey).label} uploaded.`
    );
  };

  const handleSubmit = () => {
    if (!uploaded.license || !uploaded.nid || !uploaded.vehiclePaper) {
      Alert.alert("Incomplete", "Please upload all required documents.");
      return;
    }
    Alert.alert("Submitted!", "All documents uploaded successfully.", [
      {
        text: "Continue",
        onPress: () => navigation.replace("DriverDashboard"),
      },
    ]);
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Upload Documents</Text>

        {DOCUMENTS.map((doc) => (
          <DocUploadCard
            key={doc.key}
            label={doc.label}
            uploaded={uploaded[doc.key]}
            onPress={() => handleUpload(doc.key)}
          />
        ))}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitBtnGradient}
          >
            <MaterialIcons name="check-circle" size={22} color="#fff" />
            <Text style={styles.submitBtnText}>Submit Documents</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

function DocUploadCard({ label, uploaded, onPress }) {
  return (
    <View style={styles.docCard}>
      <Feather
        name={uploaded ? "check-circle" : "upload"}
        size={25}
        color={uploaded ? "#43cea2" : "#185a9d"}
      />
      <Text style={styles.docLabel}>{label}</Text>
      <TouchableOpacity
        style={[styles.docBtn, uploaded && { backgroundColor: "#e7f9f4" }]}
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          uploaded ? `${label} already uploaded` : `Upload ${label}`
        }
        disabled={uploaded}
      >
        <Text style={[styles.docBtnText, uploaded && { color: "#43cea2" }]}>
          {uploaded ? "Uploaded" : "Upload"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    padding: 24,
    paddingBottom: 50,
    marginTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 27,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 19,
    textShadowColor: "#185a9d44",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  docCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 15,
    width: width > 400 ? 350 : "97%",
    shadowColor: "#185a9d22",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
    justifyContent: "space-between",
  },
  docLabel: {
    color: "#185a9d",
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
  },
  docBtn: {
    backgroundColor: "#43cea2",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  docBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },
  submitBtn: {
    width: width > 400 ? 340 : "97%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 30,
  },
  submitBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 7,
    letterSpacing: 1,
  },
});
