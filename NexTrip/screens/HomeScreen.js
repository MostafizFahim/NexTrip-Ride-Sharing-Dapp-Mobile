import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
} from "@expo/vector-icons";

import { useUser } from "../components/UserContext";
import useRideHistory from "../components/hooks/useRideHistory";
import GradientButton from "../components/ui/GradientButton";
import Avatar from "../components/ui/Avatar";
import SectionTitle from "../components/ui/SectionTitle";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import EmptyState from "../components/ui/EmptyState";
import RideCard from "../components/cards/RideCard"; // You can use this for recent rides
import FeatureCard from "../components/cards/FeatureCard";
import StoreButton from "../components/ui/StoreButton";

const windowDimensions = Dimensions.get("window");
const { width, height } = windowDimensions;

export default function HomeScreen({ navigation }) {
  const { user } = useUser();
  const { rides, loading } = useRideHistory();
  const lastRide = rides && rides.length ? rides[0] : null;

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
        {/* Main Card */}
        <View style={styles.mainCard}>
          {user ? (
            loading ? (
              <LoadingSpinner message="Loading your rides..." overlay={false} />
            ) : lastRide ? (
              <View>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>Your Last Ride</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("RideHistory")}
                  >
                    <Text style={styles.viewAll}>View All</Text>
                  </TouchableOpacity>
                </View>
                <RideCard
                  {...lastRide}
                  showAvatar={false}
                  onPress={() =>
                    navigation.navigate("RideDetails", { ride: lastRide })
                  }
                >
                  <GradientButton
                    title="Book Again"
                    onPress={() => navigation.navigate("BookRide")}
                    style={{ marginTop: 12 }}
                    icon={
                      <MaterialIcons name="search" size={20} color="#fff" />
                    }
                  />
                </RideCard>
              </View>
            ) : (
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
                  onPress={() => navigation.navigate("Register")}
                />
              </View>
            )
          ) : (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>
                Book a ride anywhere in Dhaka
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Fast, secure, affordable & always nearby
              </Text>
              <GradientButton
                title="Book a Ride"
                onPress={() => navigation.navigate("BookRide")}
                icon={<MaterialIcons name="search" size={22} color="#fff" />}
              />
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
                onPress={() => navigation.navigate("Register")}
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

        {/* How it works */}
        <View style={styles.section}>
          <SectionTitle>How NexTrip Works</SectionTitle>
          <View style={styles.stepsContainer}>
            {[
              "Choose your role",
              "Set pickup & drop-off",
              "Get matched instantly",
              "Track and complete ride",
            ].map((step, index) => (
              <View key={index} style={styles.step}>
                <View style={styles.stepNumberContainer}>
                  <Text style={styles.stepNumber}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
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

// FeatureCard, StoreButton, and styles remain unchanged from your code above

// Optionally, update navigation route names ("Register" instead of "RegisterDriver") for consistency with your stack
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // Or transparent if you use LinearGradient below
  },
  headerGradient: {
    paddingVertical: 15,
    paddingHorizontal: 18,
  },
  header: {
    // container of header content
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  logoBrandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 38,
    height: 38,
    marginRight: 8,
  },
  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  profileButton: {
    padding: 5,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
    marginTop: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  mainCard: {
    backgroundColor: "#fff",
    borderRadius: 20, // slightly more rounded corners
    padding: 20, // a bit more padding for spaciousness
    marginBottom: 24,
    borderWidth: 1, // subtle border
    borderColor: "#e0f2f1", // light teal-ish border matching theme
    shadowColor: "#185a9d", // use theme color for shadow tint
    shadowOpacity: 0.12, // slightly lighter shadow
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6, // slightly higher elevation for Android
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#185a9d",
  },
  viewAll: {
    color: "#43cea2",
    fontWeight: "600",
  },
  welcomeCard: {
    alignItems: "center",
    paddingVertical: 36, // a little more vertical padding for breathing space
    paddingHorizontal: 28, // slightly wider padding horizontally
    backgroundColor: "#fff",
    borderRadius: 20, // a bit more rounded corners for a modern feel
    elevation: 4, // subtle shadow for depth (Android)
    shadowColor: "#185a9d",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  welcomeTitle: {
    fontSize: 24, // slightly larger for emphasis
    fontWeight: "bold",
    color: "#185a9d",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#43cea2",
    marginBottom: 24,
    textAlign: "center", // center text for better alignment
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
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  stepNumberContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#43cea2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "bold",
  },
  stepText: {
    fontSize: 16,
    color: "#185a9d",
  },
  appPromo: {
    marginTop: 30,
    alignItems: "center",
  },
  appImage: {
    width: 280,
    height: 160,
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
