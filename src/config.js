import { configDotenv } from 'dotenv'
configDotenv()

export const PORT = process.env.PORT || 3000
export const MONGO_URI = process.env.MONGO_URI || ''
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ''
export const CORS_URL = process.env.CORS_URL || ''
