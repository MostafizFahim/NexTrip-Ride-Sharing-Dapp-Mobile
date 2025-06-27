import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const { width } = Dimensions.get("window");

// Dummy initial driver data (replace with real state/props/context)
const initialDriver = {
  name: "Mehedi Hasan",
  photo: require("../assets/driver-avatar.png"),
  car: "Toyota Prius",
  color: "White",
  number: "DHA-1234",
  rating: 4.86,
  totalRides: 215,
  earnings: 38140,
  phone: "+8801XXXXXXXXX",
  joinDate: "Dec 2023",
  documents: [
    { label: "Driving License", status: "Approved", file: null },
    { label: "Vehicle Registration", status: "Approved", file: null },
    { label: "NID", status: "Pending", file: null },
  ],
};

export default function DriverProfileScreen({ navigation }) {
  const [profile, setProfile] = useState(initialDriver);
  const [editProfile, setEditProfile] = useState(false);
  const [editVehicle, setEditVehicle] = useState(false);

  // Edit profile fields
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);

  // Edit vehicle fields
  const [car, setCar] = useState(profile.car);
  const [color, setColor] = useState(profile.color);
  const [number, setNumber] = useState(profile.number);

  // Document upload logic (simulate)
  const handleUploadDoc = async (idx) => {
    // Use Expo ImagePicker for simulation
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });
    if (!result.cancelled) {
      let updatedDocs = [...profile.documents];
      updatedDocs[idx] = {
        ...updatedDocs[idx],
        file: result.assets[0]?.uri,
        status: "Pending",
      };
      setProfile({ ...profile, documents: updatedDocs });
      Alert.alert("Document Uploaded", "Status set to Pending for review.");
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    if (!name || !phone) {
      Alert.alert("All fields required");
      return;
    }
    setProfile((prev) => ({ ...prev, name, phone }));
    setEditProfile(false);
    Alert.alert("Profile updated!");
  };

  // Save vehicle changes
  const handleSaveVehicle = () => {
    if (!car || !color || !number) {
      Alert.alert("All fields required");
      return;
    }
    setProfile((prev) => ({
      ...prev,
      car,
      color,
      number,
    }));
    setEditVehicle(false);
    Alert.alert("Vehicle info updated!");
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar & Basic Info */}
        <View style={styles.avatarWrap}>
          <Image source={profile.photo} style={styles.avatar} />
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setEditProfile((prev) => !prev)}
          >
            <MaterialIcons name="edit" size={19} color="#43cea2" />
          </TouchableOpacity>
        </View>
        {/* Profile Edit */}
        {editProfile ? (
          <View style={styles.editSection}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSaveProfile}
            >
              <Text style={styles.saveText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.carInfo}>{profile.phone}</Text>
          </>
        )}

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statsBox}>
            <FontAwesome5 name="car-side" size={17} color="#185a9d" />
            <Text style={styles.statsText}>{profile.totalRides} Rides</Text>
          </View>
          <View style={styles.statsBox}>
            <MaterialIcons name="star-rate" size={17} color="#FFD600" />
            <Text style={styles.statsText}>{profile.rating} Rating</Text>
          </View>
          <View style={styles.statsBox}>
            <FontAwesome5 name="wallet" size={17} color="#43cea2" />
            <Text style={styles.statsText}>৳{profile.earnings} Earned</Text>
          </View>
        </View>

        {/* Vehicle Info */}
        <View style={styles.vehicleCard}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.sectionTitle}>Vehicle Information</Text>
            <TouchableOpacity onPress={() => setEditVehicle((prev) => !prev)}>
              <MaterialIcons name="edit" size={18} color="#185a9d" />
            </TouchableOpacity>
          </View>
          {editVehicle ? (
            <View style={styles.editSection}>
              <TextInput
                style={styles.input}
                placeholder="Car Model"
                value={car}
                onChangeText={setCar}
              />
              <TextInput
                style={styles.input}
                placeholder="Color"
                value={color}
                onChangeText={setColor}
              />
              <TextInput
                style={styles.input}
                placeholder="Car Number"
                value={number}
                onChangeText={setNumber}
              />
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSaveVehicle}
              >
                <Text style={styles.saveText}>Save Vehicle</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.vehicleText}>
                {profile.car} • {profile.color}
              </Text>
              <Text style={styles.vehicleNum}>{profile.number}</Text>
            </>
          )}
        </View>

        {/* Documents */}
        <View style={styles.docsCard}>
          <Text style={styles.sectionTitle}>Documents</Text>
          {profile.documents.map((doc, i) => (
            <View key={i} style={styles.docRow}>
              <Text style={styles.docLabel}>{doc.label}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.docStatus,
                    doc.status === "Approved"
                      ? { color: "#43cea2" }
                      : doc.status === "Pending"
                      ? { color: "#ffab00" }
                      : { color: "#d32f2f" },
                  ]}
                >
                  {doc.status}
                </Text>
                <TouchableOpacity
                  onPress={() => handleUploadDoc(i)}
                  style={styles.uploadBtn}
                >
                  <MaterialIcons
                    name="cloud-upload"
                    size={17}
                    color="#185a9d"
                  />
                  <Text style={styles.uploadText}>
                    {doc.file ? "Re-upload" : "Upload"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Go Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={22} color="#43cea2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 44,
    paddingBottom: 30,
    paddingHorizontal: 12,
  },
  avatarWrap: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: "#43cea2",
    backgroundColor: "#fff",
  },
  editBtn: {
    position: "absolute",
    bottom: 4,
    right: width > 400 ? -15 : -8,
    backgroundColor: "#fff",
    borderRadius: 19,
    padding: 5,
    borderWidth: 1,
    borderColor: "#43cea2",
    elevation: 2,
  },
  name: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 21,
    marginBottom: 1,
    letterSpacing: 1,
  },
  carInfo: {
    color: "#43cea2",
    fontSize: 13.7,
    marginBottom: 7,
  },
  statsRow: {
    flexDirection: "row",
    width: width > 400 ? 330 : "97%",
    justifyContent: "space-between",
    marginTop: 9,
    marginBottom: 10,
  },
  statsBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 17,
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
    marginHorizontal: 4,
  },
  statsText: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 8,
  },
  vehicleCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: width > 400 ? 340 : "95%",
    padding: 17,
    marginBottom: 14,
    elevation: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  sectionTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 7,
    letterSpacing: 1,
  },
  vehicleText: {
    color: "#43cea2",
    fontWeight: "600",
    fontSize: 15,
    marginTop: 6,
  },
  vehicleNum: {
    color: "#888",
    fontSize: 14,
    marginBottom: 5,
    marginTop: 2,
  },
  editSection: { width: "100%", marginBottom: 6, marginTop: 7 },
  input: {
    backgroundColor: "#e7f9f4",
    borderRadius: 10,
    padding: 11,
    fontSize: 15,
    color: "#185a9d",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#b3efdd",
  },
  saveBtn: {
    backgroundColor: "#43cea2",
    borderRadius: 11,
    padding: 11,
    alignItems: "center",
    marginTop: 1,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  docsCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: width > 400 ? 340 : "95%",
    padding: 17,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  docRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  docLabel: { color: "#888", fontSize: 14 },
  docStatus: { fontWeight: "bold", fontSize: 14, marginRight: 10 },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f9f4",
    borderRadius: 7,
    paddingHorizontal: 11,
    paddingVertical: 6,
    marginLeft: 2,
  },
  uploadText: {
    color: "#185a9d",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 2,
    marginTop: 8,
  },
  backText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
});
