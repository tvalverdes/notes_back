import { User, Note } from '../models/user.model.js'

export const createNote = async (req, res) => {
  try {
    const { title, text } = req.body
    const user = await User.findById(req.userData.id)
    const note = await new Note({
      title,
      text,
    })
    user.notes.push(note)
    await user.save()
    await note.save()
    res.status(201).json(user)
  } catch (err) {
    res.send(err)
  }
}

export const getNotes = async (req, res) => {
  try {
    const user = await User.findById(req.userData.id).populate({
      path: 'notes',
      match: { deleted: false },
      select: 'title text',
      options: { sort: { createdAt: -1 } },
    })
    res.status(200).json(user.notes)
  } catch (err) {
    res.send(err)
  }
}

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.body
    if (!id) {
      return res.status(400).send('Missing id')
    }
    await Note.findOneAndUpdate({ _id: id }, { deleted: true })
    res.status(204).send()
  } catch (err) {
    res.send(err)
  }
}

export const updateNote = async (req, res) => {
  try {
    const { id, title, text } = req.body
    if (!id || !text) {
      return res.status(400).send('Missing required fields')
    }
    const updateData = {
      title,
      text,
    }
    const note = await Note.findOneAndUpdate({ _id: id }, updateData)
    res.status(204).send()
  } catch (error) {
    res.status(500).send(error)
  }
}
