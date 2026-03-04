import mongoose, { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  password: { type: String }, // bcrypt hashed
  goal: { type: String },
  currentLevel: { 
    type: String, 
    enum: ['Complete Beginner', 'Know the Basics', 'Built Small Projects', 'Intermediate'],
  },
  stack: [{ type: String }],
  hoursPerWeek: { type: Number },
  plan: { 
    type: String, 
    enum: ['free', 'pro', 'team'], 
    default: 'free' 
  },
  onboardingComplete: { type: Boolean, default: false },
}, { timestamps: true })

export default models.User || model('User', UserSchema)
