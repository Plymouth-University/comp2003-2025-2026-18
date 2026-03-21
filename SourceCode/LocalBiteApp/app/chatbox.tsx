import { View, Text, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { useState } from "react";

export default function ChatbotScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello! I'm the LocalBite assistant 🤖" },
    { id: "2", text: "Ask me for restaurant recommendations!" },
  ]);

  const sendMessage = async () => {
    if (!message) return;

    const userMsg = {
      id: Date.now().toString(),
      text: "You: " + message,
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("https://ai-chatbot-5rgn.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();

      const aiMsg = {
        id: Date.now().toString() + "-ai",
        text: "AI: " + data.reply,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg = {
        id: Date.now().toString() + "-err",
        text: "AI: Sorry, I couldn't connect to the server.",
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

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