import React from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/color";

type Props = { children: React.ReactNode };

export function LoginLayout({ children }: Props) {
  return (
      <View style={styles.container}>{children}</View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.soft, 
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: "center",
  },
});