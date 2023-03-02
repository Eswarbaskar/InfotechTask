var bcrypt = require('bcryptjs');
const saltRound = 10 ;


const hashPassword = async(password)=>{
    var salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password.salt)
}

const hashCompare = async (password,hashedPassword)=>{
    return await bcrypt.compare(password,hashedPassword)
}


module.exports={hashCompare,hashPassword}