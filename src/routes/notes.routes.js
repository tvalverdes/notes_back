import { Router } from 'express'
import { isUserAuthenticated } from '../middlewares/auth.middleware.js'
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../controllers/notes.controller.js'
import { noteLimiter } from '../middlewares/rateLimit.middleware.js'
export const noteRouter = Router()
noteRouter.get('/notes', isUserAuthenticated, getNotes)
noteRouter.post('/note', noteLimiter, isUserAuthenticated, createNote)
noteRouter.put('/note', isUserAuthenticated, updateNote)
noteRouter.put('/delete/note', isUserAuthenticated, deleteNote)
