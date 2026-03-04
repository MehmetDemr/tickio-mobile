import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../src/constants/color";
import LoginScreen from ".";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>

     <Slot/>

      </View>
      
    </SafeAreaView>
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
