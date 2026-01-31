const app = require('./src/app')
const connectToDB = require('./src/config/databse')
require("dotenv").config()
connectToDB()

app.listen('3000',()=>{
    console.log("Server is running on 3000")
})