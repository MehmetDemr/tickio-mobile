import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  name: string;
  subtitle?: string;
};

export default function DashboardHeader({
  name,
  subtitle = "New Day New Life",
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Good to see you, {name} 👋</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 12 },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.dark,
    letterSpacing: 0.2,
  },
  sub: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.6,
  },
});