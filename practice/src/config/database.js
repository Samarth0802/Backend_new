const mongoose = require('mongoose')
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first"); 

function connectToDB(){
    mongoose.connect('mongodb+srv://Samarth_08:sM9CxwGCbUnvKuBi@cluster0.dxmeb1f.mongodb.net/day-6')
    .then(()=>{
        console.log("Connected to DB")
    })
    .catch((err)=>{
        console.log("Err ",err)
    })
}

module.exports = connectToDB