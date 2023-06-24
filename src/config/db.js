require('dotenv').config()

const pg = require('pg')

const conString = process.env.DB_STRING
const client = new pg.Client(conString)

try {
  client.connect(function (err) {
    if (err) {
      return console.error('❌ Could not connect to postgres', err)
    }
    console.log('🎲 Banco de Dados Conectado')
    client.query('SELECT NOW() AS "theTime"', function (err, result) {
      if (err) {
        return console.error('❌ Error running query', err)
      }
      console.log(result.rows[0].theTime)

      client.end()
    })
  })
} catch (err) {
  console.log('❌ Error: ', err)
}
