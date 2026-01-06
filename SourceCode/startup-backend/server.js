const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

//Load variables from .env
dotenv.config();

const app = express();

//middleware 
app.use(express.json());
app.use(cors());

//routes
const authRoutes = require('./routes/auth');
const discoveryRoutes = require('./routes/discovery');
app.use('/api', authRoutes);
app.use('/api', discoveryRoutes);


//Mongo Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error', err));

//test route

app.get("/api/test-db", async (req, res) => {
    try {
        const result = await mongoose.connection.db.admin().ping();
        res.json({connected:true, result});
    } catch (err) {
        res.status(500).json({connected: false, error: err.message});
    }
});

//start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));