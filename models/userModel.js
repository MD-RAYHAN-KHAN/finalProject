import mongoose from "mongoose";

//create user schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Assuming these are the possible values
        required: true,
    }
    
},{timestamps:true})
export default mongoose.model('users',userSchema);