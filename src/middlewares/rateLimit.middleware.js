import { rateLimit } from 'express-rate-limit'

export const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many requests',
})
export const registerLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2,
  message: 'Too many requests',
})

export const noteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 12,
  message: 'Too many requests',
})
