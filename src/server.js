import express from 'express'
import { CORS_URL, PORT } from './config.js'
import { authRouter } from './routes/auth.routes.js'
import { noteRouter } from './routes/notes.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { connectDb } from './utils/dbconnection.js'
const app = express()

app.use(
  cors({ origin: [CORS_URL, 'http://localhost:3000'], credentials: true })
)
app.use(express.json())
app.use(cookieParser())
await connectDb()
app.use('/auth', authRouter)
app.use('', noteRouter)

export default app
