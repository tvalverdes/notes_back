import { Router } from 'express'
import {
  login,
  registerUser,
  getUsers,
  logout,
} from '../controllers/auth.controller.js'
export const authRouter = Router()
authRouter.get('/login', (req, res) => res.send('Hello World!'))
authRouter.post('/login', login)
authRouter.post('/register', registerUser)
authRouter.get('/users', getUsers)
authRouter.get('/logout', logout)
