import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
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

export default function SignupScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [touched, setTouched] = useState(false);

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);
  const nameOk = useMemo(() => name.trim().length >= 2, [name]);
  const passOk = useMemo(() => pass.length >= 6, [pass]);
  const matchOk = useMemo(() => confirm === pass && confirm.length > 0, [confirm, pass]);

  const canCreate = nameOk && emailOk && passOk && matchOk;

  const signup = async () => {
    try {
      const response = await fetch(
        "https://comp2003-2025-2026-18.onrender.com/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: pass
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Account created!");
      router.replace("/login");
    } catch (err) {
      console.log(err);
      alert("Network error");
    }
  };

  const onCreate = () => {
    setTouched(true);
    if (!canCreate) return;

    
    // After sign up, go back to login
    signup();
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Join LocalBite and find great food 🧡</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            onBlur={() => setTouched(true)}
            placeholder="Your name"
            placeholderTextColor={COLORS.muted2}
            style={styles.input}
          />
          {touched && !nameOk ? <Text style={styles.error}>Enter your name.</Text> : null}
        </View>

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
          {touched && !emailOk ? <Text style={styles.error}>Enter a valid email.</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={pass}
            onChangeText={setPass}
            onBlur={() => setTouched(true)}
            placeholder="At least 6 characters"
            placeholderTextColor={COLORS.muted2}
            secureTextEntry
            style={styles.input}
          />
          {touched && !passOk ? <Text style={styles.error}>Min 6 characters.</Text> : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm password</Text>
          <TextInput
            value={confirm}
            onChangeText={setConfirm}
            onBlur={() => setTouched(true)}
            placeholder="Re-enter password"
            placeholderTextColor={COLORS.muted2}
            secureTextEntry
            style={styles.input}
          />
          {touched && !matchOk ? <Text style={styles.error}>Passwords must match.</Text> : null}
        </View>

        <Pressable
          disabled={!canCreate}
          onPress={onCreate}
          style={({ pressed }) => [
            styles.button,
            !canCreate && styles.buttonDisabled,
            pressed && canCreate && { opacity: 0.9 },
          ]}
        >
          <Text style={styles.buttonText}>Create account</Text>
        </Pressable>

        <View style={styles.bottomRow}>
          <Text style={styles.bottomText}>Already have an account?</Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text style={styles.bottomLink}> Sign in</Text>
          </Pressable>
        </View>
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
  title: { color: COLORS.text, fontSize: 26, fontWeight: "900" },
  subtitle: { color: COLORS.muted, marginTop: 6, marginBottom: 16 },

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

  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
  },
  buttonDisabled: { backgroundColor: COLORS.accentDark, opacity: 0.6 },
  buttonText: { color: COLORS.bg, fontWeight: "900", fontSize: 16 },

  bottomRow: { flexDirection: "row", justifyContent: "center", marginTop: 14 },
  bottomText: { color: COLORS.muted },
  bottomLink: { color: COLORS.accent, fontWeight: "900" },
});
