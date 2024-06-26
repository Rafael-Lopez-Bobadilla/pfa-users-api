const express = require('express')
const helmet = require('helmet')
const app = express()
const cors = require('cors')
const router = require('./routes')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
}))
app.use(helmet())
app.use(express.json())
app.use('/api/v1', router)
module.exports = app