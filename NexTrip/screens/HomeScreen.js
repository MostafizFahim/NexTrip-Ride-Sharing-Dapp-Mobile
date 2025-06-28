import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { useUser } from "../components/UserContext";
import GradientButton from "../components/ui/GradientButton";
import SectionTitle from "../components/ui/SectionTitle";
import FeatureCard from "../components/cards/FeatureCard";
import StoreButton from "../components/ui/StoreButton";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../components/ui/Avatar";

const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? Constants.statusBarHeight : 0;
const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const role = user?.role?.toLowerCase();
  const userName = user?.name?.split(" ")[0] || "User";

  // Role-based dashboard cards
  const dashboardCards = [
    {
      id: "passenger",
      title: "Passenger Dashboard",
      icon: "person",
      color: "#43cea2",
      visible: true,
      navigate: "PassengerFlow",
    },
    {
      id: "driver",
      title: "Driver Dashboard",
      icon: "car",
      color: "#185a9d",
      visible: role === "driver" || role === "admin",
      navigate: "DriverFlow",
    },
    {
      id: "admin",
      title: "Admin Dashboard",
      icon: "shield",
      color: "#ff6b6b",
      visible: role === "admin",
      navigate: "AdminFlow",
    },
  ];

  // Role-based quick actions
  const quickActions = {
    passenger: [
      {
        icon: <MaterialIcons name="search" size={32} color="#fff" />,
        label: "Book a Ride",
        gradient: ["#43cea2", "#185a9d"],
        onPress: () => navigation.navigate("BookRide"),
      },
      {
        icon: <MaterialIcons name="people" size={32} color="#fff" />,
        label: "Share a Ride",
        gradient: ["#ff9966", "#ff5e62"],
        onPress: () => navigation.navigate("RideShare"),
      },
    ],
    driver: [
      {
        icon: <MaterialCommunityIcons name="steering" size={32} color="#fff" />,
        label: "Go Online",
        gradient: ["#43cea2", "#185a9d"],
        onPress: () => navigation.navigate("DriverFlow"),
      },
      {
        icon: (
          <MaterialCommunityIcons name="cash-multiple" size={32} color="#fff" />
        ),
        label: "View Earnings",
        gradient: ["#ff9966", "#ff5e62"],
        onPress: () => navigation.navigate("Earnings"),
      },
    ],
    admin: [
      {
        icon: <Ionicons name="stats-chart" size={32} color="#fff" />,
        label: "Analytics",
        gradient: ["#43cea2", "#185a9d"],
        onPress: () => navigation.navigate("AdminAnalytics"),
      },
      {
        icon: <MaterialIcons name="group" size={32} color="#fff" />,
        label: "User Management",
        gradient: ["#ff9966", "#ff5e62"],
        onPress: () => navigation.navigate("UserManagement"),
      },
    ],
  };

  return (
    <LinearGradient
      colors={["#f8fdff", "#e6f7ff", "#d4f1ff"]}
      style={styles.container}
    >
      {/* Proper edge-to-edge status bar */}
      <StatusBar style="light" translucent backgroundColor="transparent" />

      {/* Header with gradient and custom statusbar padding */}
      <LinearGradient
        colors={["#43cea2", "#185a9d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.headerGradient, { paddingTop: STATUSBAR_HEIGHT }]}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.logoBrandContainer}>
              <Image
                source={require("../assets/logo12.png")}
                style={styles.logo}
              />
              <Text style={styles.brand}>NexTrip</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate("Profile")}
              activeOpacity={0.7}
            >
              {user?.photo ? (
                <Avatar source={user.photo} size={42} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Feather name="user" size={26} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.greeting}>
            {user
              ? `Hi ${userName}, ready to ride?`
              : "Where would you like to go today?"}
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Actions Section */}
        <SectionTitle>Quick Actions</SectionTitle>
        <View style={styles.quickActions}>
          {(quickActions[role] || []).map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={action.onPress}
            >
              <LinearGradient
                colors={action.gradient}
                style={styles.actionGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {action.icon}
                <Text style={styles.actionText}>{action.label}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Role-Specific Tools */}
        {role === "admin" && (
          <>
            <SectionTitle>Admin Tools</SectionTitle>
            <View style={styles.adminTools}>
              <GradientButton
                title="User Management"
                onPress={() => navigation.navigate("UserManagement")}
                icon={<MaterialIcons name="group" size={20} color="#fff" />}
                style={styles.toolButton}
                colors={["#43cea2", "#185a9d"]}
              />
              <GradientButton
                title="Driver Management"
                onPress={() => navigation.navigate("DriverManagement")}
                icon={
                  <MaterialCommunityIcons
                    name="car-multiple"
                    size={20}
                    color="#fff"
                  />
                }
                style={styles.toolButton}
                colors={["#ff9966", "#ff5e62"]}
              />
              <GradientButton
                title="Analytics"
                onPress={() => navigation.navigate("AdminAnalytics")}
                icon={<MaterialIcons name="analytics" size={20} color="#fff" />}
                style={styles.toolButton}
                colors={["#6a11cb", "#2575fc"]}
              />
            </View>
          </>
        )}

        {role === "driver" && (
          <>
            <SectionTitle>Driver Tools</SectionTitle>
            <View style={styles.driverTools}>
              <GradientButton
                title="Go Online"
                onPress={() => navigation.navigate("DriverFlow")}
                icon={
                  <MaterialCommunityIcons
                    name="steering"
                    size={20}
                    color="#fff"
                  />
                }
                style={styles.toolButton}
                colors={["#43cea2", "#185a9d"]}
              />
              <GradientButton
                title="View Earnings"
                onPress={() => navigation.navigate("Earnings")}
                icon={
                  <MaterialCommunityIcons
                    name="cash-multiple"
                    size={20}
                    color="#fff"
                  />
                }
                style={styles.toolButton}
                colors={["#ff9966", "#ff5e62"]}
              />
              <GradientButton
                title="My Rides"
                onPress={() => navigation.navigate("MyRides")}
                icon={<MaterialIcons name="history" size={20} color="#fff" />}
                style={styles.toolButton}
                colors={["#6a11cb", "#2575fc"]}
              />
            </View>
          </>
        )}

        {role !== "admin" && role !== "driver" && (
          <>
            <SectionTitle>Passenger Tools</SectionTitle>
            <View style={styles.passengerTools}>
              <GradientButton
                title="Ride History"
                onPress={() => navigation.navigate("RideHistory")}
                icon={<MaterialIcons name="history" size={22} color="#fff" />}
                style={styles.toolButton}
                colors={["#43cea2", "#185a9d"]}
              />
              <GradientButton
                title="Wallet"
                onPress={() => navigation.navigate("Wallet")}
                icon={
                  <MaterialIcons
                    name="account-balance-wallet"
                    size={22}
                    color="#fff"
                  />
                }
                style={styles.toolButton}
                colors={["#ff9966", "#ff5e62"]}
              />
              <GradientButton
                title="Become a Driver"
                onPress={() => navigation.navigate("SelectRole")}
                icon={
                  <MaterialCommunityIcons
                    name="car-sports"
                    size={19}
                    color="#fff"
                  />
                }
                style={styles.toolButton}
                colors={["#6a11cb", "#2575fc"]}
              />
            </View>
          </>
        )}

        {/* Features Section */}
        <SectionTitle>Why Choose NexTrip?</SectionTitle>
        <View style={styles.featuresGrid}>
          <FeatureCard
            icon={<MaterialIcons name="security" size={32} color="#43cea2" />}
            title="Secure Payment"
            description="Encrypted transactions"
            colors={["#e8f7f2", "#d1f0e6"]}
          />
          <FeatureCard
            icon={<FontAwesome name="money" size={28} color="#00c853" />}
            title="Affordable"
            description="Competitive pricing"
            colors={["#e8f5e9", "#c8e6c9"]}
          />
          <FeatureCard
            icon={
              <MaterialCommunityIcons
                name="map-marker-radius"
                size={32}
                color="#185a9d"
              />
            }
            title="Live Tracking"
            description="Real-time updates"
            colors={["#e3f2fd", "#bbdefb"]}
          />
          <FeatureCard
            icon={
              <MaterialIcons name="support-agent" size={30} color="#fbc02d" />
            }
            title="24/7 Support"
            description="Always here to help"
            colors={["#fff8e1", "#ffecb3"]}
          />
        </View>

        {/* App Promo */}
        <View style={styles.appPromo}>
          <Image
            source={require("../assets/app-preview.png")}
            style={styles.appImage}
          />
          <Text style={styles.appPromoTitle}>Get the NexTrip App</Text>
          <Text style={styles.appPromoText}>
            Faster bookings, exclusive offers, and more features
          </Text>
          <View style={styles.appButtons}>
            <StoreButton
              icon={
                <MaterialCommunityIcons name="apple" size={24} color="#000" />
              }
              title="App Store"
              subtitle="Download on the"
              onPress={() => {}}
              style={styles.appStoreButton}
            />
            <StoreButton
              icon={
                <MaterialCommunityIcons
                  name="google-play"
                  size={24}
                  color="#000"
                />
              }
              title="Google Play"
              subtitle="Get it on"
              onPress={() => {}}
              style={styles.playStoreButton}
            />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#185a9d",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
    // Remove paddingTop here, it will be injected dynamically
  },
  header: {
    paddingHorizontal: 24,
    // Remove paddingTop, handled by headerGradient
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoBrandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    resizeMode: "contain",
  },
  brand: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    letterSpacing: 1.1,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  profileButton: {
    padding: 8,
  },
  avatarPlaceholder: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    marginTop: 15,
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  dashboardCards: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  dashboardCard: {
    width: width > 500 ? "48%" : "100%",
    marginBottom: 15,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardIconContainer: {
    backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: 14,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    flex: 1,
    marginLeft: 15,
    fontWeight: "600",
    fontSize: 16,
  },
  cardArrow: {
    marginLeft: 10,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionCard: {
    width: "48%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  actionGradient: {
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 140,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
  },
  adminTools: {
    marginBottom: 25,
  },
  driverTools: {
    marginBottom: 25,
  },
  passengerTools: {
    marginBottom: 25,
  },
  toolButton: {
    marginBottom: 15,
    borderRadius: 15,
    paddingVertical: 16,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  appPromo: {
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 25,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },
  appImage: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 16,
    resizeMode: "contain",
  },
  appPromoTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 5,
  },
  appPromoText: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 20,
    textAlign: "center",
  },
  appButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  appStoreButton: {
    marginRight: 12,
    flex: 1,
  },
  playStoreButton: {
    flex: 1,
  },
});
