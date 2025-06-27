import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
// import useDriverProfile from "../components/hooks/useDriverProfile"; // for real context

const { width } = Dimensions.get("window");

// Dummy local addVehicle (swap for context/hook)
function useLocalVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const addVehicle = async (vehicle) =>
    setVehicles((prev) => [vehicle, ...prev]);
  return { vehicles, addVehicle };
}

export default function AddVehicleScreen({ navigation }) {
  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    color: "",
    plate: "",
    year: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Replace with your context/hook in production
  const { addVehicle: addLocalVehicle } = useLocalVehicles();

  const handleSubmit = async () => {
    setError("");
    if (
      !vehicle.brand ||
      !vehicle.model ||
      !vehicle.color ||
      !vehicle.plate ||
      !vehicle.year
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (
      !/^\d{4}$/.test(vehicle.year) ||
      Number(vehicle.year) < 1980 ||
      Number(vehicle.year) > new Date().getFullYear() + 1
    ) {
      setError("Please enter a valid year.");
      return;
    }
    setSubmitting(true);
    // Save locally (or with context/API)
    await addLocalVehicle({
      ...vehicle,
      created: new Date().toISOString(),
    });
    setSubmitting(false);
    setVehicle({
      brand: "",
      model: "",
      color: "",
      plate: "",
      year: "",
    });
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Add Vehicle</Text>
        {error ? (
          <Text style={{ color: "#b71c1c", marginBottom: 7 }}>{error}</Text>
        ) : null}

        <Text style={styles.label}>Brand</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Toyota"
          placeholderTextColor="#888"
          value={vehicle.brand}
          onChangeText={(brand) => setVehicle((v) => ({ ...v, brand }))}
          editable={!submitting}
        />

        <Text style={styles.label}>Model</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Prius"
          placeholderTextColor="#888"
          value={vehicle.model}
          onChangeText={(model) => setVehicle((v) => ({ ...v, model }))}
          editable={!submitting}
        />

        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. White"
          placeholderTextColor="#888"
          value={vehicle.color}
          onChangeText={(color) => setVehicle((v) => ({ ...v, color }))}
          editable={!submitting}
        />

        <Text style={styles.label}>Plate Number</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. DHA-1234"
          placeholderTextColor="#888"
          value={vehicle.plate}
          onChangeText={(plate) => setVehicle((v) => ({ ...v, plate }))}
          editable={!submitting}
        />

        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2023"
          placeholderTextColor="#888"
          value={vehicle.year}
          onChangeText={(year) => setVehicle((v) => ({ ...v, year }))}
          keyboardType="numeric"
          editable={!submitting}
          maxLength={4}
        />

        <TouchableOpacity
          style={styles.saveBtn}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveBtnGradient}
          >
            <MaterialIcons name="add-circle" size={22} color="#fff" />
            <Text style={styles.saveBtnText}>
              {submitting ? "Adding..." : "Add Vehicle"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
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
  label: {
    color: "#185a9d",
    alignSelf: "flex-start",
    fontWeight: "600",
    marginTop: 11,
    marginBottom: 5,
    marginLeft: 7,
    fontSize: 14,
  },
  input: {
    width: width > 400 ? 340 : "98%",
    height: 46,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    color: "#222",
  },
  saveBtn: {
    width: width > 400 ? 340 : "98%",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 23,
  },
  saveBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 7,
    letterSpacing: 1,
  },
});
