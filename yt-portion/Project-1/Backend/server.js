require('dotenv').config()

const app = require('./src/app')
const connectToDB = require('./src/models/database')

connectToDB()

app.listen('3000',()=>{
    console.log("Server is Listening to port 3000")
})