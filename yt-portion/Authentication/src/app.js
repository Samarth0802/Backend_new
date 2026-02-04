const express  = require('express')

const app = express()
app.use(express.json())

const appRouter = require('./routers/auth.router')
app.use('/api/auth',appRouter)


module.exports = app