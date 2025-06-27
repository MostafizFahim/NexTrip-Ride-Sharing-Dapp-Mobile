import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
//import MapView from "react-native-maps";

import MapView, { Marker } from "react-native-maps";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

// Default location: Dhaka city center
const initialRegion = {
  latitude: 23.8103,
  longitude: 90.4125,
  latitudeDelta: 0.03,
  longitudeDelta: 0.03,
};

export default function MapFullScreen({ navigation, route }) {
  const [selected, setSelected] = useState(route?.params?.location || null);
  const [locationPermission, setLocationPermission] = useState(null);
  const mapRef = useRef(null);

  // Request permission on mount (optional)
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to use this feature."
        );
      }
    })();
  }, []);

  const handleUseMyLocation = async () => {
    if (!locationPermission) {
      Alert.alert(
        "Permission denied",
        "Enable location permission in settings to use this feature."
      );
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const loc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setSelected(loc);
      mapRef.current?.animateToRegion({
        ...loc,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to get current location.");
    }
  };

  const handleSelect = (e) => {
    setSelected(e.nativeEvent.coordinate);
  };

  const handleConfirm = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate({
        name: route?.params?.returnTo || "BookRide",
        params: { location: selected },
        merge: true,
      });
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
        <Text style={styles.title}>Select Location</Text>
        <TouchableOpacity style={styles.myLocBtn} onPress={handleUseMyLocation}>
          <MaterialIcons name="my-location" size={22} color="#185a9d" />
        </TouchableOpacity>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation
        showsMyLocationButton={Platform.OS === "android"}
        onPress={handleSelect}
      >
        {selected && (
          <Marker
            coordinate={selected}
            pinColor="#43cea2"
            draggable
            onDragEnd={handleSelect}
          />
        )}
      </MapView>
      <View style={styles.bottomBar}>
        <Text style={styles.locText}>
          {selected
            ? `Lat: ${selected.latitude.toFixed(
                5
              )}, Lng: ${selected.longitude.toFixed(5)}`
            : "Tap on the map to select a location."}
        </Text>
        <TouchableOpacity
          style={[styles.confirmBtn, !selected && { opacity: 0.5 }]}
          onPress={handleConfirm}
          disabled={!selected}
        >
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            style={styles.btnGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <MaterialIcons name="check-circle" size={20} color="#fff" />
            <Text style={styles.confirmText}>Confirm Location</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  topBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? 48 : 20,
    left: 0,
    right: 0,
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingBottom: 6,
    backgroundColor: "rgba(255,255,255,0.91)",
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    height: 54,
    justifyContent: "space-between",
  },
  backBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
    elevation: 2,
  },
  title: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 17.5,
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
  },
  myLocBtn: {
    backgroundColor: "#e7f9f4",
    borderRadius: 10,
    padding: 7,
    marginLeft: 10,
    elevation: 2,
  },
  map: {
    flex: 1,
    width,
    height,
    marginTop: Platform.OS === "ios" ? 54 : 54,
    zIndex: 1,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.97)",
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    alignItems: "center",
    padding: 17,
    zIndex: 5,
    elevation: 8,
  },
  locText: {
    color: "#185a9d",
    fontWeight: "600",
    fontSize: 15,
    marginBottom: 7,
    letterSpacing: 0.6,
  },
  confirmBtn: {
    borderRadius: 13,
    overflow: "hidden",
    width: width > 400 ? 270 : "90%",
    alignSelf: "center",
  },
  btnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    paddingVertical: 14,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15.5,
    marginLeft: 8,
    letterSpacing: 0.6,
  },
});
