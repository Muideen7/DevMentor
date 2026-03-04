import mongoose, { Schema, model, models } from 'mongoose'

const CheckInSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  date: { type: Date, default: Date.now },
  workedOn: { type: String, required: true },
  blockers: { type: String },
  mood: { type: Number, min: 1, max: 5, required: true },
  freeText: { type: String },
  aiResponse: { type: String },
  streakDay: { type: Number, default: 0 }
}, { timestamps: true })

export default models.CheckIn || model('CheckIn', CheckInSchema)
