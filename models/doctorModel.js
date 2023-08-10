import mongoose from "mongoose";

//create user schema
const doctorSchema = new mongoose.Schema({
    doctorname:{
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
    bmdcNo:{
        type:Number,
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
export default mongoose.model('doctors',doctorSchema);