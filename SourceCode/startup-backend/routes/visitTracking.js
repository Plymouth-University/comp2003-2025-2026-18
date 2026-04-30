const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

console.log("VISIT ROUTE LOADED");

// POST /api/visit
router.post("/visit", auth, async (req, res) => {
    console.log("HEADERS:", req.headers);
    console.log("AUTH HEADER:", req.header("Authorization"));
    console.log("USER FROM TOKEN:", req.user);
  try {
    const userId = req.user.id; // comes from JWT middleware
    const { restaurantId } = req.body;

    if (!restaurantId) {
      return res.status(400).json({ error: "Restaurant ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find existing visit entry
    let visit = user.visitHistory.find(
      (v) => v.restaurantId.toString() === restaurantId
    );

    if (visit) {
      visit.count += 1;
    } else {
      visit = { restaurantId, count: 1 };
      user.visitHistory.push(visit);
    }

    // Achievement unlock example
    if (visit.count === 5) {
      user.achievements.push({
        name: `Visited restaurant ${restaurantId} five times`,
      });
    }

    await user.save();

    res.json({
      message: "Visit recorded",
      count: visit.count,
    });

  } catch (err) {
    console.error("VISIT ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
