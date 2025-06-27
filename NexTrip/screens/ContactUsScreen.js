import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Linking,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const supportPhone = "+8801234567890";
const supportEmail = "support@nextrip.com";

export default function ContactUsScreen() {
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);

  const handleCall = () => Linking.openURL(`tel:${supportPhone}`);
  const handleEmail = () => Linking.openURL(`mailto:${supportEmail}`);

  const handleSend = () => {
    if (!msg.trim()) {
      Alert.alert("Please enter your message.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setMsg("");
      Alert.alert("Message sent!", "Our team will contact you soon.");
    }, 1200);
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.headerRow}>
              <Ionicons name="mail-unread" size={28} color="#43cea2" />
              <Text style={styles.title}>Contact Us</Text>
            </View>
            <Text style={styles.subtitle}>
              Reach out anytime! Our support team is here to help.
            </Text>
            {/* Quick Contact Buttons */}
            <View style={styles.quickRow}>
              <TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
                <MaterialIcons name="call" size={22} color="#43cea2" />
                <Text style={styles.contactText}>Call</Text>
                <Text style={styles.contactInfo}>{supportPhone}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactBtn} onPress={handleEmail}>
                <MaterialIcons name="email" size={22} color="#185a9d" />
                <Text style={styles.contactText}>Email</Text>
                <Text style={styles.contactInfo}>{supportEmail}</Text>
              </TouchableOpacity>
            </View>
            {/* Direct Message Form */}
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Send us a message</Text>
              <TextInput
                style={styles.input}
                placeholder="Describe your issue or feedback..."
                value={msg}
                onChangeText={setMsg}
                multiline
                numberOfLines={5}
                editable={!sending}
                textAlignVertical="top"
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.sendBtn}
                onPress={handleSend}
                disabled={sending}
              >
                <LinearGradient
                  colors={["#43cea2", "#185a9d"]}
                  style={styles.btnGradient}
                  start={[0, 0]}
                  end={[1, 0]}
                >
                  <MaterialIcons name="send" size={20} color="#fff" />
                  <Text style={styles.sendText}>
                    {sending ? "Sending..." : "Send"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 34,
    paddingBottom: 34,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 23,
    marginLeft: 12,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#e7f9f4",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 21,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width > 400 ? 350 : "98%",
    marginBottom: 20,
  },
  contactBtn: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 6,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  contactText: {
    color: "#185a9d",
    fontWeight: "bold",
    marginTop: 6,
    fontSize: 15,
  },
  contactInfo: {
    color: "#43cea2",
    fontSize: 12.7,
    marginTop: 1,
  },
  formCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    width: width > 400 ? 350 : "97%",
    padding: 16,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  formTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.5,
    marginBottom: 9,
  },
  input: {
    backgroundColor: "#e7f9f4",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    color: "#185a9d",
    minHeight: 60,
    borderWidth: 1,
    borderColor: "#b3efdd",
    marginBottom: 13,
    textAlignVertical: "top",
  },
  sendBtn: {
    borderRadius: 12,
    overflow: "hidden",
  },
  btnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 13,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
    letterSpacing: 0.8,
  },
});
