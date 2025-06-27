// components/storage/walletStorage.js
import AsyncStorage from "@react-native-async-storage/async-storage";
const WALLET_KEY = "NEXTRIP_WALLET_BALANCE";

// Get balance (default 0)
export async function getBalance() {
  const val = await AsyncStorage.getItem(WALLET_KEY);
  return val ? Number(val) : 0;
}

// Set balance
export async function setBalance(amount) {
  await AsyncStorage.setItem(WALLET_KEY, String(amount));
}

// Add funds
export async function addFunds(amount) {
  const bal = await getBalance();
  await setBalance(bal + amount);
}

// Remove funds (returns false if not enough)
export async function withdrawFunds(amount) {
  const bal = await getBalance();
  if (bal < amount) return false;
  await setBalance(bal - amount);
  return true;
}

// Reset wallet (for logout)
export async function clearWallet() {
  await AsyncStorage.removeItem(WALLET_KEY);
}
