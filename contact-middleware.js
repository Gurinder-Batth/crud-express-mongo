const express = require("express")
const app = express()
app.use('/contact-us/:name', ( req , res , next) => 
{
    console.log("midlleware invoked")
    if(req.params.name == "Gurinder"){
        next()
    }
})
module.exports = app