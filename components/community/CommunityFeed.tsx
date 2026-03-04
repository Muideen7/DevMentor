"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface Post {
  _id: string
  userId: {
    _id: string
    name: string
    image: string
    currentLevel: string
  }
  content: string
  type: "reflection" | "question" | "celebration" | "resource"
  likes: string[]
  comments: any[]
  createdAt: string
}

interface CommunityFeedProps {
  initialPosts: Post[]
  user: any
}

export default function CommunityFeed({ initialPosts, user }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [content, setContent] = useState("")
  const [isPosting, setIsPosting] = useState(false)

  const handlePost = async () => {
    if (!content.trim()) return
    setIsPosting(true)
    
    // Simulate real post creation logic
    // In a real scenario, this would call an API
    const newPost: Post = {
      _id: Math.random().toString(),
      userId: {
        _id: user._id,
        name: user.name || "Developer",
        image: user.image || "",
        currentLevel: user.currentLevel || "Junior"
      },
      content,
      type: "question",
      likes: [],
      comments: [],
      createdAt: new Date().toISOString()
    }

    setPosts([newPost, ...posts])
    setContent("")
    setIsPosting(false)
  }

  return (
    <div className="space-y-8 px-4 md:px-0">
      
      {/* Composer */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft focus-within:shadow-xl transition-all duration-300 relative overflow-hidden group">
         <div className="absolute top-0 right-0 size-48 bg-accent-coral/5 rounded-full -translate-y-24 translate-x-12 blur-3xl group-focus-within:bg-accent-coral/10 transition-all duration-500 pointer-events-none" />
         
         <div className="flex gap-6 relative z-10">
            <div className="size-14 rounded-full bg-slate-100 border-2 border-slate-50 shrink-0 shadow-sm" />
            <div className="flex-1">
               <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share a win, ask a question, or discuss a concept..."
                  className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-slate-300 resize-none no-scrollbar h-20 p-0"
               />
               
               <div className="pt-6 mt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <button className="p-3 hover:bg-slate-50 text-slate-400 hover:text-accent-coral rounded-full transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">image</span>
                     </button>
                     <button className="p-3 hover:bg-slate-50 text-slate-400 hover:text-accent-coral rounded-full transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">link</span>
                     </button>
                     <button className="p-3 hover:bg-slate-50 text-slate-400 hover:text-accent-coral rounded-full transition-colors flex items-center justify-center">
                        <span className="material-symbols-outlined text-xl">alternate_email</span>
                     </button>
                  </div>
                  
                  <button
                     onClick={handlePost}
                     disabled={!content.trim() || isPosting}
                     className={cn(
                        "px-8 py-3 bg-primary text-white rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10",
                        (!content.trim() || isPosting) && "opacity-50 grayscale pointer-events-none"
                     )}
                  >
                     {isPosting ? "Posting..." : "Share Post"}
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post._id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-soft hover:shadow-lg transition-all duration-300 group">
             <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                   <div className="size-12 rounded-full bg-slate-100 border-2 border-white shadow-sm shrink-0" />
                   <div>
                      <h4 className="font-black text-slate-900 leading-none mb-1.5 flex items-center gap-2">
                         {post.userId.name}
                         <span className="px-1.5 py-0.5 bg-accent-coral/10 text-accent-coral text-[8px] font-black uppercase tracking-widest rounded-full leading-none">
                            {post.userId.currentLevel}
                         </span>
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                         {formatDistanceToNow(new Date(post.createdAt))} ago
                      </p>
                   </div>
                </div>
                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                   <span className="material-symbols-outlined text-xl">more_horiz</span>
                </button>
             </div>

             <div className="space-y-6">
                <p className="text-slate-600 font-medium leading-relaxed text-lg">
                   {post.content}
                </p>

                {/* Engagement */}
                <div className="flex items-center gap-8 pt-6 border-t border-slate-50">
                   <button className="flex items-center gap-2 text-slate-400 hover:text-accent-coral transition-all group/stat">
                      <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">favorite</span>
                      <span className="text-xs font-black uppercase tracking-widest">{post.likes.length || 0}</span>
                   </button>
                   <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all group/stat">
                      <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">chat_bubble</span>
                      <span className="text-xs font-black uppercase tracking-widest">{post.comments.length || 0}</span>
                   </button>
                   <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all ml-auto">
                      <span className="material-symbols-outlined text-xl">bookmark</span>
                   </button>
                </div>
             </div>
          </article>
        ))}
      </div>

    </div>
  )
}
