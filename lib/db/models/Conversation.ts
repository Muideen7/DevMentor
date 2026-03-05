import mongoose, { Schema, Document, model, models } from 'mongoose';

export interface IConversation extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    type: 'concept' | 'general';
    messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        createdAt: Date;
    }>;
    createdAt: Date;
    updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['concept', 'general'], default: 'concept' },
    messages: [
        {
            role: { type: String, enum: ['user', 'assistant'], required: true },
            content: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
}, { timestamps: true });

export default models.Conversation || model<IConversation>('Conversation', ConversationSchema);
