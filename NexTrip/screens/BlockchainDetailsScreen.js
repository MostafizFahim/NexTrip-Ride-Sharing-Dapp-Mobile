import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  Clipboard,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const blockchainRecord = {
  txHash: "0xA6b23f1e8d...19bE6cD",
  blockNumber: 145738,
  timestamp: "2025-06-27 22:13:40",
  contract: "0x12FAb34B...e8F1A5cD",
  explorerUrl: "https://blockexplorer.com/tx/0xA6b23f1e8d...19bE6cD",
  status: "Confirmed",
  from: "0xabc123...def456",
  to: "0xdef789...abc111",
  fare: 320,
  currency: "NTC",
  rideId: "#NT123456",
};

export default function BlockchainDetailsScreen({ navigation }) {
  const openExplorer = () => {
    Linking.openURL(blockchainRecord.explorerUrl).catch(() =>
      Alert.alert("Unable to open explorer")
    );
  };

  const handleCopy = (label, value) => {
    if (Platform.OS === "web") {
      navigator.clipboard.writeText(value);
    } else {
      Clipboard.setString(value);
    }
    Alert.alert("Copied", `${label} copied to clipboard`);
  };

  // Helper for copyable fields (like hashes)
  const Copyable = ({ label, value }) => (
    <TouchableOpacity
      onLongPress={() => handleCopy(label, value)}
      activeOpacity={0.7}
      delayLongPress={160}
      style={{ flex: 1 }}
    >
      <Text
        style={[styles.value, { fontSize: 13 }]}
        numberOfLines={1}
        ellipsizeMode="middle"
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Blockchain Details</Text>
          <View style={styles.card}>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Ride ID</Text>
              <Text style={styles.value}>{blockchainRecord.rideId}</Text>
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Status</Text>
              <Text
                style={[
                  styles.value,
                  blockchainRecord.status === "Confirmed"
                    ? { color: "#00c853" }
                    : { color: "#ffab00" },
                ]}
              >
                {blockchainRecord.status}
              </Text>
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Fare</Text>
              <Text style={styles.value}>
                {blockchainRecord.fare} {blockchainRecord.currency}
              </Text>
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Timestamp</Text>
              <Text style={styles.value}>{blockchainRecord.timestamp}</Text>
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Block</Text>
              <Text style={styles.value}>#{blockchainRecord.blockNumber}</Text>
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>From</Text>
              <Copyable label="From" value={blockchainRecord.from} />
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>To</Text>
              <Copyable label="To" value={blockchainRecord.to} />
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Smart Contract</Text>
              <Copyable
                label="Smart Contract"
                value={blockchainRecord.contract}
              />
            </View>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>Transaction Hash</Text>
              <Copyable
                label="Transaction Hash"
                value={blockchainRecord.txHash}
              />
            </View>
            <TouchableOpacity style={styles.explorerBtn} onPress={openExplorer}>
              <LinearGradient
                colors={["#43cea2", "#185a9d"]}
                style={styles.btnGradient}
                start={[0, 0]}
                end={[1, 0]}
              >
                <FontAwesome5 name="external-link-alt" size={16} color="#fff" />
                <Text style={styles.explorerText}>View on Blockchain</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#43cea2"
            />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 18,
    letterSpacing: 1,
  },
  card: {
    width: width > 400 ? 355 : "97%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 30,
    shadowColor: "#185a9d",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },
  rowSpace: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "#888",
    fontWeight: "500",
    fontSize: 14,
    maxWidth: 112,
  },
  value: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14,
    maxWidth: 180,
    textAlign: "right",
  },
  explorerBtn: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 18,
    marginBottom: -2,
  },
  btnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
  },
  explorerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 9,
    letterSpacing: 0.6,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 13,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 2,
  },
  backText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 6,
  },
});
