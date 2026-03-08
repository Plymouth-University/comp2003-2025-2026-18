const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/visit', async (req, res) => {
    const { userId, restaurantId } = req.body;

    const user = await User.findById(userId);
    const restaurant = await Restaurant.findById(restaurantId);

    let visit = user.visitHistory.find(v => v.restaurantId.toString() === restaurantId);

    if (visit) {
        visit.count += 1;
    } else {
        visit = { restaurantId, count: 1 };
        user.visitHistory.push(visit);
    }

    if (visit.count === 5) {
        user.achievements.push({
            name: `Visited ${restaurtant.role} restaurant 5 times`
        });
    }

    await user.save();
    res.json({ message: "visit recorded"});
});

module.exports = router;