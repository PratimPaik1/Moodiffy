const mongoose=require("mongoose")

async function connectDb() {
    await mongoose.connect(process.env.Mongo_Uri)
    console.log("Database connected")
    
}

module.exports=connectDb