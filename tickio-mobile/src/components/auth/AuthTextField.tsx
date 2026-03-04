import React, { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { COLORS } from "../../constants/color";

type Props = TextInputProps & {
  label: string;
  error?: string | null;
  secureToggle?: boolean;
};

export function AuthTextField({
  label,
  error,
  secureToggle,
  secureTextEntry,
  ...props
}: Props) {
  const [isSecure, setIsSecure] = useState(!!secureTextEntry);

  const resolvedSecure = useMemo(() => {
    if (!secureToggle) return secureTextEntry;
    return isSecure;
  }, [secureToggle, secureTextEntry, isSecure]);

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.inputRow, error ? styles.inputRowError : null]}>
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor="#6b7280"
          secureTextEntry={resolvedSecure}
          autoCapitalize={props.autoCapitalize ?? "none"}
        />

        {secureToggle ? (
          <Pressable onPress={() => setIsSecure((v) => !v)} hitSlop={10}>
            <Text style={styles.toggle}>
              {resolvedSecure ? "Show" : "Hide"}
            </Text>
          </Pressable>
        ) : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  inputRowError: {
    borderColor: COLORS.accent,
  },
  input: {
    flex: 1,
    fontSize: 12,
    color: "#0b1b16",
  },
  toggle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.brand,
    marginLeft: 10,
  },
  error: {
    marginTop: 0,
    fontSize: 10,
    color: COLORS.accent,
    fontWeight: "700",
  },
});
