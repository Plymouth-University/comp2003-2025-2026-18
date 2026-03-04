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
      name: "Spice Leaf",
      latitude: 50.3755,
      longitude: -4.1427,
      rating: 4.5,
      category: "Indian",
    },
    {
      id: "2",
      name: "Devon Cafe",
      latitude: 50.3760,
      longitude: -4.1400,
      rating: 4.2,
      category: "Cafe",
    },
    {
      id: "3",
      name: "Dockside Pizza",
      latitude: 50.3745,
      longitude: -4.1415,
      rating: 4.7,
      category: "Italian",
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
        placeholder="Search for a cafe..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />

      {/* Toggle Buttons */}
      <View style={styles.toggleRow}>
        <Pressable
          style={[
            styles.toggleButton,
            viewMode === "map" && styles.activeButton,
          ]}
          onPress={() => setViewMode("map")}
        >
          <Text style={styles.toggleText}>Map</Text>
        </Pressable>

        <Pressable
          style={[
            styles.toggleButton,
            viewMode === "list" && styles.activeButton,
          ]}
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
            latitude: 50.3755,
            longitude: -4.1427,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {filteredRestaurants.map((r) => (
            <Marker
              key={r.id}
              coordinate={{
                latitude: r.latitude,
                longitude: r.longitude,
              }}
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
    marginTop: 10,
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