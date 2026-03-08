const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/leaderboard", async (req, res) => {
    try {
        const users = await User.find({}, "email visitHistory");

        const leaderboard = users.map(user => {
            const totalVisits = user.visitHistory.reduce(
                (sum, entry) => sum + (entry.count || 0),
                0
            );

            return {
                id: user._id,
                username: user.username,
                email: user.email,
                totalVisits
            };
        });

        leaderboard.sort((a, b) => b.totalVisits - a.totalVisits);

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;