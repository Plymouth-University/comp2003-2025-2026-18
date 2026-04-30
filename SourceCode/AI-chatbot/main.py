from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

# -----------------------------
# Database Connection
# -----------------------------
print("testing MongoDB connect")

client = MongoClient("mongodb+srv://localbite_user:localbite1234@cluster0.allr1ut.mongodb.net/?retryWrites=true&w=majority")
db = client["LocalBite"]

try:
    print(db.list_collection_names())
except Exception as e:
    print("MongoDB Error:", e)

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

    # -----------------------------
    # GREETINGS
    # -----------------------------
    if user_message in ["hi", "hello", "hey"]:
        return {
            "reply": "Hi! I'm the LocalBite assistant 🍜 Ask me for restaurant recommendations.",
            "restaurants": []
        }

    # -----------------------------
    # CUISINE DETECTION
    # -----------------------------
    cuisines = ["thai", "indian", "italian", "chinese", "american", "cafe"]
    for cuisine in cuisines:
        if cuisine in user_message:
            results = list(
                restaurants.find({"cuisine": {"$regex": cuisine, "$options": "i"}})
                .sort("rating", -1)
                .limit(3)
            )

            if results:
                formatted = []
                for r in results:
                    formatted.append({
                        "name": r["name"],
                        "rating": r["rating"],
                        "website": r.get("website", None)
                    })

                return {
                    "reply": f"Here are some great {cuisine.title()} restaurants:",
                    "restaurants": formatted
                }

            return {
                "reply": f"I couldn't find any {cuisine} restaurants.",
                "restaurants": []
            }

    # -----------------------------
    # GENERAL RECOMMENDATION
    # -----------------------------
    if "recommend" in user_message or "best" in user_message:
        results = list(restaurants.find().sort("rating", -1).limit(5))

        formatted = []
        for r in results:
            formatted.append({
                "name": r["name"],
                "rating": r["rating"],
                "website": r.get("website", None)
            })

        return {
            "reply": "Here are the highest rated restaurants right now:",
            "restaurants": formatted
        }

    # -----------------------------
    # ACHIEVEMENTS
    # -----------------------------
    if "achievement" in user_message:
        return {
            "reply": (
                "🏅 Food Explorer – Visit 5 restaurants\n"
                "🏅 Master Reviewer – Write 10 reviews\n"
                "🏅 Cuisine Expert – Try 3 cuisines"
            ),
            "restaurants": []
        }

    # -----------------------------
    # DEFAULT FALLBACK
    # -----------------------------
    return {
        "reply": "I'm not sure I understood. Try asking for restaurant recommendations.",
        "restaurants": []
    }
