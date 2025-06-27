import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Default/dummy prefs (replace with API or Redux)
const defaultPrefs = {
  push: true,
  sms: false,
  email: true,
  rideUpdates: true,
  promo: true,
  news: false,
};

export default function NotificationsSettingsScreen() {
  const [prefs, setPrefs] = useState(defaultPrefs);

  const handleToggle = (key) =>
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Notification Preferences</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Channels</Text>
          <View style={styles.row}>
            <MaterialIcons
              name="notifications-active"
              size={21}
              color="#43cea2"
            />
            <Text style={styles.label}>Push Notifications</Text>
            <Switch
              value={prefs.push}
              onValueChange={() => handleToggle("push")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.push ? "#185a9d" : "#ccc"}
            />
          </View>
          <View style={styles.row}>
            <FontAwesome5 name="sms" size={18} color="#185a9d" />
            <Text style={styles.label}>SMS Alerts</Text>
            <Switch
              value={prefs.sms}
              onValueChange={() => handleToggle("sms")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.sms ? "#185a9d" : "#ccc"}
            />
          </View>
          <View style={styles.row}>
            <MaterialIcons name="email" size={21} color="#43cea2" />
            <Text style={styles.label}>Email Updates</Text>
            <Switch
              value={prefs.email}
              onValueChange={() => handleToggle("email")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.email ? "#185a9d" : "#ccc"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you get notified about</Text>
          <View style={styles.row}>
            <MaterialIcons name="directions-car" size={21} color="#185a9d" />
            <Text style={styles.label}>Ride/Trip Updates</Text>
            <Switch
              value={prefs.rideUpdates}
              onValueChange={() => handleToggle("rideUpdates")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.rideUpdates ? "#185a9d" : "#ccc"}
            />
          </View>
          <View style={styles.row}>
            <MaterialIcons name="local-offer" size={21} color="#43cea2" />
            <Text style={styles.label}>Promotions & Offers</Text>
            <Switch
              value={prefs.promo}
              onValueChange={() => handleToggle("promo")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.promo ? "#185a9d" : "#ccc"}
            />
          </View>
          <View style={styles.row}>
            <MaterialIcons name="announcement" size={21} color="#185a9d" />
            <Text style={styles.label}>News & Updates</Text>
            <Switch
              value={prefs.news}
              onValueChange={() => handleToggle("news")}
              trackColor={{ true: "#43cea2", false: "#888" }}
              thumbColor={prefs.news ? "#185a9d" : "#ccc"}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 32,
    paddingBottom: 30,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 14,
    letterSpacing: 1,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: width > 400 ? 355 : "97%",
    padding: 16,
    marginBottom: 17,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.5,
    marginBottom: 9,
    letterSpacing: 0.4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
    justifyContent: "space-between",
  },
  label: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 14,
    flex: 1,
  },
});
