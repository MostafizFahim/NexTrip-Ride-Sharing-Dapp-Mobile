import React from "react";
import { UserProvider } from "./components/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppSettingsProvider } from "./components/AppSettingsContext";
import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import BookRideScreen from "./screens/BookRideScreen";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RideHistoryScreen from "./screens/RideHistoryScreen";
import DriverDashboardScreen from "./screens/DriverDashboardScreen";
import AdminDashboardScreen from "./screens/AdminDashboardScreen";
import HelpScreen from "./screens/HelpScreen";
import FAQScreen from "./screens/FAQScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AboutScreen from "./screens/AboutScreen";
import WalletScreen from "./screens/WalletScreen";
import TripDetailsScreen from "./screens/TripDetailsScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import AddVehicleScreen from "./screens/AddVehicleScreen";
import UploadDocumentsScreen from "./screens/UploadDocumentsScreen";
import EarningsScreen from "./screens/EarningsScreen";
import PromoCodesScreen from "./screens/PromoCodesScreen";
import PassengerDashboardScreen from "./screens/PassengerDashboardScreen";
import SearchingForDriverScreen from "./screens/SearchingForDriverScreen";
import RateAndFeedbackScreen from "./screens/RateAndFeedbackScreen";
import TripReceiptScreen from "./screens/TripReceiptScreen";
import BlockchainDetailsScreen from "./screens/BlockchainDetailsScreen";
import AddCardScreen from "./screens/AddCardScreen";
import LegalPrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import RideDetailsScreen from "./screens/RideDetailsScreen";
import EditProfileScreen from "./screens/EditProfileScreen";
import InviteFriendsScreen from "./screens/InviteFriendsScreen";
import DriverProfileScreen from "./screens/DriverProfileScreen";
import MyRidesScreen from "./screens/MyRidesScreen";
import DriverRatingsScreen from "./screens/DriverRatingsScreen";
import UserManagementScreen from "./screens/UserManagementScreen";
import DriverManagementScreen from "./screens/DriverManagementScreen";
import AdminAnalyticsScreen from "./screens/AdminAnalyticsScreen";
import AdminSupportScreen from "./screens/AdminSupportScreen";
import NotificationsSettingsScreen from "./screens/NotificationsSettingsScreen";
import LanguageSettingsScreen from "./screens/LanguageSettingsScreen";
import TermsOfServiceScreen from "./screens/TermsOfServiceScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import AppInfoScreen from "./screens/AppInfoScreen";
import RideShareScreen from "./screens/RideShareScreen";
import MapFullScreen from "./screens/MapFullScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <AppSettingsProvider>
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
            <Stack.Screen name="BookRide" component={BookRideScreen} />
            <Stack.Screen
              name="RideProgress"
              component={RideInProgressScreen}
            />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="RideHistory" component={RideHistoryScreen} />
            <Stack.Screen name="HelpScreen" component={HelpScreen} />
            <Stack.Screen name="Driver" component={DriverDashboardScreen} />
            <Stack.Screen name="Admin" component={AdminDashboardScreen} />
            <Stack.Screen name="Faq" component={FAQScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Wallet" component={WalletScreen} />
            <Stack.Screen name="TripDetails" component={TripDetailsScreen} />
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
            <Stack.Screen
              name="UploadDocuments"
              component={UploadDocumentsScreen}
            />
            <Stack.Screen name="Earnings" component={EarningsScreen} />
            <Stack.Screen name="PromoCodes" component={PromoCodesScreen} />
            <Stack.Screen
              name="PassengerDashboard"
              component={PassengerDashboardScreen}
            />
            <Stack.Screen
              name="SearchingForDriver"
              component={SearchingForDriverScreen}
            />
            <Stack.Screen
              name="RateAndFeedback"
              component={RateAndFeedbackScreen}
            />
            <Stack.Screen
              name="TripReceipt"
              component={TripReceiptScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BlockchainDetails"
              component={BlockchainDetailsScreen}
            />
            <Stack.Screen name="AddCard" component={AddCardScreen} />
            <Stack.Screen
              name="LegalPrivacyPolicy"
              component={LegalPrivacyPolicyScreen}
            />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Feedback" component={FeedbackScreen} />
            <Stack.Screen name="RideDetails" component={RideDetailsScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen
              name="InviteFriends"
              component={InviteFriendsScreen}
            />
            <Stack.Screen
              name="DriverProfile"
              component={DriverProfileScreen}
            />
            <Stack.Screen name="MyRides" component={MyRidesScreen} />
            <Stack.Screen
              name="DriverRatings"
              component={DriverRatingsScreen}
            />
            <Stack.Screen
              name="UserManagement"
              component={UserManagementScreen}
            />
            <Stack.Screen
              name="DriverManagement"
              component={DriverManagementScreen}
            />
            <Stack.Screen
              name="AdminAnalytics"
              component={AdminAnalyticsScreen}
            />
            <Stack.Screen name="AdminSupport" component={AdminSupportScreen} />
            <Stack.Screen
              name="NotificationsSettings"
              component={NotificationsSettingsScreen}
            />
            <Stack.Screen
              name="LanguageSettings"
              component={LanguageSettingsScreen}
            />
            <Stack.Screen
              name="TermsOfService"
              component={TermsOfServiceScreen}
            />
            <Stack.Screen name="ContactUs" component={ContactUsScreen} />
            <Stack.Screen name="AppInfo" component={AppInfoScreen} />
            <Stack.Screen name="RideShare" component={RideShareScreen} />
            <Stack.Screen name="MapFullScreen" component={MapFullScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AppSettingsProvider>
  );
}
