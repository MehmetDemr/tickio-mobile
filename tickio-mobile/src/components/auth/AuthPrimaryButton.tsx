import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function PrimaryButton({ title, onPress, loading, disabled }: Props) {
  const isDisabled = !!disabled || !!loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.btn,
        isDisabled ? styles.btnDisabled : null,
        pressed && !isDisabled ? styles.btnPressed : null,
      ]}
    >
      <View style={styles.row}>
        {loading ? <ActivityIndicator /> : null}
        <Text style={[styles.text, loading ? { marginLeft: 10 } : null]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.brand,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
    marginTop: 0,
  },
  btnPressed: { transform: [{ scale: 0.99 }] },
  btnDisabled: { opacity: 0.65 },
  row: { flexDirection: "row", alignItems: "center" },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
});
