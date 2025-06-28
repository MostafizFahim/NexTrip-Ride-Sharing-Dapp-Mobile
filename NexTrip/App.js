import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserProvider, useUser } from "./components/UserContext";
import { AppSettingsProvider } from "./components/AppSettingsContext";

// Import main navigators (your own files!)
import PassengerTabs from "./navigation/PassengerTabs";
import DriverTabs from "./navigation/DriverTabs";
import AdminDrawer from "./navigation/AdminDrawer";

// Import screens for Auth/global modals
import SplashScreen from "./screens/SplashScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import HomeScreen from "./screens/HomeScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

// Example: more modal/global screens
import BookRideScreen from "./screens/BookRideScreen";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import TripReceiptScreen from "./screens/TripReceiptScreen";
import RideDetailsScreen from "./screens/RideDetailsScreen";
import SearchingForDriverScreen from "./screens/SearchingForDriverScreen";
import RateAndFeedbackScreen from "./screens/RateAndFeedbackScreen";
import WalletScreen from "./screens/WalletScreen";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MapFullScreen from "./screens/MapFullScreen";
import TripDetailsScreen from "./screens/TripDetailsScreen";
// ...import all other global/modal screens as needed

const Stack = createStackNavigator();

// ---------- Auth Stack (before login) ----------
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// ---------- Main App Stack (role-based) ----------
function MainApp() {
  const { user } = useUser();
  const role = user?.role?.toLowerCase();

  let mainFlow;
  if (role === "passenger")
    mainFlow = <Stack.Screen name="PassengerFlow" component={PassengerTabs} />;
  else if (role === "driver")
    mainFlow = <Stack.Screen name="DriverFlow" component={DriverTabs} />;
  else if (role === "admin")
    mainFlow = <Stack.Screen name="AdminFlow" component={AdminDrawer} />;
  else mainFlow = <Stack.Screen name="Home" component={HomeScreen} />; // fallback

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {mainFlow}
      {/* Modal/global screens: put these here for "anywhere" access */}
      <Stack.Screen name="BookRide" component={BookRideScreen} />
      <Stack.Screen name="RideProgress" component={RideInProgressScreen} />
      <Stack.Screen name="TripReceipt" component={TripReceiptScreen} />
      <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
      <Stack.Screen
        name="SearchingForDriver"
        component={SearchingForDriverScreen}
      />
      <Stack.Screen name="RateAndFeedback" component={RateAndFeedbackScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="MapFullScreen" component={MapFullScreen} />
      <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
      {/* Add all other global/modal screens here */}
    </Stack.Navigator>
  );
}

// ---------- SplashGate (show Splash while loading user state) ----------
function SplashGate({ children }) {
  const { loading } = useUser();
  if (loading) return <SplashScreen />;
  return children;
}

// ---------- RootNavigator (handles Auth/MainApp based on login) ----------
function RootNavigator() {
  const { user } = useUser();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <Stack.Screen name="MainApp" component={MainApp} />
      )}
    </Stack.Navigator>
  );
}

// ---------- App Entry Point ----------
export default function App() {
  return (
    <AppSettingsProvider>
      <UserProvider>
        <SplashGate>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SplashGate>
      </UserProvider>
    </AppSettingsProvider>
  );
}
