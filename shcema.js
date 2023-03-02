const mongoose = require('mongoose');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
    name:{type:'string',required:true},
    email:{
        type:'string',
        required:true,
        lowercase:true,
        validate:(value)=>{
            return validator.isEmail(value)
        }
    },
    mobile:{type:'string',default:"000-000-0000"},
    password:{type:'string',required:true},
    role:{type:'string',default:""},

});

var personalSchema = new mongoose.Schema({
    FatherName:{type:'string',required:true},
    MotherName:{type:'string',required:true},
    streer:{type:'string'},
    Area:{type:'string',required:true},
    city:{type:'string',required:true},
    state:{type:'string',required:true},
    country:{type:'string',required:true},

})

const UserDetails = mongoose.model('userlogin',UserSchema);
const PersonalDetails = mongoose.model('personal',personalSchema);
module.exports={UserDetails,PersonalDetails}