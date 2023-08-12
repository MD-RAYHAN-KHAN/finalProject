import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const userRegisterController = async (req, res) => {
    try {
        const { name, email, password, phone, gender } = req.body;

        // Validations
        if (!name || !email || !password || !phone || !gender) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Check user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User already exists. Please log in." });
        }

        // Validate gender
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(gender)) {
            return res.status(400).json({ success: false, message: "Invalid gender selected." });
        }

        // Register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            phone,
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
        const user = await userModel.findOne({ email });
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
                name: user.name,
                email: user.email,
                phone: user.phone,
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
