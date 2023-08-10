import mongoose from "mongoose";

//create user schema
const nurseSchema = new mongoose.Schema({
    nursename:{
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
    nmcNo:{
        type:Number,
        require:true,
    },
    phone:{
        type:String,
        require:true,
    },
    department: {
        type: String,
        enum: ['Cardiology', 'Orthopedics', 'Neurology', 'Other'], // Add more departments if needed
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Assuming these are the possible values
        required: true,
    }
   
},{timestamps:true})

//database collection name is nurses
export default mongoose.model('nurses',nurseSchema);