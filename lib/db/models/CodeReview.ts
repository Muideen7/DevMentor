import mongoose from 'mongoose'

const CodeReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    originalCode: {
        type: String,
        required: true,
    },
    issue: String,
    explanation: String,
    fixedCode: String,
    concept: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.models.CodeReview || mongoose.model('CodeReview', CodeReviewSchema)
