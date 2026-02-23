import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

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
      onBarcodeScanned={(event) => {
        if (scanned) return;

        setScanned(true);

        console.log("QR DATA:", event.data);
        alert("QR Detected: " + event.data);

        // FAKE VALIDATION
        if (event.data === "LOCALBITE_PASTA123") {
          router.push({
            pathname: "/rate",
            params: { id: "pasta123" },
          });
        } else {
          alert("Invalid LocalBite QR Code");
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
