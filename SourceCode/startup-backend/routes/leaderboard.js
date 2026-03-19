router.get("/leaderboard", async (req, res) => {
  try {
    const users = await User.find()
      .select("username visitHistory")
      .lean();

    const leaderboard = users.map(user => {
      const history = Array.isArray(user.visitHistory) ? user.visitHistory : [];

      const totalVisits = history.reduce(
        (sum, entry) => sum + (entry.count || 0),
        0
      );

      return {
        id: user._id.toString(),
        username: user.username,
        totalVisits
      };
    });

    leaderboard.sort((a, b) => b.totalVisits - a.totalVisits);

    res.json(leaderboard); 
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ error: "Server error" });
  }
});
