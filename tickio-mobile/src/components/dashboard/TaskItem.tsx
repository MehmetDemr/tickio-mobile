import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  title: string;
  done?: boolean;
  onPress?: () => void;
};

export default function TaskItem({ title, done, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.checkbox, done ? styles.checkboxDone : null]}>
        {done ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={[styles.text, done ? styles.textDone : null]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: COLORS.mint,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  checkboxDone: { backgroundColor: COLORS.brand, borderColor: COLORS.brand },
  check: { color: COLORS.white, fontWeight: "900" },
  text: { flex: 1, color: COLORS.dark, fontWeight: "800" },
  textDone: { opacity: 0.55, textDecorationLine: "line-through" },
});