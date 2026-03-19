import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) return null;

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission required</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{
        barcodeTypes: ["qr", "ean13", "code128"],
      }}
      onBarcodeScanned={async (event) => {
  if (scanned) return;

  console.log("QR DATA:", event.data);

  const restaurantId = event.data.replace("LOCALBITE_", "");

  const token = await SecureStore.getItemAsync("token");
  console.log("token:")

  if (!token) {
    alert("You must be logged in to perform this action");
    return;
  }

  const decoded = jwtDecode(token) as any;
  const userId = decoded.id;

  console.log("ABOUT TO SEND FETCH");
  console.log("TOKEN:", token);

  try {
    const response = await fetch("https://comp2003-2025-2026-18.onrender.com/api/visit", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        restaurantId
      })
    });

    console.log("FETCH SENT");

    const data = await response.json();
    console.log("FETCH RESPONSE:", data);

    if (response.ok) {
      // Only mark scanned AFTER the visit is trackde
      setScanned(true);

      router.push({
        pathname: "/rate",
        params: { id: restaurantId }
      });
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    console.error("FETCH ERROR:", err);
    alert("Network error");
  }

  // Allow scanning again after 3 seconds
  setTimeout(() => setScanned(false), 3000);
}}

    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ff8c1a",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
