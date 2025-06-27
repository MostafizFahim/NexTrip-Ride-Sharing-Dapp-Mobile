import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import StatusChip from "./StatusChip";

export default function DocumentUploadRow({
  label,
  status = "Pending", // "Pending" | "Uploaded" | "Rejected" | "Approved"
  onUpload,
  fileName,
  loading = false,
  error,
  style,
  children,
}) {
  return (
    <View style={[styles.row, style]}>
      <FontAwesome5
        name="file-alt"
        size={22}
        color="#43cea2"
        style={{ marginRight: 10 }}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>
        {fileName && (
          <Text style={styles.fileName}>
            <MaterialIcons name="attachment" size={14} color="#185a9d" />{" "}
            {fileName}
          </Text>
        )}
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
      <StatusChip label={status === "Uploaded" ? "Under Review" : status} />
      <TouchableOpacity
        style={styles.uploadBtn}
        onPress={onUpload}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size={18} color="#185a9d" />
        ) : (
          <MaterialIcons name="cloud-upload" size={21} color="#185a9d" />
        )}
      </TouchableOpacity>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.07,
  },
  label: {
    color: "#185a9d",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 1,
  },
  fileName: {
    color: "#43cea2",
    fontSize: 12.5,
    marginTop: 2,
    marginLeft: 2,
    fontWeight: "600",
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginTop: 3,
  },
  uploadBtn: {
    backgroundColor: "#e7f9f4",
    borderRadius: 9,
    marginLeft: 8,
    padding: 7,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 34,
    minHeight: 34,
  },
});
