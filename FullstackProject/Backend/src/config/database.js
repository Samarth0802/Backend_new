const mongoose = require('mongoose')
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Database")
    })
    
    .catch((err)=>{
        console.log("Err",err)
    })
}

module.exports = connectToDB