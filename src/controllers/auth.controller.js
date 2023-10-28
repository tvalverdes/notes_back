import { comparePassword, encryptPassword } from '../utils/bcrypt.js'
import { User } from '../models/user.model.js'
import { generateToken } from '../utils/jwt.utils.js'

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body
    const userExists = await User.findOne({ email: email.toLowerCase() })
    if (userExists) return res.status(400).json({ message: 'User exists' })
    const encryptedPassword = await encryptPassword(password)
    const newUser = new User({
      email: email.toLowerCase(),
      password: encryptedPassword,
    })
    await newUser.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.json(err)
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.status(200).json(users)
  } catch (err) {
    res.json(err)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) return res.status(404).json({ message: 'Wrong credentials' })
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) return res.status(404).json({ message: 'Wrong credentials' })
    const token = generateToken(user)
    res
      .status(200)
      .cookie('token', token, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .send(user.email)
  } catch (err) {
    res.status(500).send({ err })
  }
}

export const logout = (req, res) => {
  try {
    res
      .clearCookie('token', { sameSite: 'none', secure: true })
      .status(200)
      .send('Cookie removed')
  } catch (err) {
    res.status(500).send({ err })
  }
}
