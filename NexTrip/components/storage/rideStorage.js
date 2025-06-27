// components/storage/rideStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
const RIDE_HISTORY_KEY = "NEXTRIP_RIDE_HISTORY";

// Get ride list
export async function getRideHistory() {
  const json = await AsyncStorage.getItem(RIDE_HISTORY_KEY);
  return json ? JSON.parse(json) : [];
}

// Add new ride
export async function addRide(ride) {
  const rides = await getRideHistory();
  rides.unshift(ride); // newest first
  await AsyncStorage.setItem(RIDE_HISTORY_KEY, JSON.stringify(rides));
}

// Clear all rides (for logout or reset)
export async function clearRideHistory() {
  await AsyncStorage.removeItem(RIDE_HISTORY_KEY);
}
