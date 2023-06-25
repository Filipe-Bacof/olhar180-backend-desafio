require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { sequelize } = require('./models/IndexModel')

const port = process.env.PORT

const app = express()

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

// CORS
const corsOptions = {
  origin: 'https://olhar180-fontend-desafio.vercel.app',
  optionsSuccessStatus: 200, // Algumas versões do CORS exigem esse campo
}

app.use(cors(corsOptions))
