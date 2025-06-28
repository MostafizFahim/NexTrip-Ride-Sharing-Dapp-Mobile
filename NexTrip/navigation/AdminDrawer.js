import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import AdminDashboardScreen from "../screens/AdminDashboardScreen";
import UserManagementScreen from "../screens/UserManagementScreen";
import DriverManagementScreen from "../screens/DriverManagementScreen";
import AdminSupportScreen from "../screens/AdminSupportScreen";
import AdminAnalyticsScreen from "../screens/AdminAnalyticsScreen";
import PromoCodesScreen from "../screens/PromoCodesScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#b8e2f2",
        drawerStyle: {
          backgroundColor: "transparent",
          width: 190,
          borderTopRightRadius: 25,
          borderBottomRightRadius: 25,
        },
        drawerLabelStyle: {
          marginLeft: -8,
          fontSize: 16,
          fontWeight: "600",
          color: "#fff",
        },
        headerStyle: {
          backgroundColor: "#43cea2",
        },
        headerTintColor: "#fff",
      }}
    >
      <Drawer.Screen name="Dashboard" component={AdminDashboardScreen} />
      <Drawer.Screen name="User Management" component={UserManagementScreen} />
      <Drawer.Screen
        name="Driver Management"
        component={DriverManagementScreen}
      />
      <Drawer.Screen name="Support" component={AdminSupportScreen} />
      <Drawer.Screen name="Analytics" component={AdminAnalyticsScreen} />
      <Drawer.Screen name="Promo Codes" component={PromoCodesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
