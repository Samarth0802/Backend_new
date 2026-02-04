const mongoose = require('mongoose')

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

async function connectTODB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected To Database")
    })
    .catch(error=>{
        console.log("Error",error)
    })
}

module.exports = connectTODB