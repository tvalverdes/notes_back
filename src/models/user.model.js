import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
  },
  { timestamps: true }
)

export const User = mongoose.model('User', UserSchema)

const NoteSchema = new Schema(
  {
    title: { type: String, required: false },
    text: { type: String, required: true },
    deleted: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
)

export const Note = mongoose.model('Note', NoteSchema)
