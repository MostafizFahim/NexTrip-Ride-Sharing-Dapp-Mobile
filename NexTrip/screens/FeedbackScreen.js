import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function FeedbackScreen({ navigation }) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);

  const MAX_MESSAGE_LENGTH = 500;

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) {
      Alert.alert("Please fill in subject and message.");
      return;
    }
    setSending(true);
    // simulate async sending
    setTimeout(() => {
      setSending(false);
      Alert.alert("Thank you!", "Your feedback has been submitted.");
      setSubject("");
      setMessage("");
      setContact("");
      navigation.goBack();
    }, 1500);
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
          <Text style={styles.title}>We Value Your Feedback</Text>
          <MaterialIcons
            name="feedback"
            size={48}
            color="#43cea2"
            style={{ marginBottom: 17 }}
          />

          <TextInput
            style={styles.input}
            placeholder="Subject"
            placeholderTextColor="#888"
            value={subject}
            onChangeText={setSubject}
            maxLength={60}
            editable={!sending}
          />
          <TextInput
            style={[styles.input, { minHeight: 95 }]}
            placeholder="Type your feedback, question, or report here..."
            placeholderTextColor="#888"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={5}
            maxLength={MAX_MESSAGE_LENGTH}
            editable={!sending}
          />
          <Text style={styles.charCount}>
            {message.length} / {MAX_MESSAGE_LENGTH}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Your email or phone (optional)"
            placeholderTextColor="#888"
            value={contact}
            onChangeText={setContact}
            maxLength={50}
            keyboardType="email-address"
            editable={!sending}
          />

          <TouchableOpacity
            style={[styles.submitBtn, sending && styles.submitBtnDisabled]}
            onPress={handleSubmit}
            disabled={sending}
            activeOpacity={0.8}
            accessibilityLabel="Submit feedback"
          >
            <LinearGradient
              colors={["#43cea2", "#185a9d"]}
              style={styles.btnGradient}
              start={[0, 0]}
              end={[1, 0]}
            >
              {sending ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.submitText}>Submit Feedback</Text>
              )}
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
    paddingHorizontal: 22,
    paddingTop: 28,
  },
  title: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 6,
    letterSpacing: 1,
  },
  input: {
    width: width > 400 ? 340 : "97%",
    backgroundColor: "#fff",
    borderRadius: 13,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#222",
    marginBottom: 6,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
    elevation: 2,
  },
  charCount: {
    alignSelf: "flex-end",
    marginBottom: 7,
    marginRight: width > 400 ? 15 : 9,
    fontSize: 12,
    color: "#888",
  },
  submitBtn: {
    width: width > 400 ? 220 : "90%",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 10,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  btnGradient: {
    alignItems: "center",
    borderRadius: 15,
    paddingVertical: 14,
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.8,
  },
});
