const  mongoose=require("mongoose")
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>{console.log("Db connected succes")})
    .catch((err)=>{
        console.log("Db problem");
        console.error(err);
        process.exit(1);
    });
}