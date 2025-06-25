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

const windowDimensions = Dimensions.get("window");
const { width, height } = windowDimensions;

const rideSummary = {
  pickup: "Bashundhara R/A",
  dropoff: "Dhanmondi 27",
  status: "Completed",
  fare: 320,
  date: "2025-06-25",
};

export default function HomeScreen({ navigation }) {
  const user = null; // Replace with user context or auth hook

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
                <Feather name="user" size={26} color="#fff" />
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
            <View style={styles.rideSummary}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Your Last Ride</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("History")}
                  activeOpacity={0.7}
                >
                  <Text style={styles.viewAll}>View All</Text>
                </TouchableOpacity>
              </View>

              <RideDetail
                icon={
                  <MaterialIcons name="my-location" size={22} color="#43cea2" />
                }
                label="Pickup"
                value={rideSummary.pickup}
              />
              <RideDetail
                icon={
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={22}
                    color="#185a9d"
                  />
                }
                label="Dropoff"
                value={rideSummary.dropoff}
              />
              <RideDetail
                icon={<FontAwesome name="money" size={20} color="#00c853" />}
                label="Fare"
                value={`৳${rideSummary.fare}`}
              />
              <RideDetail
                icon={<MaterialIcons name="history" size={20} color="#888" />}
                label="Status"
                value={rideSummary.status}
                valueStyle={styles.completedStatus}
              />

              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("BookRide")}
                activeOpacity={0.8}
              >
                <MaterialIcons name="search" size={24} color="#fff" />
                <Text style={styles.primaryButtonText}>Book Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.welcomeCard}>
              <Text style={styles.welcomeTitle}>
                Book a ride anywhere in Dhaka
              </Text>
              <Text style={styles.welcomeSubtitle}>
                Fast, secure, affordable & always nearby
              </Text>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => navigation.navigate("BookRide")}
                activeOpacity={0.8}
              >
                <MaterialIcons name="search" size={24} color="#fff" />
                <Text style={styles.primaryButtonText}>Book a Ride</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => navigation.navigate("RegisterDriver")}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="car-sports"
                  size={21}
                  color="#43cea2"
                />
                <Text style={styles.secondaryButtonText}>Become a Driver</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose NexTrip?</Text>
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
          <Text style={styles.sectionTitle}>How NexTrip Works</Text>
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

function RideDetail({ icon, label, value, valueStyle }) {
  return (
    <View style={styles.rideDetail}>
      {icon}
      <View style={styles.rideTextContainer}>
        <Text style={styles.rideLabel}>{label}</Text>
        <Text style={[styles.rideValue, valueStyle]}>{value}</Text>
      </View>
    </View>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

function StoreButton({ icon, title, subtitle, onPress, style }) {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={0.85}>
      {icon}
      <View style={styles.appButtonTextContainer}>
        <Text style={styles.appButtonSmallText}>{subtitle}</Text>
        <Text style={styles.appButtonLargeText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  headerGradient: {
    paddingTop: height * 0.05, // Increased padding to push content down
    paddingBottom: height * 0.06,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end", // Align items to bottom
    marginBottom: height * 0.025, // Responsive margin
  },
  logoBrandContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.01, // Responsive margin
    transform: [{ translateY: 10 }], // Explicitly push down
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    marginRight: 12,
  },
  brand: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 26, // Slightly larger
    letterSpacing: 0.5,
    transform: [{ translateY: -2 }], // Fine-tune alignment
  },
  greeting: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    marginTop: height * 0.005, // Small adjustment
  },
  scrollContent: {
    paddingBottom: 30,
  },
  mainCard: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginTop: -20,
    shadowColor: "#185a9d",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#185a9d",
  },
  viewAll: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 14,
  },
  rideDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  rideTextContainer: {
    marginLeft: 15,
  },
  rideLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  rideValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginTop: 2,
  },
  completedStatus: {
    color: "#00c853",
    fontWeight: "700",
  },
  welcomeCard: {
    alignItems: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#185a9d",
    marginBottom: 8,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 25,
    textAlign: "center",
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#185a9d",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#185a9d",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 10,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#43cea2",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginTop: 15,
  },
  secondaryButtonText: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 15,
    marginLeft: 8,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#185a9d",
    marginBottom: 15,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  featureIcon: {
    backgroundColor: "rgba(67,206,162,0.1)",
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#185a9d",
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  stepsContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },
  step: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  stepNumberContainer: {
    backgroundColor: "#43cea2",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  stepNumber: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  stepText: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },
  appPromo: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#185a9d",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 30,
    alignItems: "center",
  },
  appImage: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appPromoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#185a9d",
    marginBottom: 8,
    textAlign: "center",
  },
  appPromoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: "80%",
  },
  appButtons: {
    width: "100%",
  },
  appStoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: "100%",
  },
  playStoreButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "100%",
  },
  appButtonTextContainer: {
    marginLeft: 10,
  },
  appButtonSmallText: {
    fontSize: 10,
    color: "#666",
  },
  appButtonLargeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
