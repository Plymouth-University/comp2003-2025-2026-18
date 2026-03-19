import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 60 }}>✅</Text>
      <Text style={{ fontSize: 22, marginTop: 10 }}>
        Offer Redeemed!
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.replace("/(tabs)/profile")}
      >
        <Text style={{ color: "white" }}>Back Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  button: {
    marginTop: 20,
    backgroundColor: "#ff8c1a",
    padding: 15,
    borderRadius: 10,
  },
});
