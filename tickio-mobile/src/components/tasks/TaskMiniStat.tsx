import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  label: string;
  value: number;
};

export default function TaskMiniStat({ label, value }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  value: {
    fontSize: 20,
    fontWeight: "900",
    color: COLORS.dark,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.6,
  },
});
