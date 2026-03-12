import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  label: string;
  value: string;
};

export default function ProfileInfoRow({ label, value }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.mint,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.55,
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.dark,
  },
});