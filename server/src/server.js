import { assertRequiredEnv, env } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'

async function start() {
  try {
    assertRequiredEnv()
    await connectDB()

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} (${env.nodeEnv})`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

start()