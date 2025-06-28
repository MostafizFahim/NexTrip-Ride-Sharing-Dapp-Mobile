import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import PassengerDashboardScreen from "../screens/PassengerDashboardScreen";
import BookRideScreen from "../screens/BookRideScreen";
import RideHistoryScreen from "../screens/RideHistoryScreen";
import WalletScreen from "../screens/WalletScreen";
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

export default function PassengerTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home")
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          if (route.name === "Dashboard")
            return <MaterialIcons name="dashboard" size={size} color={color} />;
          if (route.name === "BookRide")
            return <MaterialIcons name="commute" size={size} color={color} />;
          if (route.name === "Rides")
            return (
              <Ionicons
                name={focused ? "car" : "car-outline"}
                size={size}
                color={color}
              />
            );
          if (route.name === "Wallet")
            return (
              <Ionicons
                name={focused ? "wallet" : "wallet-outline"}
                size={size}
                color={color}
              />
            );
          if (route.name === "Profile")
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            );
          return null;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#b8e2f2",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#185a9d",
          shadowOpacity: 0.16,
          shadowRadius: 10,
          height: 62,
        },
        tabBarBackground: () => <CustomTabBarBackground />,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={PassengerDashboardScreen} />
      <Tab.Screen name="BookRide" component={BookRideScreen} />
      <Tab.Screen name="Rides" component={RideHistoryScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
