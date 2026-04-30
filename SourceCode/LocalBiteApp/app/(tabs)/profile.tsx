import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function ProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  const emailOk = useMemo(() => /\S+@\S+\.\S+/.test(email.trim()), [email]);

  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem("username");
      const storedEmail = await AsyncStorage.getItem("email");

      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);
    };

    loadUser();
  }, []);

  const onSave = () => {
    if (!emailOk) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }
    Alert.alert("Saved", "Profile updated (UI only).");
  };

  const onLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Manage your details</Text>
        </View>

        <View style={styles.card}>
          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {name.trim().slice(0, 1).toUpperCase()}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.nameText}>{name}</Text>
              <Text style={styles.smallText}>{email}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={COLORS.muted2}
              style={styles.input}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={COLORS.muted2}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />
            {!emailOk ? (
              <Text style={styles.error}>Enter a valid email.</Text>
            ) : null}
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              value={location}
              onChangeText={setLocation}
              placeholder="City"
              placeholderTextColor={COLORS.muted2}
              style={styles.input}
            />
          </View>

          <TouchableOpacity
            style={styles.leaderboardButton}
            onPress={() => router.push("/leaderboard")}
          >
            <Text style={styles.leaderboardText}>🏆 View Leaderboard</Text>
          </TouchableOpacity>

          <View style={styles.achievementSection}>
            <Text style={styles.sectionTitle}>🏆 Achievements</Text>

            <View style={styles.achievementRow}>
              <View style={styles.achievementBox}>
                <Text style={styles.achievementNumber}>0</Text>
                <Text style={styles.achievementLabel}>Orders</Text>
              </View>

              <View style={styles.achievementBox}>
                <Text style={styles.achievementNumber}>0</Text>
                <Text style={styles.achievementLabel}>Badges</Text>
              </View>
            </View>

            <View style={styles.achievementRow}>
              <View style={styles.achievementBox}>
                <Text style={styles.achievementNumber}>0</Text>
                <Text style={styles.achievementLabel}>Day Streak</Text>
              </View>

              <View style={styles.achievementBox}>
                <Text style={styles.achievementNumber}>0</Text>
                <Text style={styles.achievementLabel}>Saved</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={onSave} style={styles.primaryBtn}>
            <MaterialIcons name="save" size={18} color={COLORS.bg} />
            <Text style={styles.primaryText}>Save</Text>
          </Pressable>

          <Pressable onPress={onLogout} style={styles.outlineBtn}>
            <MaterialIcons name="logout" size={18} color={COLORS.accent} />
            <Text style={styles.outlineText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
  scroll: { paddingBottom: 110 },

  header: { paddingHorizontal: 16, paddingTop: 80, paddingBottom: 20 },
  title: { color: COLORS.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: COLORS.muted, marginTop: 6 },

  card: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: COLORS.accent, fontWeight: "900", fontSize: 20 },
  nameText: { color: COLORS.text, fontWeight: "900", fontSize: 18 },
  smallText: { color: COLORS.muted, marginTop: 4 },

  field: { marginTop: 12 },
  label: { color: COLORS.text, fontWeight: "700", marginBottom: 8 },
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

  primaryBtn: {
    marginTop: 16,
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  primaryText: { color: COLORS.bg, fontWeight: "900", fontSize: 16 },

  outlineBtn: {
    marginTop: 12,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: COLORS.surface2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  outlineText: { color: COLORS.accent, fontWeight: "900", fontSize: 16 },

  achievementSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  sectionTitle: {
    color: COLORS.text,
    fontWeight: "900",
    fontSize: 18,
    marginBottom: 12,
  },

  achievementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  achievementBox: {
    flex: 1,
    backgroundColor: COLORS.surface2,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 4,
  },

  achievementNumber: {
    color: COLORS.accent,
    fontSize: 20,
    fontWeight: "900",
  },

  achievementLabel: {
    color: COLORS.muted,
    marginTop: 6,
    fontSize: 13,
  },

  leaderboardButton: {
    marginTop: 20,
    backgroundColor: "#ff8c1a",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  leaderboardText: {
    color: "#1a1208",
    fontWeight: "bold",
    fontSize: 16,
  },
});
