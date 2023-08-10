import { hashPassword } from "../helpers/authHelper.js";
import doctorModel from "../models/doctorModel.js";

export const docRegisterController = async (req, res) => {
    try {
        const { doctorname, email, password, phone, bmdcNo, department, gender } = req.body;

        // Validations
        if (!doctorname || !email || !password || !phone || !bmdcNo || !department || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check user
        const existingUser = await doctorModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists. Please log in." });
        }

        // Validate department and gender
        const validDepartments = ['Cardiology', 'Orthopedics', 'Neurology', 'Other'];
        if (!validDepartments.includes(department)) {
            return res.status(400).json({ success: false, message: "Invalid department selected." });
        }

        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ success: false, message: "Invalid gender selected." });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new doctorModel({
            doctorname,
            email,
            password: hashedPassword,
            phone,
            bmdcNo,
            department,
            gender
        }).save();

        res.status(201).json({
            success: true,
            message: "User registered successfully.",
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error in registration.",
            error,
        });
    }
};

  
