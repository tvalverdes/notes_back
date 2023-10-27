import bcrypt from 'bcrypt'

const saltRounds = 10

export const encryptPassword = async (password) => {
  try {
    const hash = await bcrypt.hash(password, saltRounds)
    return hash
  } catch (err) {
    throw new Error('Error encrypting password' + err)
  }
}

export const comparePassword = async (password, hash) => {
  const validation = await bcrypt.compare(password, hash)
  return validation
}
