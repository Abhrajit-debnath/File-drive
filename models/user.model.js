import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, "Password must be at least 5 characters"],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
