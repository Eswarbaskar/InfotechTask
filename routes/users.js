var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const {UserDetails,PersonalDetails}=require('../shcema');
const {dbName,dbUrl,mongodb,Mongoclient}=require('../dbConfig')
const {hashCompare,hashPassword}=require('../auth')

mongoose.connect(dbUrl)
/* GET users listing. */
router.get('/',async(req, res)=>{
  try {
    let users = await UserDetails.find();
    res.send({
     statusCode:200,
     users:users
    })
 } catch (error) {
   console.log(error);
   res.send({
     statusCode:500,
     message:"internal server error",error
   })
 }
})

// get the PersonalDetails
router.get('/get-Personal',async(req, res)=>{
  try {
    let users = await PersonalDetails.find();
    res.send({
     statusCode:200,
     users:users
    })
 } catch (error) {
   console.log(error);
   res.send({
     statusCode:500,
     message:"internal server error",error
   })
 }
})

// Add the PersonalDetails
router.post('/add-user',async(req, res)=>{
  try {
     let users = await PersonalDetails.create(req.body);
     res.send({
      statusCode:200,
      message:"user add successfully"
     })
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"internal server error",error
    })
  }
});

// Add UserDetails or signUp

router.post('/add-user',async(req, res)=>{
  try {
     req.body.password = await hashPassword(req.body.password)
     let users = await UserDetails.create(req.body);
     res.send({
      statusCode:200,
      message:"user add successfully"
     })
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"internal server error",error
    })
  }
});


// user login
router.post('/login',async(req, res)=>{
  try {
     
     let user = await UserDetails.find({email:req.body.email}).toArray();
     if(user.length===1){
        if(hashCompare(req.body.password,user[0].password)){
          res.send({
            statusCode:200,
            message:"user login successfully"
           })
        }
        else{
          res.send({
            statusCode:401,
            message:"invalid password"
           })
        }
      
     }
     else{
      res.send({
        statusCode:401,
        message:"user not exist"
       })
    }
     
  } catch (error) {
    console.log(error);
    res.send({
      statusCode:500,
      message:"internal server error",error
    })
  }
});

module.exports = router;
