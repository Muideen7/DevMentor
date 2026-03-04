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
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      family: 4, // Force IPv4 (Crucial for Windows/ISP DNS issues)
      serverSelectionTimeoutMS: 5000, // Don't wait 30 seconds to fail
      heartbeatFrequencyMS: 1000, // Check connection more frequently
    })
      .then((mongoose) => {
        console.log("DB: Connected successfully!")
        return mongoose
      })
      .catch((err) => {
        if (err.message?.includes('querySrv')) {
          console.error("DB: Connection FAILED: SRV resolution error.")
        }
        if (err.name === 'MongooseServerSelectionError') {
          console.error("DB: Connection FAILED: Timeout. Your IP may not be whitelisted in Atlas, or your firewall is blocking port 27017.")
        }
        console.error("DB: Connection FAILED:", err)
        cached.promise = null
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
