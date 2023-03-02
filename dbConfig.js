const mongodb = require('mongodb');
const Mongoclient = mongodb.MongoClient;
const dbName = "userlogin";
const dbUrl=`mongodb+srv://EswarB:Eswarbilla89@eswar.niw4qhq.mongodb.net/${dbName}`;
module.exports={dbName,dbUrl,mongodb,Mongoclient};