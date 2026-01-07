import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";


const COLORS = {
  bg: "#0f0a05",
  surface: "#1a1208",
  surface2: "#120c06",
  border: "#2a1a0c",
  text: "#ffffff",
  muted: "#f0c7a0",
  muted2: "#c9a27a",
  accent: "#ff8c1a",
  accentDark: "#cc6f14",
  danger: "#ff6b6b",
};

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);
  const passwordOk = useMemo(() => password.length >= 6, [password]);
  const canLogin = emailOk && passwordOk;

  const login = async () => {
    try {
      const reponse = await fetch(
        "https://comp2003-2025-2026-18.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await Response.json();

      if (!response.ok) {
        Alert.alert("Login failed", data.message);
        return;
      }

      router.replace("/(tabs)");

    } catch (err) {
      console.log(err);
      Alert.alert("Network error", "Unable to reach server");
    }
  };

  const onLogin = () => {
    setTouched(true);
    if (!canLogin) return;

    login();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        {/* Brand */}
        <View style={styles.brandRow}>
          <View style={styles.logo}>
            <Text style={styles.logoIcon}>🍊</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>LocalBite</Text>
            <Text style={styles.tagline}>Local restaurants near you</Text>
          </View>
        </View>

        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            onBlur={() => setTouched(true)}
            placeholder="you@example.com"
            placeholderTextColor={COLORS.muted2}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />
          {touched && !emailOk ? (
            <Text style={styles.error}>Enter a valid email</Text>
          ) : null}
        </View>

        {/* Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouched(true)}
            placeholder="At least 6 characters"
            placeholderTextColor={COLORS.muted2}
            secureTextEntry
            style={styles.input}
          />
          {touched && !passwordOk ? (
            <Text style={styles.error}>Minimum 6 characters</Text>
          ) : null}
        </View>

        {/* Forgot */}
        <Pressable
          onPress={() => Alert.alert("Forgot password", "We can add reset later")}
          style={styles.forgotBtn}
        >
          <Text style={styles.forgotText}>Forgot password?</Text>
        </Pressable>

        {/* Login Button (disabled until valid) */}
        <Pressable
          disabled={!canLogin}
          onPress={onLogin}
          style={({ pressed }) => [
            styles.button,
            !canLogin && styles.buttonDisabled,
            pressed && canLogin && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>

        {/*  Sign up link */}
        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Don’t have an account?</Text>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={styles.bottomLink}> Sign up</Text>
          </Pressable>
        </View>

        <Text style={styles.note}>UI only for now — authentication later.</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 18,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  logoIcon: { fontSize: 22 },
  brand: { color: COLORS.text, fontSize: 28, fontWeight: "900" },
  tagline: { color: COLORS.muted, marginTop: 4 },

  field: { marginBottom: 14 },
  label: { color: COLORS.text, marginBottom: 8, fontWeight: "700" },
  input: {
    backgroundColor: COLORS.surface2,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
  },
  error: { color: COLORS.danger, marginTop: 8, fontSize: 12 },

  forgotBtn: { alignSelf: "flex-end", marginBottom: 14 },
  forgotText: { color: COLORS.accent, fontWeight: "800" },

  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: COLORS.accentDark, opacity: 0.6 },
  buttonText: { color: COLORS.bg, fontWeight: "900", fontSize: 16 },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },
  bottomText: { color: COLORS.muted },
  bottomLink: { color: COLORS.accent, fontWeight: "900" },

  note: { color: COLORS.muted2, marginTop: 14, fontSize: 12, textAlign: "center" },
});
