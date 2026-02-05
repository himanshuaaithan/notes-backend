const mongoose = require("mongoose");

function connectTodb(){
    mongoose.connect(process.env.database_uri)
    .then(()=>{
        console.log("CONNECT TO DB")
    })
}

module.exports = connectTodb