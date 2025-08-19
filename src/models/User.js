import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Clerk user ID

  // Step 1: Personal Info
  age: Number,
  gender: String,
  height: Number,
  weight: Number,

  // Step 2: Lifestyle
  activityLevel: String,
  fitnessGoal: String,

  // Step 3: Preferences
  workoutType: String,
  dietType: String,
  equipment: [String],
  injuries: String,
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
