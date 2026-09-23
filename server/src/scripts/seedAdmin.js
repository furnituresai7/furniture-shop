import readline from 'node:readline'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { connectDB } from '../config/db.js'
import User from '../models/User.js'

function ask(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

function askHidden(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

    // Write the prompt text first, then switch to hiding further output
    process.stdout.write(question)
    rl._writeToOutput = (str) => {
      if (str.includes('\n')) rl.output.write(str)
    }

    rl.question('', (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function seedAdmin() {
  await connectDB()

  const email = (await ask('Admin email: ')).toLowerCase()
  const name = await ask('Admin name: ')
  const password = await askHidden('Admin password (min 8 characters): ')
  console.log() // newline after hidden input

  if (!email || !name || password.length < 8) {
    console.error('All fields are required and password must be at least 8 characters.')
    process.exit(1)
  }

  const existing = await User.findOne({ email })
  if (existing) {
    console.error(`A user with email ${email} already exists.`)
    process.exit(1)
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await User.create({ name, email, passwordHash, role: 'admin' })

  console.log(`Admin account created for ${email}`)
  await mongoose.disconnect()
  process.exit(0)
}

seedAdmin().catch((error) => {
  console.error('Failed to create admin:', error)
  process.exit(1)
})