const mongoose = require('mongoose');

const connection = mongoose.connect(
    "mongodb+srv://gautamdoliya69:gautamdoliya69@pharmacycluter.wxsmngq.mongodb.net/Pharmacy?retryWrites=true&w=majority&tls=true"
)
    .then(() => console.log("✅ MongoDB connected successfully"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = connection