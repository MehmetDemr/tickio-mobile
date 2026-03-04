import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  title: string;
  onPress: () => void;
};

export function TextButton({ title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.btn} hitSlop={10}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { alignItems: "center" },
  text: {
    color: COLORS.dark,
    fontWeight: "800",
    opacity: 0.8,
  },
});
