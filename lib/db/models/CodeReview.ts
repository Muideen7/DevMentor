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
    feedback: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
})

export default mongoose.models.CodeReview || mongoose.model('CodeReview', CodeReviewSchema)
