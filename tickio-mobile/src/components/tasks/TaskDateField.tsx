import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  label: string;
  value: string;
  onChange: (isoString: string) => void;
  error?: string | null;
  minimumDate?: Date;
  maximumDate?: Date;
  disabled?: boolean;
};

export default function TaskDateField({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
  disabled
}: Props) {
  const [show, setShow] = useState(false);

  const selectedDate = value ? new Date(value) : new Date();

  const displayText = value
    ? new Date(value).toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Select a date";

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <TouchableOpacity
        style={[
          styles.input,
          error ? styles.inputError : null,
          disabled ? styles.inputDisabled : null,
        ]}
        onPress={() => !disabled && setShow(true)} 
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {displayText}
        </Text>
        <Text style={styles.icon}>📅</Text>
      </TouchableOpacity>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {show && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          onChange={(_, date) => {
            setShow(Platform.OS === "ios");
            if (date) onChange(date.toISOString());
            if (Platform.OS === "android") setShow(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 14 },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputError: {
    borderColor: COLORS.accent,
  },
  inputText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
  },
  placeholder: {
    color: "#6b7280",
  },
  icon: {
    fontSize: 16,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
  },
  inputDisabled: {
    backgroundColor: "#f3f4f6",
    opacity: 0.6,
  },
});
