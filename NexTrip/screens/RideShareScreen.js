import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const STORAGE_KEY = "@shared_rides";

const dummySharedRides = [
  {
    id: "carpool1",
    driver: "Mehedi Hasan",
    vehicle: "Toyota Prius",
    from: "Bashundhara R/A",
    to: "Gulshan 1",
    date: "2025-06-28 08:00",
    seats: 2,
    fare: 80,
    status: "Available",
  },
  {
    id: "carpool2",
    driver: "Sadia Anjum",
    vehicle: "Honda Grace",
    from: "Mirpur 10",
    to: "Banani",
    date: "2025-06-28 09:15",
    seats: 1,
    fare: 60,
    status: "Available",
  },
];

export default function RideShareScreen() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [rides, setRides] = useState([]);

  useEffect(() => {
    // Load rides from AsyncStorage or fallback to dummy
    const loadRides = async () => {
      try {
        const storedRides = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedRides !== null) {
          setRides(JSON.parse(storedRides));
        } else {
          setRides(dummySharedRides);
          await AsyncStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(dummySharedRides)
          );
        }
      } catch (e) {
        console.error("Failed to load rides from storage", e);
        setRides(dummySharedRides);
      }
    };
    loadRides();
  }, []);

  const saveRides = async (newRides) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRides));
    } catch (e) {
      console.error("Failed to save rides to storage", e);
    }
  };

  const filteredRides = rides.filter(
    (r) =>
      (!from || r.from.toLowerCase().includes(from.toLowerCase())) &&
      (!to || r.to.toLowerCase().includes(to.toLowerCase()))
  );

  const handleJoin = (rideId) => {
    let joined = false;
    const updatedRides = rides.map((r) => {
      if (r.id === rideId) {
        if (r.seats > 0) {
          joined = true;
          const newSeats = r.seats - 1;
          return {
            ...r,
            seats: newSeats,
            status: newSeats === 0 ? "Full" : "Available",
          };
        } else {
          Alert.alert("No seats available in this carpool.");
        }
      }
      return r;
    });

    if (joined) {
      setRides(updatedRides);
      saveRides(updatedRides);
      Alert.alert("Joined Carpool!", "You have joined the carpool.");
    }
  };

  const handleCreate = () => {
    Alert.alert(
      "Feature Coming Soon",
      "You'll soon be able to offer your own carpool rides!"
    );
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Carpool / Ride Sharing</Text>

        <View style={styles.searchRow}>
          <MaterialIcons name="my-location" size={19} color="#185a9d" />
          <TextInput
            style={styles.input}
            placeholder="From"
            value={from}
            onChangeText={setFrom}
            placeholderTextColor="#888"
          />
          <MaterialIcons name="arrow-forward" size={17} color="#43cea2" />
          <TextInput
            style={styles.input}
            placeholder="To"
            value={to}
            onChangeText={setTo}
            placeholderTextColor="#888"
          />
        </View>

        <Text style={styles.sectionTitle}>Available Carpools</Text>
        {filteredRides.length === 0 ? (
          <Text style={styles.noRides}>No carpools found for your search.</Text>
        ) : (
          <FlatList
            data={filteredRides}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.rideCard}>
                <View style={styles.rowBetween}>
                  <Text style={styles.driver}>{item.driver}</Text>
                  <Text
                    style={[
                      styles.status,
                      item.status === "Available"
                        ? { color: "#43cea2" }
                        : { color: "#d32f2f" },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <Text style={styles.info}>
                  <MaterialIcons
                    name="directions-car"
                    size={16}
                    color="#185a9d"
                  />{" "}
                  {item.vehicle}
                </Text>
                <Text style={styles.info}>
                  <MaterialIcons name="my-location" size={14} color="#185a9d" />{" "}
                  {item.from}
                  {"  "}
                  <MaterialIcons
                    name="location-on"
                    size={14}
                    color="#43cea2"
                  />{" "}
                  {item.to}
                </Text>
                <View style={styles.rowBetween}>
                  <Text style={styles.details}>
                    <MaterialIcons name="event" size={14} color="#43cea2" />{" "}
                    {item.date}
                  </Text>
                  <Text style={styles.details}>
                    <FontAwesome5
                      name="user-friends"
                      size={13}
                      color="#43cea2"
                    />{" "}
                    {item.seats} seat{item.seats !== 1 ? "s" : ""}
                  </Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.fare}>
                    <MaterialIcons
                      name="attach-money"
                      size={15}
                      color="#00c853"
                    />
                    {item.fare}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.joinBtn,
                      item.status !== "Available" && { opacity: 0.5 },
                    ]}
                    onPress={() => handleJoin(item.id)}
                    disabled={item.status !== "Available"}
                  >
                    <Text style={styles.joinText}>
                      {item.status === "Available" ? "Join" : "Full"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}

        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            style={styles.btnGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <MaterialIcons name="add-circle-outline" size={21} color="#fff" />
            <Text style={styles.createText}>Offer Your Own Carpool</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 34,
    paddingHorizontal: 12,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    marginBottom: 14,
    letterSpacing: 1,
  },
  searchRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 13,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 13,
    width: width > 400 ? 350 : "97%",
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  input: {
    flex: 1,
    color: "#185a9d",
    fontSize: 15,
    marginHorizontal: 4,
    paddingVertical: 3,
    paddingHorizontal: 1,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16.5,
    alignSelf: "flex-start",
    marginLeft: 6,
    marginBottom: 7,
  },
  rideCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: width > 400 ? 350 : "97%",
    padding: 15,
    marginBottom: 13,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driver: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.5,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14.5,
  },
  info: {
    color: "#888",
    fontSize: 13.7,
    marginTop: 2,
    marginBottom: 2,
  },
  details: {
    color: "#185a9d",
    fontSize: 13,
    marginTop: 2,
  },
  fare: {
    color: "#00c853",
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 4,
    marginBottom: 4,
  },
  joinBtn: {
    backgroundColor: "#43cea2",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 9,
    elevation: 1,
  },
  joinText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  noRides: {
    color: "#fff",
    fontSize: 15,
    fontStyle: "italic",
    marginVertical: 17,
    opacity: 0.88,
  },
  createBtn: {
    borderRadius: 13,
    marginTop: 14,
    overflow: "hidden",
    width: width > 400 ? 270 : "80%",
    alignSelf: "center",
  },
  btnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    paddingVertical: 14,
  },
  createText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15.5,
    marginLeft: 10,
    letterSpacing: 0.7,
  },
});
