import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy driver data (replace with API data)
const initialDrivers = [
  {
    id: "d1",
    name: "Mehedi Hasan",
    phone: "+8801123456789",
    email: "mehedi@nextrip.com",
    car: "Toyota Prius",
    color: "White",
    number: "DHA-1234",
    status: "Active",
    approved: true,
    banned: false,
    joinDate: "2023-12-11",
    documents: [
      { label: "Driving License", status: "Approved" },
      { label: "Vehicle Registration", status: "Approved" },
      { label: "NID", status: "Pending" },
    ],
  },
  {
    id: "d2",
    name: "Rakibul Hasan",
    phone: "+8801999484444",
    email: "rakibul@nextrip.com",
    car: "Honda Grace",
    color: "Blue",
    number: "DHA-5678",
    status: "Pending",
    approved: false,
    banned: false,
    joinDate: "2024-01-10",
    documents: [
      { label: "Driving License", status: "Pending" },
      { label: "Vehicle Registration", status: "Approved" },
      { label: "NID", status: "Approved" },
    ],
  },
  {
    id: "d3",
    name: "Naimur Rahman",
    phone: "+8801777000888",
    email: "naimur@nextrip.com",
    car: "Toyota Aqua",
    color: "Silver",
    number: "DHA-2211",
    status: "Banned",
    approved: true,
    banned: true,
    joinDate: "2024-02-02",
    documents: [
      { label: "Driving License", status: "Rejected" },
      { label: "Vehicle Registration", status: "Approved" },
      { label: "NID", status: "Approved" },
    ],
  },
  // Add more drivers as needed
];

export default function DriverManagementScreen() {
  const [drivers, setDrivers] = useState(initialDrivers);

  const handleApprove = (id) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, approved: true, status: "Active" } : d
      )
    );
    Alert.alert("Driver Approved");
  };

  const handleBan = (id) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, banned: true, status: "Banned" } : d
      )
    );
    Alert.alert("Driver Banned");
  };

  const handleUnban = (id) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, banned: false, status: "Active" } : d
      )
    );
    Alert.alert("Driver Unbanned");
  };

  const handleRemove = (id) => {
    setDrivers((prev) => prev.filter((d) => d.id !== id));
    Alert.alert("Driver Removed");
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Driver Management</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.header, { flex: 1.8 }]}>Driver</Text>
          <Text style={[styles.header, { flex: 1.5 }]}>Vehicle</Text>
          <Text style={[styles.header, { flex: 1 }]}>Status</Text>
          <Text style={[styles.header, { flex: 2 }]}>Docs</Text>
          <Text style={[styles.header, { flex: 1.3 }]}>Actions</Text>
        </View>
        {drivers.map((driver) => (
          <View style={styles.driverRow} key={driver.id}>
            <View style={{ flex: 1.8 }}>
              <Text style={styles.driverName}>{driver.name}</Text>
              <Text style={styles.driverContact}>{driver.email}</Text>
              <Text style={styles.driverContact}>{driver.phone}</Text>
              <Text style={styles.driverContact}>Joined {driver.joinDate}</Text>
            </View>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.vehicleText}>
                {driver.car} • {driver.color}
              </Text>
              <Text style={styles.vehicleNum}>{driver.number}</Text>
            </View>
            <Text
              style={[
                styles.driverStatus,
                driver.status === "Active"
                  ? { color: "#00c853" }
                  : driver.status === "Pending"
                  ? { color: "#ffab00" }
                  : { color: "#d32f2f" },
                { flex: 1 },
              ]}
            >
              {driver.status}
            </Text>
            <View style={[styles.docsCell, { flex: 2 }]}>
              {driver.documents.map((doc, i) => (
                <Text
                  key={i}
                  style={[
                    styles.docStatus,
                    doc.status === "Approved"
                      ? { color: "#43cea2" }
                      : doc.status === "Pending"
                      ? { color: "#ffab00" }
                      : doc.status === "Rejected"
                      ? { color: "#d32f2f" }
                      : { color: "#888" },
                  ]}
                >
                  {doc.label}: {doc.status}
                </Text>
              ))}
            </View>
            <View style={[styles.actionCell, { flex: 1.3 }]}>
              {!driver.approved && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleApprove(driver.id)}
                >
                  <MaterialIcons name="check" size={17} color="#43cea2" />
                </TouchableOpacity>
              )}
              {!driver.banned ? (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleBan(driver.id)}
                >
                  <MaterialIcons name="block" size={17} color="#d32f2f" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleUnban(driver.id)}
                >
                  <MaterialIcons name="lock-open" size={17} color="#00c853" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleRemove(driver.id)}
              >
                <MaterialIcons name="delete" size={17} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "flex-start",
    paddingTop: 34,
    paddingHorizontal: 7,
    paddingBottom: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 13,
    letterSpacing: 1,
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
  },
  headerRow: {
    flexDirection: "row",
    width: width > 400 ? 390 : "98%",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderColor: "#e7f9f4",
    marginBottom: 7,
    marginTop: 2,
  },
  header: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14.4,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    width: width > 400 ? 390 : "98%",
    borderRadius: 13,
    paddingVertical: 13,
    paddingHorizontal: 7,
    marginBottom: 9,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  driverName: { color: "#222", fontWeight: "bold", fontSize: 15.2 },
  driverContact: { color: "#888", fontSize: 12.3 },
  vehicleText: { color: "#185a9d", fontWeight: "600", fontSize: 14.2 },
  vehicleNum: { color: "#43cea2", fontSize: 13 },
  driverStatus: {
    fontWeight: "bold",
    fontSize: 13.6,
    marginLeft: 8,
    marginTop: 3,
  },
  docsCell: { marginLeft: 8 },
  docStatus: {
    fontWeight: "bold",
    fontSize: 12.5,
    marginBottom: 1,
  },
  actionCell: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 6,
    marginTop: 2,
  },
  actionBtn: {
    backgroundColor: "#e7f9f4",
    borderRadius: 7,
    padding: 7,
    marginHorizontal: 3,
  },
});
