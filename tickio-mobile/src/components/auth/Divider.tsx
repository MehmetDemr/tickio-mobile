import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = { text?: string };

export function Divider({ text = "or" }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 14,
    paddingTop:0,
  },
  line: { flex: 1, height: 1, backgroundColor: COLORS.mint },
  text: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
  },
});
