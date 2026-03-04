import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cached = (global as any).mongoose ?? { conn: null, promise: null }

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined. Please check your environment variables.')
  }

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    console.log("DB: Initializing new Mongoose connection...")
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false })
      .then((mongoose) => {
        console.log("DB: Connected successfully!")
        return mongoose
      })
      .catch((err) => {
        console.error("DB: Connection FAILED:", err)
        cached.promise = null // Reset so we can try again
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
