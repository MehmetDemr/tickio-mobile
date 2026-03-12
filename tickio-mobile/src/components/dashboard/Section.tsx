import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  title: string;
  rightText?: string;
  children: React.ReactNode;
};

export default function Section({ title, rightText, children }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.head}>
        <Text style={styles.title}>{title}</Text>
        {rightText ? <Text style={styles.right}>{rightText}</Text> : null}
      </View>

      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 12 },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  title: { fontSize: 16, fontWeight: "900", color: COLORS.dark },
  right: { fontSize: 12, fontWeight: "800", color: COLORS.dark, opacity: 0.55 },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 2,
  },
});