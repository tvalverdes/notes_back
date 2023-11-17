import { MONGO_URI_DOCKER } from './config.js'
import app from './server.js'
export const server = app.listen(5000, () =>
  console.log(
    `Server running on PORT:${5000} with db dirss: ${MONGO_URI_DOCKER}`
  )
)
