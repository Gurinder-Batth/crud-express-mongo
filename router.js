const express = require("express")
const app = express()
const router = express.Router()
const url = require('url');
const User = require("./model/user")



router.post("/create-user",(req,res) => {
    const user = new User({
        name:req.body.name,
        email:req.body.email, 
        password:req.body.password,
        tags:req.body.lang
    })
    user.save()
    .then( u  => res.redirect("user/list") )
    // .then( u  => res.send(user) )
    .catch(e => {
        console.log({e})
        res.send("error") 
    })
})

router.get("/create-user",(req,res) => {
    res.render("user/create")
})
router.get("/user/list",(req,res) => {
    User.find().then( (users) => {
        res.render("user/list",{
            users:users ,
            req:req
        })
    })
    .catch((e) => {
        console.log(e)
    })
   
})

router.get("/user/edit/:id",(req,res) => {
    User.findById(req.params.id).then((user) => {
        res.render("user/edit",{
            user:user
        })
    })
    .catch((e) => {})
})
router.post("/user/update",(req,res) => {
    User.findOneAndUpdate(
     { id:req.id } , //where id
     req.body , //update,
     { upsert:false },
     ( err , doc ) => {
         if(err == null){
             res.redirect("/user/list")
         }
     })
})

router.get("/user/delete/:id",(req,res) => {
    User.deleteOne({ id:req.id }, (success) => {
        res.redirect("/user/list")
    })
    .catch((e) => {  console.log(e) })
})

router.get("/user/search",(req,res) => {
    
    let expersion = ".*"+ req.query.str +".*"
    User
    .find({name: { $regex: expersion , $options:"i" } })
    // .where("password").gte(20000).lte(30000)
    // .where('tags').in(['JAVA'])
    .then((result) => {
        res.render("user/list",{
            users:result,
            req:req
        })
    })
    // res.send("hello")
})

module.exports = router