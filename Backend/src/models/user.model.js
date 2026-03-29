const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName: {
        type: String,
        unique: [true, "User alredy existas"],
        required: [true, "User name is required"],
    },
    email: {
        type: String,
        unique: [true, "User alredy existas"],
        required: [true, "email is required"],

    },
    password: {
        type: String,
        required: [true, "password is required"],
        select:false
        
        
    }
})

const userModel = mongoose.model("userModel", userSchema)

module.exports = userModel 