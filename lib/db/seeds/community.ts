import { connectDB } from "@/lib/db/mongoose"
import CommunityPost from "@/lib/db/models/CommunityPost"
import User from "@/lib/db/models/User"

export async function seedCommunityIfNeeded() {
    await connectDB()
    const count = await CommunityPost.countDocuments()
    if (count === 0) {
        const users = await User.find({}).limit(5)
        if (users.length === 0) return

        const posts = [
            {
                userId: users[0]._id,
                content: "Just finished the Advanced React Patterns course! The mentor feedback was game-changing. Highly recommend to everyone here. 🚀",
                type: "celebration"
            },
            {
                userId: users[1 % users.length]._id,
                content: "Anyone else using the new Next.js partial pre-rendering? Seeing some incredible TTI improvements on my side project. Let's talk about it!",
                type: "question"
            }
        ]
        await CommunityPost.insertMany(posts)
    }
}
