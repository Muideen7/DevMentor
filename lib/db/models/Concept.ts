import mongoose, { Schema, model, models } from 'mongoose'

const ConceptSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    estimatedMinutes: { type: Number, default: 10 },
    intro: { type: String, required: true },
    mentalModel: {
        text: { type: String },
        analogy: { type: String }
    },
    codeComparison: {
        oldWay: {
            label: { type: String },
            code: { type: String }
        },
        newWay: {
            label: { type: String },
            code: { type: String }
        }
    },
    pitfalls: [{
        title: { type: String },
        description: { type: String }
    }],
    quiz: {
        question: { type: String },
        options: [{ type: String }],
        correctIndex: { type: Number }
    },
    masteredCount: { type: Number, default: 0 }
}, { timestamps: true })

export default models.Concept || model('Concept', ConceptSchema)
