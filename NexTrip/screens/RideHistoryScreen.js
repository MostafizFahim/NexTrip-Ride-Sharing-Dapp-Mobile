import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Feather } from "@expo/vector-icons";

// Dummy ride history data
const rides = [
  {
    id: "1",
    date: "2025-06-25",
    pickup: "Bashundhara R/A",
    dropoff: "Dhanmondi 27",
    fare: 320,
    status: "Completed",
  },
  {
    id: "2",
    date: "2025-06-18",
    pickup: "Mirpur DOHS",
    dropoff: "Gulshan 1",
    fare: 220,
    status: "Completed",
  },
  {
    id: "3",
    date: "2025-06-10",
    pickup: "Uttara Sector 7",
    dropoff: "Banasree",
    fare: 400,
    status: "Cancelled",
  },
  // Add more as needed...
];

const { width } = Dimensions.get("window");

export default function RideHistoryScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500); // simulate loading
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.bg}
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.headerTitle}>Ride History</Text>
          <FlatList
            data={rides}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={
              <View style={styles.emptyBox}>
                <Feather name="file-text" size={48} color="#bbb" />
                <Text style={styles.emptyText}>No rides yet</Text>
              </View>
            }
            contentContainerStyle={{
              paddingBottom: 30,
              paddingTop: 8,
              minHeight: 300,
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.rideCard}
                onPress={() => alert(`Clicked ride ID: ${item.id}`)}
              >
                <View style={styles.row}>
                  <MaterialIcons
                    name={
                      item.status === "Completed" ? "check-circle" : "cancel"
                    }
                    size={28}
                    color={item.status === "Completed" ? "#43cea2" : "#b71c1c"}
                    style={{ marginRight: 8 }}
                  />
                  <View>
                    <Text style={styles.rideDate}>{item.date}</Text>
                    <View style={styles.routeRow}>
                      <MaterialIcons
                        name="my-location"
                        size={17}
                        color="#185a9d"
                      />
                      <Text style={styles.routeText}> {item.pickup} </Text>
                      <MaterialIcons
                        name="arrow-forward"
                        size={17}
                        color="#43cea2"
                      />
                      <Text style={styles.routeText}> {item.dropoff} </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.rowEnd}>
                  <FontAwesome5 name="money-bill" size={15} color="#00c853" />
                  <Text style={styles.fareText}>৳{item.fare}</Text>
                  <Text
                    style={[
                      styles.status,
                      item.status === "Completed"
                        ? styles.completed
                        : styles.cancelled,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  safe: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 28 : 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 22,
    letterSpacing: 1,
    textAlign: "center",
    textShadowColor: "#185a9d77",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    marginTop: 16,
  },
  rideCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
  },
  row: { flexDirection: "row", alignItems: "center" },
  rowEnd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  rideDate: {
    color: "#888",
    fontWeight: "bold",
    marginBottom: 7,
    fontSize: 13,
  },
  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: 3,
  },
  routeText: {
    color: "#185a9d",
    fontSize: 15,
    fontWeight: "600",
    marginHorizontal: 2,
  },
  fareText: {
    color: "#00c853",
    fontWeight: "700",
    fontSize: 15,
    marginHorizontal: 7,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 13,
    marginLeft: 8,
    overflow: "hidden",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  completed: { backgroundColor: "#43cea211", color: "#43cea2" },
  cancelled: { backgroundColor: "#b71c1c18", color: "#b71c1c" },
  emptyBox: {
    alignItems: "center",
    marginTop: 80,
    opacity: 0.8,
  },
  emptyText: {
    color: "#888",
    fontSize: 18,
    marginTop: 14,
    fontWeight: "600",
  },
});
