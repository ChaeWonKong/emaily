const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 }
});

// one arguments means fetching something, two means loading somthing into it.
mongoose.model("users", userSchema);
