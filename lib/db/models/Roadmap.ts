import mongoose, { Schema, model, models } from 'mongoose'

const WeekSchema = new Schema({
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true },
  topics: [{ type: String }],
  resources: [{ type: String }],
  status: { 
    type: String, 
    enum: ['locked', 'active', 'complete'], 
    default: 'locked' 
  },
  estimatedHours: { type: Number }
})

const PhaseSchema = new Schema({
  phaseNumber: { type: Number, required: true },
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['locked', 'active', 'complete'], 
    default: 'locked' 
  },
  weeks: [WeekSchema]
})

const RoadmapSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  phases: [PhaseSchema],
  totalWeeks: { type: Number, required: true },
  currentWeek: { type: Number, default: 0 },
  generatedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true })

export default models.Roadmap || model('Roadmap', RoadmapSchema)
