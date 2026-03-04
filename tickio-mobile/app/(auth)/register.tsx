import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { register } from "@/src/api/auth/registerService";
import { PrimaryButton } from "../../src/components/auth/AuthPrimaryButton";
import { TextButton } from "../../src/components/auth/AuthTextButton";
import { AuthTextField } from "../../src/components/auth/AuthTextField";
import { AuthTitle } from "../../src/components/auth/AuthTitle";
import { Divider } from "../../src/components/auth/Divider";
import { LogoCard } from "../../src/components/auth/LogoCard";
import { COLORS } from "../../src/constants/color";

const { height } = Dimensions.get("window");

export default function RegisterPage() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);

  const userNameError = useMemo(() => {
    if (!userName) return null;
    if (userName.trim().length < 3) {
      return "The username must be at least 3 characters long.";
    }
    const userNameSpecialChar = /^[a-zA-Z0-9]+$/.test(userName);

    if (!userNameSpecialChar) {
      return "Usernames cannot contain special characters.";
    }
  }, [userName]);

  const emailError = useMemo(() => {
    if (!email) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return ok ? null : "Please enter a valid email.";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!password || password.trim().length < 8) {
      return "The password must be at least 8 characters long.";
    }

    const passwordSpecialChar = /^[a-zA-Z0-9]+$/.test(password);

    if (!passwordSpecialChar) {
      return "Passwords cannot contain special characters.";
    }
  }, [password]);

  const password2Error = useMemo(() => {
    if (!password2) return null;
    return password2 === password ? null : "Passwords do not match.";
  }, [password2, password]);

  const canSubmit =
    !!userName &&
    !!email &&
    !!password &&
    !!password2 &&
    !userNameError &&
    !emailError &&
    !passwordError &&
    !password2Error &&
    !loading;

  async function handleRegister() {
    if (!canSubmit) return;

    setLoading(true);

    try {
      const data = await register(email, userName, password);

      console.log("Register successful:", data);
      router.replace("/");
    } catch (error: any) {
      console.log("Register failed:", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.kav}
    >
      <View style={styles.card}>
        <LogoCard
          source={require("../../src/assets/images/tickio-mobile.png")}
        />

        <AuthTitle
          title="Welcome 👋"
          subtitle="Create your account to continue."
        />

        <AuthTextField
          label="Username"
          value={userName}
          onChangeText={setUserName}
          placeholder="username"
          autoCapitalize="none"
          error={userNameError}
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

        <AuthTextField
          label="Confirm Password"
          value={password2}
          onChangeText={setPassword2}
          placeholder="••••••••"
          secureTextEntry
          secureToggle
          error={password2Error}
        />

        <PrimaryButton
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          disabled={!canSubmit}
        />

        <Divider text="or" />

        <TextButton
          title="Already have an account? Log in"
          onPress={() => router.push("/")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  kav: { flex: 1, justifyContent: "center", backgroundColor: COLORS.soft },
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
    alignSelf: "center",
    width: "100%",
    maxWidth: 340,
    maxHeight: height * 0.9,
  },
});
