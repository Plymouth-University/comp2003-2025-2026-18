import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // removes header at top
        tabBarStyle: { backgroundColor: "#1a1208" },
        tabBarActiveTintColor: "#ff8c1a",
        tabBarInactiveTintColor: "#c9a27a",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cutlery" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}