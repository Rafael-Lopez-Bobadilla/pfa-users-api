const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app/app')

const DB = process.env.DATABASE.replace('<password>',
  process.env.DATABASE_PASSWORD)

mongoose.connect(DB).then(conection => {
  console.log('database conected')
})

const server = app.listen(process.env.PORT, () => console.log('app running'))

process.on('unhandledRejection', err => {
  console.log(err.name, err.message)
  console.log('Shutting Down')
  server.close(() => {
    process.exit(1)
  })
})