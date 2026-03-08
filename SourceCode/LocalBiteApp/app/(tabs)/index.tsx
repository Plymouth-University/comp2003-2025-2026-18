import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

/* ---------- TYPES ---------- */
type Restaurant = {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  minutes: number;
  price: "$" | "$$" | "$$$";
  distanceKm: number;
  imageUrl: string;
};

/* ---------- THEME ---------- */
const COLORS = {
  bg: "#0f0a05",
  surface: "#1a1208",
  surface2: "#120c06",
  border: "#2a1a0c",
  text: "#ffffff",
  muted: "#f0c7a0",
  muted2: "#c9a27a",
  accent: "#ff8c1a",
};

/* ---------- DATA ---------- */
const CATEGORIES = ["All", "Thai", "Italian", "American", "Indian", "Chinese", "Cafe",];

const RESTAURANTS: Restaurant[] = [
  {
    id: "1",
    name: "The Thai House",
    cuisine: "Thai",
    rating: 4.7,
    minutes: 18,
    price: "$$",
    distanceKm: 1.2,
    imageUrl:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Himalayan Spice",
    cuisine: "Indian",
    rating: 4.6,
    minutes: 22,
    price: "$$",
    distanceKm: 2.4,
    imageUrl:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Dockside Pizza",
    cuisine: "Pizza",
    rating: 4.4,
    minutes: 15,
    price: "$",
    distanceKm: 0.9,
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "4",
    name: "Burger Yard",
    cuisine: "Burgers",
    rating: 4.3,
    minutes: 12,
    price: "$",
    distanceKm: 1.0,
    imageUrl:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Lotus Cafe",
    cuisine: "Cafe",
    rating: 4.5,
    minutes: 10,
    price: "$",
    distanceKm: 0.6,
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Mr Wok Thai Fish Bar and Grill",
    cuisine: "Thai",
    rating: 4.2,
    minutes: 25,
    price: "$$",
    distanceKm: 3.1,
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Curry Leaf",
    cuisine: "Indian",
    rating: 4.8,
    minutes: 20,
    price: "$$",
    distanceKm: 1.5,
    imageUrl:
      "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    name: "Street Wok",
    cuisine: "Chinese",
    rating: 4.1,
    minutes: 17,
    price: "$",
    distanceKm: 1.1,
    imageUrl:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "9",
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.6,
    minutes: 14,
    price: "$$",
    distanceKm: 0.8,
    imageUrl:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "10",
    name: "Urban Burger Co.",
    cuisine: "Burgers",
    rating: 4.4,
    minutes: 16,
    price: "$",
    distanceKm: 1.9,
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "11",
    name: "Cafe Aroma",
    cuisine: "Cafe",
    rating: 4.3,
    minutes: 9,
    price: "$",
    distanceKm: 0.5,
    imageUrl:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80&auto=format&fit=crop",
  },
  {
    id: "12",
    name: "Veggie Perrin's",
    cuisine: "Indian",
    rating: 4.9,
    minutes: 23,
    price: "$$",
    distanceKm: 2.7,
    imageUrl:
      "https://images.unsplash.com/photo-1600628422019-17d2d7c63b15?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ---------- SCREEN ---------- */
export default function Discover() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fade.setValue(0.65);
    Animated.timing(fade, {
      toValue: 1,
      duration: 180,
      useNativeDriver: true,
    }).start();
  }, [search, category]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return RESTAURANTS.filter((r) => {
      const matchesSearch =
        q.length === 0 ||
        r.name.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q);

      const matchesCategory = category === "All" || r.cuisine === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      {/* ---------- HEADER ---------- */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>Local restaurants near you</Text>
          </View>

          <Pressable onPress={() => router.replace("/login")} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>

        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search restaurants or cuisine..."
          placeholderTextColor={COLORS.muted2}
          style={styles.search}
        />

        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => {
            const active = item === category;
            return (
              <Pressable
                onPress={() => setCategory(item)}
                style={[styles.chip, active && styles.chipActive]}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{item}</Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* ---------- LIST ---------- */}
      <Animated.View style={{ flex: 1, opacity: fade }}>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.card}
              onPress={() => router.push(`/restaurant/${item.id}`)} // ✅ ADDED
            >
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

              <View style={{ paddingTop: 12 }}>
                <View style={styles.cardHeaderRow}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.priceText}>{item.price}</Text>
                </View>

                <Text style={styles.cardMeta}>
                  {item.cuisine} • {item.minutes} min
                </Text>

                <View style={styles.cardInfoRow}>
                  <View style={styles.starsRow}>
                    <MaterialIcons name="star" size={18} color={COLORS.accent} />
                    <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                  </View>

                  <View style={styles.distanceRow}>
                    <MaterialIcons name="location-pin" size={18} color={COLORS.muted} />
                    <Text style={styles.distanceText}>{item.distanceKm.toFixed(1)} km</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyTitle}>No results</Text>
              <Text style={styles.emptyText}>Try a different search or category.</Text>
            </View>
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },

  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,
  },
  topRow: { flexDirection: "row", alignItems: "center", gap: 12 },

  title: { color: COLORS.text, fontSize: 28, fontWeight: "900" },
  subtitle: { color: COLORS.muted, marginTop: 6, marginBottom: 12 },

  logoutBtn: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  logoutText: { color: COLORS.accent, fontWeight: "900" },

  search: {
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: COLORS.text,
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    marginRight: 10,
  },
  chipActive: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { color: "#f5e6d6", fontWeight: "800" },
  chipTextActive: { color: COLORS.text },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 22,
    paddingTop: 18,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 12,
  },
  cardImage: { width: "100%", height: 140, borderRadius: 14 },

  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceText: { color: COLORS.muted, fontWeight: "900" },

  cardTitle: { color: COLORS.text, fontWeight: "900", fontSize: 16 },
  cardMeta: { color: COLORS.muted, marginTop: 4 },

  cardInfoRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  starsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  ratingText: { color: COLORS.text, fontWeight: "900" },

  distanceRow: { flexDirection: "row", alignItems: "center" },
  distanceText: { color: COLORS.muted, fontWeight: "800" },

  empty: { paddingTop: 30, alignItems: "center" },
  emptyTitle: { color: COLORS.text, fontSize: 18, fontWeight: "900" },
  emptyText: { color: COLORS.muted, marginTop: 8 },
});
