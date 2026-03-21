from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

# -----------------------------
# Database Connection
# -----------------------------
client = MongoClient("mongodb+srv://localbite_user:localbite1234@cluster0.allr1ut.mongodb.net/?retryWrites=true&w=majority")
db = client["LocalBite"]
restaurants = db["Restaurants"]

# -----------------------------
# FastAPI Setup
# -----------------------------
app = FastAPI()

class Message(BaseModel):
    text: str

# -----------------------------
# Chatbot Logic (API Version)
# -----------------------------
@app.post("/chat")
def chat(message: Message):
    user_message = message.text.lower().strip()

    # Greeting
    if user_message in ["hi", "hello", "hey"]:
        return {"reply": "Hi! I'm the LocalBite assistant 🍜 Ask me for restaurant recommendations."}

    # Cuisine detection
    cuisines = ["thai", "indian", "italian", "chinese", "american", "cafe"]
    for cuisine in cuisines:
        if cuisine in user_message:
            results = list(
                restaurants.find({"cuisine": {"$regex": cuisine, "$options": "i"}})
                .sort("rating", -1)
                .limit(3)
            )

            if results:
                text = f"Here are some great {cuisine.title()} restaurants:\n\n"
                for r in results:
                    text += f"🍽 {r['name']} ⭐ {r['rating']}\n"
                return {"reply": text}

            return {"reply": f"I couldn't find any {cuisine} restaurants."}

    # General recommendation
    if "recommend" in user_message or "best" in user_message:
        results = list(restaurants.find().sort("rating", -1).limit(5))
        text = "Here are the highest rated restaurants right now:\n\n"
        for r in results:
            text += f"🍽 {r['name']} ({r['cuisine']}) ⭐ {r['rating']}\n"
        return {"reply": text}

    # Achievements
    if "achievement" in user_message:
        return {
            "reply": (
                "🏅 Food Explorer – Visit 5 restaurants\n"
                "🏅 Master Reviewer – Write 10 reviews\n"
                "🏅 Cuisine Expert – Try 3 cuisines"
            )
        }

    # Default fallback
    return {"reply": "I'm not sure I understood. Try asking for restaurant recommendations."}
