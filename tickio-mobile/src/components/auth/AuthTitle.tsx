import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  title?: string;
  subtitle?: string;
};

export function AuthTitle({
  title = "Welcome back 👋",
  subtitle = "Log in to continue your streak.",
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.sub}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginBottom: 18 },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.dark,
    letterSpacing: 0.2,
    textAlign: "center",
  },
  sub: {
    marginTop: 6,
    fontSize: 14,
    color: "#2f3a36",
    opacity: 0.85,
    textAlign: "center",
  },
});
