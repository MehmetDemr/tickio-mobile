import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { resetPassword } from "../../src/api/forgot-password/resetPasswordService";
import { sendOtp } from "../../src/api/forgot-password/sendOtpService";
import { verifyOtp } from "../../src/api/forgot-password/verifyOtpService";

import { PrimaryButton } from "../../src/components/auth/AuthPrimaryButton";
import { TextButton } from "../../src/components/auth/AuthTextButton";
import OtpInput from "../../src/components/forgot-password/OtpInput";
import { COLORS } from "../../src/constants/color";
import { LogoCard } from "@/src/components/auth/LogoCard";

type Step = 1 | 2 | 3;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const emailError = useMemo(() => {
    if (!email) return null;
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return ok ? null : "Please enter a valid email.";
  }, [email]);

  const passwordError = useMemo(() => {
    if (!newPassword) return null;

    if (newPassword.length < 8) {
      return "Password must be at least 8 characters.";
    }
    if (!/[A-Z]/.test(newPassword)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (/[^a-zA-Z0-9]/.test(newPassword)) {
      return "Password must not contain special characters.";
    }

    return null;
  }, [newPassword]);

  const canSendOtp = !!email && !emailError && !loading;
  const canVerifyOtp = otpCode.length === 6 && !loading;
  const canResetPassword =
    !!newPassword && !passwordError && !!verificationToken && !loading;

  async function handleSendOtp() {
    if (!canSendOtp) return;

    setLoading(true);
    try {
      await sendOtp(email.trim());
      setStep(2);
      Alert.alert("Success", "Verification code sent to your email.");
    } catch (error: any) {
      Alert.alert("Error", "Failed to send code.");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    if (!canVerifyOtp) return;

    setLoading(true);
    try {
      const data = await verifyOtp(email.trim(), otpCode);

      const token = data?.resetToken;

      if (!token) {
        throw new Error("Verification token not found.");
      }

      setVerificationToken(token);
      setStep(3);
      Alert.alert("Success", "Verification successful.");
    } catch (error: any) {
      Alert.alert("Error", "Verification failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword() {
    if (!canResetPassword) return;

    setLoading(true);
    try {
      await resetPassword(newPassword, verificationToken);
      Alert.alert("Success", "Password reset successfully.", [
        {
          text: "Go to Login",
          onPress: () => router.replace("/"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Error", error?.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.page}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Recover your account in three simple steps.
          </Text>

          <View style={styles.stepRow}>
            <View style={[styles.stepDot, step >= 1 && styles.stepDotActive]}>
              <Text
                style={[
                  styles.stepDotText,
                  step >= 1 && styles.stepDotTextActive,
                ]}
              >
                1
              </Text>
            </View>
            <View
              style={[styles.stepLine, step >= 2 && styles.stepLineActive]}
            />
            <View style={[styles.stepDot, step >= 2 && styles.stepDotActive]}>
              <Text
                style={[
                  styles.stepDotText,
                  step >= 2 && styles.stepDotTextActive,
                ]}
              >
                2
              </Text>
            </View>
            <View
              style={[styles.stepLine, step >= 3 && styles.stepLineActive]}
            />
            <View style={[styles.stepDot, step >= 3 && styles.stepDotActive]}>
              <Text
                style={[
                  styles.stepDotText,
                  step >= 3 && styles.stepDotTextActive,
                ]}
              >
                3
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <LogoCard
              source={require("../../src/assets/images/tickio-mobile.png")}
            />
            {step === 1 ? (
              <>
                <Text style={styles.sectionTitle}>Enter your email</Text>
                <Text style={styles.sectionSub}>
                  We’ll send a verification code to your email address.
                </Text>

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="example@gmail.com"
                    placeholderTextColor="#6b7280"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                  {emailError ? (
                    <Text style={styles.error}>{emailError}</Text>
                  ) : null}
                </View>

                <PrimaryButton
                  title="Send Code"
                  onPress={handleSendOtp}
                  loading={loading}
                  disabled={!canSendOtp}
                />
              </>
            ) : null}

            {step === 2 ? (
              <>
                <Text style={styles.sectionTitle}>Verify OTP</Text>
                <Text style={styles.sectionSub}>
                  Enter the 6-digit code sent to {email}
                </Text>

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>Verification Code</Text>
                  <OtpInput value={otpCode} onChange={setOtpCode} />
                </View>

                <PrimaryButton
                  title="Verify Code"
                  onPress={handleVerifyOtp}
                  loading={loading}
                  disabled={!canVerifyOtp}
                />

                <TextButton title="Send again" onPress={handleSendOtp} />
              </>
            ) : null}

            {step === 3 ? (
              <>
                <Text style={styles.sectionTitle}>Set New Password</Text>
                <Text style={styles.sectionSub}>
                  Create a new secure password for your account.
                </Text>

                <View style={styles.fieldWrap}>
                  <Text style={styles.label}>New Password</Text>
                  <TextInput
                    value={newPassword}
                    onChangeText={setNewPassword}
                    placeholder="Enter new password"
                    placeholderTextColor="#6b7280"
                    secureTextEntry
                    style={styles.input}
                  />
                  {passwordError ? (
                    <Text style={styles.error}>{passwordError}</Text>
                  ) : null}
                </View>

                <PrimaryButton
                  title="Reset Password"
                  onPress={handleResetPassword}
                  loading={loading}
                  disabled={!canResetPassword}
                />
              </>
            ) : null}
          </View>

          <View style={styles.footerWrap}>
            <TextButton title="Back to login" onPress={() => router.back()} />
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: COLORS.soft,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 24,
    justifyContent: "center",
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "900",
    color: COLORS.dark,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
    marginBottom: 18,
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  stepDot: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotActive: {
    backgroundColor: COLORS.brand,
    borderColor: COLORS.brand,
  },
  stepDotText: {
    color: COLORS.dark,
    fontWeight: "900",
  },
  stepDotTextActive: {
    color: COLORS.white,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.mint,
  },
  stepLineActive: {
    backgroundColor: COLORS.brand,
  },
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.dark,
  },
  sectionSub: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.dark,
    opacity: 0.65,
  },
  fieldWrap: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.mint,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.accent,
  },
  footerWrap: {
    marginTop: 12,
    alignItems: "center",
  },
});
