import { hashPassword } from "../helpers/authHelper.js";
import volModel from "../models/volModel.js";

export const volRegisterController = async (req, res) => {
    try {
        const { volname, email, password, phone, education, nidNo, catagory, division, district, thana, gender, address } = req.body;

        // Validations
        if (!volname || !email || !password || !phone || !education || !nidNo || !catagory || !division || !district || !thana || !gender || !address) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check user
        const existingUser = await volModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists. Please log in." });
        }

        // Validate catagory, division, district, thana, and gender
        const validCatagory = ['Hospital', 'Pharmacy', 'Diagonistic Center', 'Other'];
        if (!validCatagory.includes(catagory)) {
            return res.status(400).json({ success: false, message: "Invalid Catagory selected." });
        }

        const validDivsion = ['Dhaka', 'Chattogram', 'Rajshahi','Khulna', 'Sylhet', 'Mymensingh','Rangpur', 'Barishal'];
        if (!validDivsion.includes(division)) {
            return res.status(400).json({ success: false, message: "Invalid division selected." });
        }

        const validDistrict = ['Dhaka', 'Gazipur', 'Narayanganj', 'other'];
        if (!validDistrict.includes(district)) {
            return res.status(400).json({ success: false, message: "Invalid district selected." });
        }

        const validThana = ['Mirpur', 'Mohammadpur', 'Bonani', 'other'];
        if (!validThana.includes(thana)) {
            return res.status(400).json({ success: false, message: "Invalid Thana selected." });
        }

        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ success: false, message: "Invalid gender selected." });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new volModel({
            volname,
            email,
            password: hashedPassword,
            phone,
            education,
            nidNo,
            catagory,
            division,
            district,
            thana,
            gender,
            address
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

  
