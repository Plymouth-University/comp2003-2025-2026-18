import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  FlatList, 
  Linking, 
  TouchableOpacity 
} from "react-native";
import { useState } from "react";

// Type for each chat message
type ChatMessage = {
  id: string;
  text: string;
  website?: string | null;
};

export default function ChatbotScreen() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "1", text: "Hello! I'm the LocalBite assistant 🤖" },
    { id: "2", text: "Ask me for restaurant recommendations!" },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: "You: " + message,
      website: null
    };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("https://ai-chatbot-5rgn.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();

      // AI message (restaurant name + optional website)
      const aiMsg: ChatMessage = {
        id: Date.now().toString() + "-ai",
        text: data.reply,          // keep clean so it's clickable
        website: data.website || null,
      };

      setMessages((prev) => [...prev, aiMsg]);

    } catch (error) {
      const errorMsg: ChatMessage = {
        id: Date.now().toString() + "-err",
        text: "AI: Sorry, I couldn't connect to the server.",
        website: null
      };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setMessage("");
  };

  // Render each message
  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isLink = !!item.website;

    return (
      <TouchableOpacity
        disabled={!isLink}
        onPress={() => isLink && Linking.openURL(item.website!)}
      >
        <Text style={[styles.message, isLink && styles.link]}>
          {item.text}
        </Text>

        {isLink && (
          <Text style={styles.tapHint}>Tap to open website</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>LocalBite AI Assistant</Text>

      <FlatList
        data={messages}
        renderItem={renderMessage}
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
    fontSize: 16,
  },

  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },

  tapHint: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
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
