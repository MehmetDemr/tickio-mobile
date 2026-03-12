import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  onPress: () => void;
};

export default function FloatingAddButton({ onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
      <Text style={styles.plus}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 18,
    bottom: 22,
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.brand,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 6,
  },
  pressed: { transform: [{ scale: 0.98 }] },
  plus: { color: COLORS.white, fontSize: 28, fontWeight: "900", marginTop: -2 },
});