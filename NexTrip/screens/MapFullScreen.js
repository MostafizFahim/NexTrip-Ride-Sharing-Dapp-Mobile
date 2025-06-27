import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

const initialRegion = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export default function MapFullScreen({ navigation, route }) {
  const [selected, setSelected] = useState(null);
  const mapRef = useRef(null);
  const initialLocationSet = useRef(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.initialLocation && !initialLocationSet.current) {
      setSelected(route.params.initialLocation);
      mapRef.current?.animateToRegion({
        ...route.params.initialLocation,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03,
      });
      initialLocationSet.current = true;
    }
  }, [route.params?.initialLocation]);

  const handleSelect = (e) => {
    setSelected(e.nativeEvent.coordinate);
  };

  const handleConfirm = async () => {
    if (!selected) return;

    try {
      const [addressInfo] = await Location.reverseGeocodeAsync(selected);
      const address =
        [
          addressInfo?.name,
          addressInfo?.street,
          addressInfo?.city,
          addressInfo?.region,
        ]
          .filter(Boolean)
          .join(", ") ||
        `Lat: ${selected.latitude.toFixed(
          5
        )}, Lng: ${selected.longitude.toFixed(5)}`;

      navigation.navigate({
        name: route.params.returnTo || "BookRide",
        params: {
          locationType: route.params.locationType,
          address,
          coordinates: selected,
        },
        merge: true,
      });
    } catch (error) {
      console.error("Reverse geocoding failed:", error);
      Alert.alert("Error", "Failed to get address. Please try again.");
    }
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#43cea2" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {route.params?.locationType === "pickup"
            ? "Select Pickup Location"
            : "Select Dropoff Location"}
        </Text>
        <TouchableOpacity
          style={[styles.confirmBtn, !selected && { backgroundColor: "#ccc" }]}
          onPress={handleConfirm}
          disabled={!selected}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton
        onPress={handleSelect}
      >
        {selected && (
          <Marker
            coordinate={selected}
            draggable
            onDragEnd={handleSelect}
            pinColor="#43cea2"
          />
        )}
      </MapView>
    </LinearGradient>
  );
}

// ... (keep the same styles as before)

const styles = StyleSheet.create({
  bg: { flex: 1 },
  topBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    backgroundColor: "rgba(255,255,255,0.95)",
    height: 56,
    zIndex: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backBtn: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#185a9d",
    maxWidth: "60%",
    textAlign: "center",
  },
  confirmBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#43cea2",
    borderRadius: 14,
    minWidth: 80,
    alignItems: "center",
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  map: {
    flex: 1,
    marginTop: 56,
  },
});
