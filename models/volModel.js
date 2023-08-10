import mongoose from "mongoose";

//create user schema
const volSchema = new mongoose.Schema({
    volname:{
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
    educaion:{
        type:String,
        require:true,
    },
    nidNo:{
        type:Number,
        require:true,
    },
    catagory: {
        type: String,
        enum: ['Hospital', 'Pharmacy', 'Diagonistic Center', 'Other'], // Add more departments if needed
        required: true,
    },
    division: {
        type: String,
        enum: ['Dhaka', 'Chattogram', 'Rajshahi','Khulna', 'Sylhet', 'Mymensingh','Rangpur', 'Barishal'], // Add more departments if needed
        required: true,
    },
    district: {
        type: String,
        enum: ['Dhaka', 'Gazipur', 'Narayanganj', 'other'], // Add more departments if needed
        required: true,
    },
    thana: {
        type: String,
        enum: ['Mirpur', 'Mohammadpur', 'Bonani', 'other'], // Add more departments if needed
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Assuming these are the possible values
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
   
},{timestamps:true})

//database collection name is volunteers
export default mongoose.model('volunteers',volSchema);