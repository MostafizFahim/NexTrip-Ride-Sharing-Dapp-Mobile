import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

// Tab config (add/remove as needed)
const tabs = [
  { key: "Home", label: "Home", icon: <MaterialIcons name="home" size={22} /> },
  {
    key: "BookRide",
    label: "Book",
    icon: <MaterialIcons name="directions-car" size={21} />,
  },
  {
    key: "RideHistory",
    label: "History",
    icon: <MaterialIcons name="history" size={21} />,
  },
  {
    key: "Wallet",
    label: "Wallet",
    icon: <FontAwesome5 name="wallet" size={19} />,
  },
  {
    key: "Profile",
    label: "Profile",
    icon: <MaterialIcons name="person" size={22} />,
  },
];

export default function BottomNav({ state, descriptors, navigation }) {
  return (
    <LinearGradient
      colors={["#185a9d", "#43cea2"]}
      start={[0, 1]}
      end={[1, 0]}
      style={styles.bg}
    >
      <View style={styles.tabRow}>
        {state.routes.map((route, idx) => {
          const { options } = descriptors[route.key] || {};
          const label =
            options?.tabBarLabel ||
            options?.title ||
            tabs[idx]?.label ||
            route.name;
          const isFocused = state.index === idx;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options?.tabBarAccessibilityLabel}
              testID={options?.tabBarTestID}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.tab, isFocused && styles.focusedTab]}
              activeOpacity={0.8}
            >
              {React.cloneElement(tabs[idx]?.icon, {
                color: isFocused ? "#43cea2" : "#fff",
              })}
              <Text style={[styles.label, isFocused && styles.focusedLabel]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    elevation: 7,
    shadowColor: "#185a9d",
    shadowOpacity: 0.15,
    paddingBottom: Platform.OS === "ios" ? 22 : 10,
    paddingTop: 6,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 60,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 4,
  },
  label: {
    color: "#fff",
    fontSize: 12.6,
    marginTop: 2,
    fontWeight: "600",
    letterSpacing: 0.2,
    opacity: 0.9,
  },
  focusedTab: {
    // Optional: add a border or shadow to active tab
  },
  focusedLabel: {
    color: "#43cea2",
    fontWeight: "bold",
    opacity: 1,
  },
});
