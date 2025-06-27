import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useUser } from "../components/UserContext";
import GradientButton from "../components/ui/GradientButton";
import SectionTitle from "../components/ui/SectionTitle";
import FeatureCard from "../components/cards/FeatureCard";
import StoreButton from "../components/ui/StoreButton";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Avatar from "../components/ui/Avatar"; // Adjust import if needed

const windowDimensions = Dimensions.get("window");
const { width } = windowDimensions;

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const role = user?.role?.toLowerCase();

  return (
    <View style={styles.container}>
      {/* Header with gradient */}
      <LinearGradient
        colors={["#43cea2", "#185a9d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.headerGradient}
      >
        <SafeAreaView>
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
                  <Avatar source={user.photo} size={36} />
                ) : (
                  <Feather name="user" size={26} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.greeting}>
              {user
                ? `Welcome back, ${user.name || "User"}!`
                : "Where would you like to go today?"}
            </Text>
          </View>
        </SafeAreaView>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainCard}>
          {/* ADMIN VIEW */}
          {role === "admin" && (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Admin Panel</Text>
              <GradientButton
                title="Admin Dashboard"
                onPress={() => navigation.navigate("Admin")}
                icon={
                  <MaterialIcons
                    name="admin-panel-settings"
                    size={22}
                    color="#fff"
                  />
                }
                style={{ marginTop: 16, backgroundColor: "#185a9d" }}
              />
              <GradientButton
                title="User Management"
                onPress={() => navigation.navigate("UserManagement")}
                icon={<MaterialIcons name="group" size={20} color="#fff" />}
                style={{ marginTop: 12, backgroundColor: "#43cea2" }}
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
                style={{ marginTop: 12, backgroundColor: "#43cea2" }}
              />
            </View>
          )}

          {/* DRIVER VIEW */}
          {role === "driver" && (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Welcome, Driver!</Text>
              <GradientButton
                title="Go Online"
                onPress={() => navigation.navigate("Driver")}
                icon={
                  <MaterialCommunityIcons
                    name="steering"
                    size={20}
                    color="#fff"
                  />
                }
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
                style={{ marginTop: 12 }}
              />
              <GradientButton
                title="My Rides"
                onPress={() => navigation.navigate("MyRides")}
                icon={<MaterialIcons name="history" size={20} color="#fff" />}
                style={{ marginTop: 12 }}
              />
            </View>
          )}

          {/* PASSENGER VIEW */}
          {role !== "admin" && role !== "driver" && (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>Book a ride anywhere</Text>
              <Text style={styles.welcomeSubtitle}>
                Fast, secure, affordable & always nearby
              </Text>
              <GradientButton
                title="Book a Ride"
                onPress={() => navigation.navigate("BookRide")}
                icon={<MaterialIcons name="search" size={22} color="#fff" />}
              />
              <GradientButton
                title="Ride History"
                onPress={() => navigation.navigate("RideHistory")}
                icon={<MaterialIcons name="history" size={22} color="#fff" />}
                style={{ marginTop: 12 }}
              />
              {/* Show Become a Driver option */}
              <GradientButton
                title="Become a Driver"
                style={{
                  marginTop: 12,
                  backgroundColor: "#fff",
                  borderWidth: 1.2,
                  borderColor: "#43cea2",
                }}
                textStyle={{ color: "#43cea2" }}
                icon={
                  <MaterialCommunityIcons
                    name="car-sports"
                    size={19}
                    color="#43cea2"
                  />
                }
                onPress={() => navigation.navigate("SelectRole")}
              />
            </View>
          )}
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <SectionTitle>Why Choose NexTrip?</SectionTitle>
          <View style={styles.featuresGrid}>
            <FeatureCard
              icon={<MaterialIcons name="security" size={29} color="#43cea2" />}
              title="Secure Payment"
              description="Encrypted transactions"
            />
            <FeatureCard
              icon={<FontAwesome name="money" size={26} color="#00c853" />}
              title="Affordable"
              description="Competitive pricing"
            />
            <FeatureCard
              icon={
                <MaterialCommunityIcons
                  name="map-marker-radius"
                  size={28}
                  color="#185a9d"
                />
              }
              title="Live Tracking"
              description="Real-time updates"
            />
            <FeatureCard
              icon={
                <MaterialIcons name="support-agent" size={26} color="#fbc02d" />
              }
              title="24/7 Support"
              description="Always here to help"
            />
          </View>
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
                <MaterialCommunityIcons name="apple" size={21} color="#000" />
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
                  size={21}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerGradient: {
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#185a9d",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
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
    width: 34,
    height: 34,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  brand: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    letterSpacing: 1.1,
  },
  profileButton: {
    padding: 6,
  },
  greeting: {
    marginTop: 10,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e0f2f1",
    shadowColor: "#185a9d",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  welcomeCard: {
    alignItems: "center",
    paddingVertical: 36,
    paddingHorizontal: 28,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  section: {
    marginTop: 28,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  appPromo: {
    marginTop: 30,
    alignItems: "center",
  },
  appImage: {
    width: 280,
    height: 200,
    marginBottom: 18,
    borderRadius: 16,
  },
  appPromoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#185a9d",
  },
  appPromoText: {
    fontSize: 15,
    color: "#43cea2",
    marginBottom: 15,
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
