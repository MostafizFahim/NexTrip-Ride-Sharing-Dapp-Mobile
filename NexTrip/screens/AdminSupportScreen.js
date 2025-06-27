import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Dummy support tickets
const dummyTickets = [
  {
    id: "t1",
    user: "Mehedi Hasan",
    role: "Passenger",
    email: "mehedi@nextrip.com",
    date: "2025-06-27",
    subject: "Payment not processing",
    message:
      "I tried to pay with my wallet, but the transaction fails every time.",
    status: "Open",
    reply: "",
  },
  {
    id: "t2",
    user: "Rakibul Hasan",
    role: "Driver",
    email: "rakibul@nextrip.com",
    date: "2025-06-26",
    subject: "Document verification delay",
    message: "My license was uploaded last week but it's still pending.",
    status: "Open",
    reply: "",
  },
  {
    id: "t3",
    user: "Sadia Anjum",
    role: "Passenger",
    email: "sadia@nextrip.com",
    date: "2025-06-25",
    subject: "Fare overcharged",
    message: "My last ride cost twice as much as estimated. Please review.",
    status: "Resolved",
    reply:
      "We have reviewed your fare and issued a refund. Thank you for reporting.",
  },
];

export default function AdminSupportScreen() {
  const [tickets, setTickets] = useState(dummyTickets);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setReplyText(ticket.reply || "");
    setModalVisible(true);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) {
      Alert.alert("Please enter a reply.");
      return;
    }
    setTickets((prev) =>
      prev.map((t) =>
        t.id === selectedTicket.id
          ? { ...t, reply: replyText, status: "Resolved" }
          : t
      )
    );
    setModalVisible(false);
    setTimeout(() => setReplyText(""), 350); // Reset reply field after closing
    Alert.alert("Reply sent. Ticket marked as resolved.");
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setReplyText(""), 350);
  };

  return (
    <LinearGradient
      colors={["#43cea2", "#185a9d"]}
      style={styles.bg}
      start={[0, 0]}
      end={[1, 1]}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Support Tickets</Text>
        {tickets.length === 0 && (
          <Text style={{ color: "#fff", fontSize: 16, marginTop: 20 }}>
            No tickets yet.
          </Text>
        )}
        {tickets.map((ticket) => (
          <TouchableOpacity
            key={ticket.id}
            style={styles.ticketCard}
            onPress={() => handleOpenTicket(ticket)}
            activeOpacity={0.8}
            accessibilityLabel={`Open support ticket from ${ticket.user}, subject: ${ticket.subject}`}
          >
            <View style={styles.rowBetween}>
              <Text style={styles.subject}>{ticket.subject}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="lens"
                  size={11}
                  color={ticket.status === "Resolved" ? "#00c853" : "#ffab00"}
                  style={{ marginRight: 3 }}
                />
                <Text
                  style={[
                    styles.status,
                    ticket.status === "Resolved"
                      ? { color: "#00c853" }
                      : { color: "#ffab00" },
                  ]}
                >
                  {ticket.status}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <FontAwesome5
                name={ticket.role === "Driver" ? "car" : "user"}
                size={13}
                color={ticket.role === "Driver" ? "#185a9d" : "#43cea2"}
                style={{ marginRight: 5 }}
              />
              <Text style={styles.user}>{ticket.user}</Text>
              <Text style={styles.email}>{ticket.email}</Text>
            </View>
            <Text style={styles.date}>{ticket.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for ticket details/reply */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Ticket Details</Text>
            {selectedTicket && (
              <>
                <Text style={styles.modalLabel}>From:</Text>
                <Text style={styles.modalUser}>
                  {selectedTicket.user} ({selectedTicket.role})
                </Text>
                <Text style={styles.modalLabel}>Subject:</Text>
                <Text style={styles.modalSubject}>
                  {selectedTicket.subject}
                </Text>
                <Text style={styles.modalLabel}>Message:</Text>
                <Text style={styles.modalMsg}>{selectedTicket.message}</Text>
                <Text style={styles.modalLabel}>Reply:</Text>
                <TextInput
                  style={styles.replyInput}
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChangeText={setReplyText}
                  multiline
                  editable={selectedTicket.status !== "Resolved"}
                />
                <View style={styles.modalBtns}>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={closeModal}
                  >
                    <Text style={styles.closeBtnText}>Close</Text>
                  </TouchableOpacity>
                  {selectedTicket.status !== "Resolved" && (
                    <TouchableOpacity
                      style={styles.replyBtn}
                      onPress={handleSendReply}
                    >
                      <Text style={styles.replyBtnText}>Send Reply</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: {
    alignItems: "center",
    paddingTop: 34,
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 13,
    letterSpacing: 1,
  },
  ticketCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: width > 400 ? 370 : "97%",
    padding: 15,
    marginBottom: 11,
    shadowColor: "#185a9d",
    shadowOpacity: 0.08,
    elevation: 4,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 2,
  },
  subject: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    marginRight: 7,
  },
  status: {
    fontWeight: "bold",
    fontSize: 14,
  },
  user: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 14.5,
    marginRight: 7,
  },
  email: {
    color: "#888",
    fontSize: 13,
  },
  date: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 12.5,
    marginTop: 3,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.19)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 17,
    width: width > 400 ? 360 : "94%",
    padding: 23,
    elevation: 8,
  },
  modalTitle: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 13,
    textAlign: "center",
  },
  modalLabel: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 13.5,
    marginTop: 5,
  },
  modalUser: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  modalSubject: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15.2,
    marginBottom: 2,
  },
  modalMsg: {
    color: "#222",
    fontSize: 14.5,
    marginBottom: 7,
    lineHeight: 21,
  },
  replyInput: {
    backgroundColor: "#e7f9f4",
    borderRadius: 11,
    padding: 11,
    fontSize: 14,
    color: "#185a9d",
    marginTop: 4,
    minHeight: 62,
    borderWidth: 1,
    borderColor: "#b3efdd",
    textAlignVertical: "top",
  },
  modalBtns: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 17,
  },
  closeBtn: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#43cea2",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 19,
    marginRight: 9,
  },
  closeBtnText: {
    color: "#43cea2",
    fontWeight: "bold",
    fontSize: 14.5,
  },
  replyBtn: {
    backgroundColor: "#43cea2",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 22,
  },
  replyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14.5,
  },
});
