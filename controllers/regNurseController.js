import { hashPassword } from "../helpers/authHelper.js";
import nurseModel from "../models/nurseModel.js";

export const nurseRegisterController = async (req, res) => {
    try {
        const { nursename, email, password,  nmcNo, phone, department, gender } = req.body;

        // Validations
        if (!nursename || !email || !password ||  !nmcNo || !phone || !department || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check user
        const existingUser = await nurseModel.findOne({ email });
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
        const user = await new nurseModel({
            nursename,
            email,
            password: hashedPassword,
            nmcNo,
            phone,
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

  
