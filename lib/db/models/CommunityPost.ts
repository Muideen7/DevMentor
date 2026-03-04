import mongoose, { Schema, model, models } from 'mongoose'

const CommunityPostSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['reflection', 'question', 'celebration', 'resource'], default: 'question' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
        createdAt: { type: Date, default: Date.now }
    }],
}, { timestamps: true })

export default models.CommunityPost || model('CommunityPost', CommunityPostSchema)
