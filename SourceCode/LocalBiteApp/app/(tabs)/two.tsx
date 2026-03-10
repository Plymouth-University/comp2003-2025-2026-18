import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [search, setSearch] = useState("");

  const restaurants = [
    {
      id: "1",
      name: "The Thai House",
      latitude: 50.3684066,
      longitude: -4.1380422,
      rating: 4.5,
      category: "Thai",
    },
    {
      id: "2",
      name: "Mr Woks Ltd",
      latitude: 50.3737666,
      longitude: -4.1381529,
      rating: 4.2,
      category: "Thai Noodle",
    },
    {
      id: "3",
      name: "Himalayan Spice",
      latitude: 50.366806,
      longitude: -4.1350326,
      rating: 4.5,
      category: "Indian / Nepalese",
    },
    {
      id: "4",
      name: "Veggie Perrins",
      latitude: 50.3732299,
      longitude: -4.1446159,
      rating: 4.7,
      category: "Indian / Vegetarian",
    },
    {
      id: "5",
      name: "Bella Italia",
      latitude: 50.3693942,
      longitude: -4.1457105,
      rating: 3.8,
      category: "Italian",
    },
    {
      id: "6",
      name: "The Plymouth Stable",
      latitude: 50.3685538,
      longitude: -4.13489,
      rating: 4.4,
      category: "Pizza / Pasta",
    },
    {
      id: "7",
      name: "Desire Plymouth",
      latitude: 50.3683692,
      longitude: -4.1380248,
      rating: 4.5,
      category: "Restaurant / Bar",
    },
    {
      id: "8",
      name: "The Little Kitchen",
      latitude: 50.3821206,
      longitude: -4.1341354,
      rating: 4.5,
      category: "Cafe",
    },
    {
      id: "9",
      name: "Boston Tea Party",
      latitude: 50.36866,
      longitude: -4.1351541,
      rating: 4.5,
      category: "Cafe / Brunch",
    },
    {
      id: "10",
      name: "Asian Noodle Bar",
      latitude: 50.3691283,
      longitude: -4.1381354,
      rating: 4.9,
      category: "Chinese",
    },
    {
      id: "11",
      name: "Imperial Garden",
      latitude: 50.3723265,
      longitude: -4.1349629,
      rating: 4.2,
      category: "Chinese",
    },
    {
      id: "12",
      name: "SmashLand Burgers",
      latitude: 50.3650396,
      longitude: -4.134353,
      rating: 5.0,
      category: "Burger / American",
    },
    {
      id: "13",
      name: "Bombay Burger Kitchen",
      latitude: 50.3708867,
      longitude: -4.134193,
      rating: 4.9,
      category: "Burger",
    },
    {
      id: "14",
      name: "Cap'n Jaspers",
      latitude: 50.3676093,
      longitude: -4.1341846,
      rating: 4.5,
      category: "Cafe / Burger",
    },
  ];

  // 🔎 FILTER LOGIC
  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* SEARCH BAR */}
      <TextInput
        placeholder="Search for a restaurant..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* TOGGLE BUTTONS */}
      <View style={styles.toggleRow}>
        <Pressable
          style={[styles.toggleButton, viewMode === "map" && styles.activeButton]}
          onPress={() => setViewMode("map")}
        >
          <Text style={styles.toggleText}>Map</Text>
        </Pressable>

        <Pressable
          style={[styles.toggleButton, viewMode === "list" && styles.activeButton]}
          onPress={() => setViewMode("list")}
        >
          <Text style={styles.toggleText}>List</Text>
        </Pressable>
      </View>

      {/* MAP VIEW */}
      {viewMode === "map" && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 50.3700,
            longitude: -4.1380,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
          {filteredRestaurants.map((r) => (
            <Marker
              key={r.id}
              coordinate={{ latitude: r.latitude, longitude: r.longitude }}
              title={r.name}
              description={`${r.category} • ⭐ ${r.rating}`}
            />
          ))}
        </MapView>
      )}

      {/* LIST VIEW */}
      {viewMode === "list" && (
        <FlatList
          data={filteredRestaurants}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.rating}>⭐ {item.rating}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    marginHorizontal: 15,
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 12,
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  activeButton: {
    backgroundColor: "#ff8c1a",
  },
  toggleText: {
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    marginTop: 4,
    color: "#555",
  },
  rating: {
    marginTop: 4,
    fontWeight: "bold",
  },
});