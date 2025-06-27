import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const STORAGE_KEY = "userProfile";

const defaultProfile = {
  name: "Mehedi Hasan",
  email: "mehedi@nextrip.com",
  phone: "+8801XXXXXXXXX",
  avatar: require("../assets/profile-avatar.png"),
};

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState(defaultProfile.name);
  const [email, setEmail] = useState(defaultProfile.email);
  const [phone, setPhone] = useState(defaultProfile.phone);
  const [avatar, setAvatar] = useState(defaultProfile.avatar);

  // Load saved profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedProfile) {
          const profile = JSON.parse(savedProfile);
          setName(profile.name || defaultProfile.name);
          setEmail(profile.email || defaultProfile.email);
          setPhone(profile.phone || defaultProfile.phone);
          if (profile.avatar) {
            // avatar URI saved as string? For now, keep default avatar
            // You can add image picker later to update avatar
          }
        }
      } catch (e) {
        Alert.alert("Error loading profile");
      }
    };
    loadProfile();
  }, []);

  // Save updated profile locally
  const handleSave = async () => {
    if (!name || !email || !phone) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    try {
      const profile = { name, email, phone, avatar };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      Alert.alert("Profile updated!");
      navigation.goBack();
    } catch (e) {
      Alert.alert("Failed to save profile");
    }
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Edit Profile</Text>
          {/* Avatar (optional: make clickable for image picker) */}
          <TouchableOpacity>
            <Image source={avatar} style={styles.avatar} />
            <View style={styles.cameraWrap}>
              <FontAwesome name="camera" size={20} color="#185a9d" />
            </View>
          </TouchableOpacity>
          {/* Name */}
          <View style={styles.inputRow}>
            <MaterialIcons name="person" size={22} color="#43cea2" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>
          {/* Email */}
          <View style={styles.inputRow}>
            <MaterialIcons name="email" size={22} color="#185a9d" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          {/* Phone */}
          <View style={styles.inputRow}>
            <MaterialIcons name="phone" size={22} color="#43cea2" />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              placeholderTextColor="#888"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.btnGradient}
              start={[0, 0]}
              end={[1, 0]}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 14,
    letterSpacing: 1,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 2,
    borderColor: "#43cea2",
    marginBottom: 9,
    backgroundColor: "#fff",
  },
  cameraWrap: {
    position: "absolute",
    bottom: 7,
    right: 7,
    backgroundColor: "#e7f9f4",
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: "#43cea2",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 13,
    paddingHorizontal: 13,
    paddingVertical: 10,
    marginBottom: 13,
    width: width > 400 ? 340 : "97%",
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f2f2f2",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
    paddingVertical: 4,
  },
  saveBtn: {
    width: width > 400 ? 210 : "90%",
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 17,
  },
  btnGradient: {
    paddingVertical: 13,
    alignItems: "center",
    borderRadius: 14,
  },
  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.9,
  },
});
