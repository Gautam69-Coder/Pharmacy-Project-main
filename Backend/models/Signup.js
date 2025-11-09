const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
   },
   email: {
      type: String,
      required: true,
      lowercase: true
   },
   password: {
      type: String,
      required: true,
      minlegth: 6,
   },
});

const user = mongoose.model("PharmacyUser", UserSchema)
module.exports = user;