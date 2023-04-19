const postgres = require('postgres')

const sql = postgres({
    host: '127.0.0.1',
    port: '5432',
    user: 'postgres',
    'password': '2210',
    'database': 'students-db'
})

module.exports = sql