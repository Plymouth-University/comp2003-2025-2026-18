import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

export default function ChatbotScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! I'm the LocalBite assistant 🤖" },
    { id: "2", text: "Ask me for restaurant recommendations!" },
  ]);

  const sendMessage = () => {
    if (!message) return;

    const newMessages = [
      ...messages,
      { id: Date.now().toString(), text: "You: " + message },
      { id: Date.now().toString() + "ai", text: "AI: I recommend trying Thai food 🍜" },
    ];

    setMessages(newMessages);
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LocalBite AI Assistant</Text>

      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.inputRow}>
        <TextInput
          placeholder="Ask something..."
          value={message}
          onChangeText={setMessage}
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={sendMessage}>
          <Text style={{ color: "white" }}>Send</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    paddingTop: 60,
    paddingBottom: 20,
  },

  message: {
    marginVertical: 5,
  },

  inputRow: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 40,
  },

  input: {
    flex: 1,
    backgroundColor: "#eeeeee",
    padding: 10,
    borderRadius: 10,
  },

  button: {
    backgroundColor: "#ff8c1a",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
});