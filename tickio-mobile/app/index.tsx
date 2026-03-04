import React, { useMemo, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { login } from "@/src/api/auth/loginService";

import { router } from "expo-router";
import { PrimaryButton } from "../src/components/auth/AuthPrimaryButton";
import { TextButton } from "../src/components/auth/AuthTextButton";
import { AuthTextField } from "../src/components/auth/AuthTextField";
import { AuthTitle } from "../src/components/auth/AuthTitle";
import { Divider } from "../src/components/auth/Divider";
import { LoginLayout } from "../src/components/auth/LoginLayout";
import { LogoCard } from "../src/components/auth/LogoCard";
import { COLORS } from "../src/constants/color";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const emailError = useMemo(() => {
    if (!email) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return ok ? null : "Please enter a valid email.";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password) return null;
    return password.length >= 6 ? null : "Password enter a valid password.";
  }, [password]);

  const canSubmit =
    !!email && !!password && !emailError && !passwordError && !loading;

  async function handleLogin() {
    if (!canSubmit) return;

    setLoading(true);

    try {
      const data = await login(email, password);

      console.log("Login successful:", data);
      router.replace("/(dashboard)/mainpage");
    } catch (error: any) {
      console.log("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
      <LoginLayout>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.kav}
        >
          <View style={styles.card}>
            <LogoCard
              source={require("../src/assets/images/tickio-mobile.png")}
            />

            <AuthTitle
              title="Welcome back 👋"
              subtitle="Log in to Tickio and continue the series."
            />

            <AuthTextField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
            />

            <AuthTextField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              secureToggle
              error={passwordError}
            />

            <View style={styles.rowBetween}>
              <TextButton title="Forgot Password" onPress={() => {}} />
            </View>

            <PrimaryButton
              title="Log In"
              onPress={handleLogin}
              loading={loading}
              disabled={!canSubmit}
            />

            <Divider text="or" />

            <TextButton
              title="Create an account"
              onPress={() => router.push("/(auth)/register")}
            />
          </View>
        </KeyboardAvoidingView>
      </LoginLayout>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, justifyContent: "center" },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.mint,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    maxWidth: 340,
    maxHeight: height * 0.9,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
