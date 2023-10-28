import { Router } from 'express'
import { login, registerUser, logout } from '../controllers/auth.controller.js'
import {
  registerLimiter,
  loginLimiter,
} from '../middlewares/rateLimit.middleware.js'
export const authRouter = Router()
authRouter.post('/login', loginLimiter, login)
authRouter.post('/register', registerLimiter, registerUser)
authRouter.get('/logout', logout)
