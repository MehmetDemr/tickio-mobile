import { Stack } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../src/constants/color";

export default function RegisterLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.soft,
  },
});
