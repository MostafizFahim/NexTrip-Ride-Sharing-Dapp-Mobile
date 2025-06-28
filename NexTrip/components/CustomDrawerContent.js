// components/CustomDrawerContent.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useUser } from "./UserContext"; // Adjust path if needed

export default function CustomDrawerContent(props) {
  const { user } = useUser();
  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.drawerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.drawerHeader}>
        <View style={styles.avatarBox}>
          <Feather name="user" size={32} color="#fff" />
        </View>
        <Text style={styles.drawerName}>{user?.name || "Admin"}</Text>
        <Text style={styles.drawerRole}>
          {user?.role?.toUpperCase() || "ADMIN"}
        </Text>
      </View>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1, paddingTop: 0 }}
        style={{ backgroundColor: "transparent" }}
      >
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  drawerGradient: {
    flex: 1,
    paddingTop: 0,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    overflow: "hidden",
  },
  drawerHeader: {
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 14,
    marginBottom: 8,
    backgroundColor: "rgba(255,255,255,0.09)",
    borderTopRightRadius: 25,
  },
  avatarBox: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(67,206,162,0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
    borderWidth: 2,
    borderColor: "#fff",
  },
  drawerName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    letterSpacing: 1,
  },
  drawerRole: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 13,
    opacity: 0.8,
  },
});
