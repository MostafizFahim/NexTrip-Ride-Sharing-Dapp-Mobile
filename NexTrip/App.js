import React from "react";
import { UserProvider } from "./components/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./screens/SplashScreen"; // <-- Import SplashScreen!
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SelectRoleScreen from "./screens/SelectRoleScreen";
import BookRideScreen from "./screens/BookRideScreen";
import RideInProgressScreen from "./screens/RideInProgressScreen";
import ProfileScreen from "./screens/ProfileScreen";
// ...other imports...

const Stack = createStackNavigator();

export default function App() {
  return (
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
          <Stack.Screen name="RideProgress" component={RideInProgressScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />

          {/* ...other screens... */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
