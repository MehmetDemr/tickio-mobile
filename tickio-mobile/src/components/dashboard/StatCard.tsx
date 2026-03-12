import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  label: string;
  value: string | number;
  hint?: string;
  icon?: string; // emoji
};

export default function StatCard({ label, value, hint, icon }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.row}>
        {icon ? <Text style={styles.icon}>{icon}</Text> : null}
        <Text style={styles.value}>{value}</Text>
      </View>

      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  label: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.dark,
    opacity: 0.65,
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  icon: { fontSize: 18, marginRight: 8 },
  value: { fontSize: 22, fontWeight: "900", color: COLORS.dark },
  hint: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.55,
  },
});