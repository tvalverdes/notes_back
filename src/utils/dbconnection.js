import mongoose from 'mongoose'
import { MONGO_URI, MONGO_URI_DOCKER } from '../config.js'

export const connectDb = async () => {
  await mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    })
    .then(() => {
      console.log('Connected to db')
    })
    .catch((err) => {
      console.log(err)
    })
}

export const disconnectDb = async () => {
  await mongoose
    .disconnect()
    .then(() => console.log('Connection closed'))
    .catch((err) => console.log(err))
}
