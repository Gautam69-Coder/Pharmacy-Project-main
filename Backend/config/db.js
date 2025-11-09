const mongoose = require('mongoose');

const connection = mongoose.connect(
    "mongodb+srv://gautamdoliya69:gautamdoliya69@pharmacycluter.wxsmngq.mongodb.net/Pharmacy?retryWrites=true&w=majority&appName=PharmacyCluter",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ssl: true
    }
);

module.exports = connection