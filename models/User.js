const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

// one arguments means fetching something, two means loading somthing into it.
mongoose.model("users", userSchema);
