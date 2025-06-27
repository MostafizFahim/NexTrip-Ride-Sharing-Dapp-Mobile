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

// Dummy users (replace with backend data)
const initialUsers = [
  {
    id: "u1",
    name: "Mehedi Hasan",
    email: "mehedi@nextrip.com",
    phone: "+8801123456789",
    role: "Driver",
    status: "Active",
    approved: true,
    banned: false,
  },
  {
    id: "u2",
    name: "Sadia Anjum",
    email: "sadia@nextrip.com",
    phone: "+8801456743567",
    role: "Passenger",
    status: "Pending",
    approved: false,
    banned: false,
  },
  {
    id: "u3",
    name: "Rakibul Hasan",
    email: "rakibul@nextrip.com",
    phone: "+8801999484444",
    role: "Driver",
    status: "Banned",
    approved: true,
    banned: true,
  },
  // Add more users...
];

export default function UserManagementScreen() {
  const [users, setUsers] = useState(initialUsers);

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, approved: true, status: "Active" } : u
      )
    );
    Alert.alert("User Approved");
  };

  const handleBan = (id) => {
    Alert.alert("Confirm Ban", "Are you sure you want to ban this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Ban",
        style: "destructive",
        onPress: () =>
          setUsers((prev) =>
            prev.map((u) =>
              u.id === id ? { ...u, banned: true, status: "Banned" } : u
            )
          ),
      },
    ]);
  };

  const handleUnban = (id) => {
    Alert.alert("Confirm Unban", "Are you sure you want to unban this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Unban",
        onPress: () =>
          setUsers((prev) =>
            prev.map((u) =>
              u.id === id ? { ...u, banned: false, status: "Active" } : u
            )
          ),
      },
    ]);
  };

  const handleRemove = (id) => {
    Alert.alert(
      "Confirm Remove",
      "Are you sure you want to remove this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setUsers((prev) => prev.filter((u) => u.id !== id)),
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>User Management</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.header, { flex: 1.5 }]}>Name</Text>
          <Text style={[styles.header, { flex: 1.3 }]}>Role</Text>
          <Text style={[styles.header, { flex: 1 }]}>Status</Text>
          <Text style={[styles.header, { flex: 1.5 }]}>Actions</Text>
        </View>
        {users.map((user) => (
          <View style={styles.userRow} key={user.id}>
            <View style={{ flex: 1.5 }}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userContact}>{user.email}</Text>
              <Text style={styles.userContact}>{user.phone}</Text>
            </View>
            <Text
              style={[
                styles.userRole,
                user.role === "Driver"
                  ? { color: "#185a9d" }
                  : { color: "#43cea2" },
                { flex: 1.3 },
              ]}
            >
              {user.role}
            </Text>
            <Text
              style={[
                styles.userStatus,
                user.status === "Active"
                  ? { color: "#00c853" }
                  : user.status === "Pending"
                  ? { color: "#ffab00" }
                  : { color: "#d32f2f" },
                { flex: 1 },
              ]}
            >
              {user.status}
            </Text>
            <View style={[styles.actionCell, { flex: 1.5 }]}>
              {!user.approved && (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleApprove(user.id)}
                >
                  <MaterialIcons name="check" size={17} color="#43cea2" />
                </TouchableOpacity>
              )}
              {!user.banned ? (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleBan(user.id)}
                >
                  <MaterialIcons name="block" size={17} color="#d32f2f" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleUnban(user.id)}
                >
                  <MaterialIcons name="lock-open" size={17} color="#00c853" />
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => handleRemove(user.id)}
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
    paddingHorizontal: 9,
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
    width: width > 400 ? 375 : "98%",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#e7f9f4",
    marginBottom: 6,
    marginTop: 4,
  },
  header: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14.5,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: width > 400 ? 375 : "98%",
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 7,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  userName: { color: "#222", fontWeight: "bold", fontSize: 15 },
  userContact: { color: "#888", fontSize: 12.7 },
  userRole: {
    fontWeight: "bold",
    fontSize: 13.5,
    marginLeft: 5,
  },
  userStatus: {
    fontWeight: "bold",
    fontSize: 13.5,
    marginLeft: 7,
  },
  actionCell: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
  },
  actionBtn: {
    backgroundColor: "#e7f9f4",
    borderRadius: 7,
    padding: 7,
    marginHorizontal: 3,
  },
});
