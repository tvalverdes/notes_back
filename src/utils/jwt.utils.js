import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config.js'

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    JWT_SECRET_KEY,
    {
      expiresIn: '1h',
    }
  )
  return token
}

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY)
}
