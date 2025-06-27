import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppTextInput({
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  keyboardType = "default",
  error,
  style,
  inputStyle,
  ...props
}) {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.inputRow}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={[styles.input, inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#888"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          {...props}
        />
      </View>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 15,
    width: "100%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e7f9f4",
    paddingHorizontal: 13,
    paddingVertical: 7,
    elevation: 2,
    shadowColor: "#185a9d",
    shadowOpacity: 0.06,
  },
  icon: {
    marginRight: 9,
  },
  input: {
    flex: 1,
    color: "#185a9d",
    fontSize: 16.2,
    paddingVertical: 6,
  },
  error: {
    color: "#d32f2f",
    marginTop: 4,
    marginLeft: 7,
    fontSize: 13.2,
    fontWeight: "500",
  },
});
