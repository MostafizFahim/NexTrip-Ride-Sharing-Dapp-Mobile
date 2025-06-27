import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Share,
  Alert,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const { width } = Dimensions.get("window");

// Dummy referral code—replace with real code from backend/user profile
const referralCode = "NEX1234";
const inviteLink = `https://nextrip.com/invite/${referralCode}`;

export default function InviteFriendsScreen({ navigation }) {
  const [sharing, setSharing] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(referralCode);
    Alert.alert("Copied!", "Referral code copied to clipboard.");
  };

  const handleShare = async () => {
    try {
      setSharing(true);
      await Share.share({
        message: `Join NexTrip and get your first ride free! Use my code ${referralCode} or this link: ${inviteLink}`,
      });
    } catch (err) {
      Alert.alert("Error", "Could not share referral code.");
    } finally {
      setSharing(false);
    }
  };

  const handleOpenLink = () => {
    Linking.openURL(inviteLink).catch(() =>
      Alert.alert("Error", "Could not open the invite link.")
    );
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <View style={styles.container}>
        <FontAwesome5
          name="user-friends"
          size={48}
          color="#43cea2"
          style={{ marginBottom: 13 }}
        />
        <Text style={styles.title}>Invite Your Friends</Text>
        <Text style={styles.subtitle}>
          Share your code and earn rewards when your friends join NexTrip!
        </Text>

        {/* Referral Code Box */}
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{referralCode}</Text>
          <TouchableOpacity
            style={styles.copyBtn}
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel="Copy referral code"
          >
            <MaterialIcons name="content-copy" size={19} color="#43cea2" />
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>

        {/* Invite Link */}
        <Text style={styles.linkLabel}>Invite Link</Text>
        <TouchableOpacity
          onPress={handleOpenLink}
          accessibilityRole="link"
          accessibilityLabel="Open invite link"
        >
          <Text style={styles.inviteLink}>{inviteLink}</Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={[styles.shareBtn, sharing && { opacity: 0.6 }]}
          onPress={handleShare}
          disabled={sharing}
          accessibilityRole="button"
          accessibilityLabel="Share referral code"
        >
          <LinearGradient
            colors={["#43cea2", "#185a9d"]}
            style={styles.btnGradient}
            start={[0, 0]}
            end={[1, 0]}
          >
            <Ionicons name="share-social" size={19} color="#fff" />
            <Text style={styles.shareText}>
              {sharing ? "Sharing..." : "Share Code"}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Go Back */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <MaterialIcons name="chevron-left" size={21} color="#43cea2" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 15,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 8,
    letterSpacing: 1,
  },
  subtitle: {
    color: "#e7f9f4",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 22,
    lineHeight: 21,
  },
  codeBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 13,
    paddingHorizontal: 28,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    width: width > 400 ? 290 : "91%",
    justifyContent: "space-between",
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
    elevation: 5,
  },
  codeText: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 21,
    letterSpacing: 2,
  },
  copyBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f9f4",
    borderRadius: 8,
    paddingHorizontal: 11,
    paddingVertical: 6,
    marginLeft: 8,
  },
  copyText: {
    color: "#43cea2",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 15,
  },
  linkLabel: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 4,
    marginTop: 8,
  },
  inviteLink: {
    color: "#43cea2",
    textDecorationLine: "underline",
    marginBottom: 18,
    fontSize: 14,
    textAlign: "center",
  },
  shareBtn: {
    width: width > 400 ? 210 : "88%",
    borderRadius: 13,
    overflow: "hidden",
    marginTop: 7,
    marginBottom: 22,
  },
  btnGradient: {
    alignItems: "center",
    borderRadius: 13,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "center",
  },
  shareText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    marginLeft: 9,
    letterSpacing: 0.8,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 9,
    elevation: 2,
  },
  backText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 15,
    marginLeft: 6,
  },
});
