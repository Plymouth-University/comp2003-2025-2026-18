import { useLocalSearchParams, useRouter } from "expo-router";
import { useApp } from "./store";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
  TextInput,
  Switch,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function RateScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addVisit } = useApp();

  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission needed to access gallery");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const submit = () => {
    if (stars === 0) {
      Alert.alert("Please select a rating");
      return;
    }

    const success = addVisit(id as string);

    if (!success) {
      Alert.alert("Already rated today");
      router.replace("/");
      return;
    }

    router.replace("/success");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Visit</Text>

      {/* Stars */}
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable key={n} onPress={() => setStars(n)}>
            <MaterialIcons
              name={n <= stars ? "star" : "star-border"}
              size={36}
              color="#ff8c1a"
            />
          </Pressable>
        ))}
      </View>

     
      <View style={styles.row}>
        <Text style={styles.label}>Rate Anonymously</Text>
        <Switch value={anonymous} onValueChange={setAnonymous} />
      </View>

      
      <TextInput
        placeholder="Write your review..."
        value={comment}
        onChangeText={setComment}
        multiline
        style={styles.input}
      />

      
      <Pressable style={styles.photoButton} onPress={pickImage}>
        <MaterialIcons name="photo-camera" size={20} color="#fff" />
        <Text style={styles.photoText}>Upload Photo</Text>
      </Pressable>

      {photo && (
        <Image source={{ uri: photo }} style={styles.previewImage} />
      )}

      {/* Submit */}
      <Pressable style={styles.submitButton} onPress={submit}>
        <Text style={styles.submitText}>Submit Review</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  photoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    gap: 8,
  },
  photoText: {
    color: "#fff",
  },
  previewImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#ff8c1a",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
