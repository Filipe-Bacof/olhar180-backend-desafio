require('dotenv').config()

// APP
const express = require('express')
const app = express()

// CORS
const cors = require('cors')
const corsOptions = {
  origin: 'https://olhar180-frontend-desafio.vercel.app',
  optionsSuccessStatus: 200,
  credentials: true,
}
app.use(cors(corsOptions))

const { sequelize } = require('./models/IndexModel')

const port = process.env.PORT

app.use(express.json())

app.listen(port, () => {
  console.log(`🔥 App rodando na porta ${port}`)
})

const router = require('./Router.js')
app.use(router)

// DB Connection
sequelize
  .sync()
  .then(() => {
    console.log('🎲 Banco de dados conectado')
  })
  .catch((error) => {
    console.error('Ocorreu um erro: ', error)
  })
