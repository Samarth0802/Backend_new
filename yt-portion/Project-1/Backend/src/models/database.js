const mongoose = require('mongoose')

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

async function connectToDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch(err =>{
        console.log("Error ",err)
    })
}

module.exports = connectToDB