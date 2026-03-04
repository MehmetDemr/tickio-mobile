import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = {
  source: any;
};

export function LogoCard({ source }: Props) {
  return (
    <View style={styles.wrap}>
      <View style={styles.card}>
        <Image source={source} style={styles.logo} resizeMode="contain" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "center", marginBottom: 18 },
  card: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    borderWidth: 1,
    borderColor: COLORS.mint,
  },
  logo: { width: 64, height: 64 },
});
