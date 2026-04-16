const mongoose= require("mongoose");

async function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Database connect!");
    })
    .catch((err)=>{
        console.log("Error connecting to DB", err);
    })
}


module.exports= connectDB;