import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import nurseModel from "../models/nurseModel.js";
import JWT from "jsonwebtoken";

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

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await nurseModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registerd",
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                nursename: user.nursename,
                email: user.email,
                phone: user.phone,
                nmcNo: user.nmcNo,
                department: user.department,
                gender: user.gender
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};
//test controller
export const testController = (req, res) => {
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error });
    }
};


  
