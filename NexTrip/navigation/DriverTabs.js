import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import DriverDashboardScreen from "../screens/DriverDashboardScreen";
import EarningsScreen from "../screens/EarningsScreen";
import MyRidesScreen from "../screens/MyRidesScreen";
import DriverProfileScreen from "../screens/DriverProfileScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

function CustomTabBarBackground() {
  return (
    <LinearGradient
      colors={["#185a9d", "#43cea2"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={StyleSheet.absoluteFill}
    />
  );
}

export default function DriverTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 13,
          letterSpacing: 0.1,
        },
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#185a9d",
          shadowOpacity: 0.14,
          shadowRadius: 10,
          height: 65,
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#D4F1FF",
        tabBarBackground: () => <CustomTabBarBackground />,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          } else if (route.name === "Dashboard") {
            return (
              <MaterialCommunityIcons
                name={focused ? "view-dashboard" : "view-dashboard-outline"}
                size={size + 2}
                color={color}
              />
            );
          } else if (route.name === "Earnings") {
            return (
              <MaterialIcons
                name={focused ? "attach-money" : "money"}
                size={size + 2}
                color={color}
              />
            );
          } else if (route.name === "Rides") {
            return (
              <Ionicons
                name={focused ? "car" : "car-outline"}
                size={size + 2}
                color={color}
              />
            );
          } else if (route.name === "Profile") {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size + 1}
                color={color}
              />
            );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DriverDashboardScreen} />
      <Tab.Screen name="Earnings" component={EarningsScreen} />
      <Tab.Screen name="Rides" component={MyRidesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
