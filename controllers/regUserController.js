import { hashPassword } from "../helpers/authHelper.js";
import doctorModel from "../models/doctorModel.js";

export const userRegisterController = async (req, res) => {
    try {
      const { name, email, password,repassword, phone} = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!repassword) {
        return res.send({ message: "Repassword no is Required" });
      }
      else if(password !== repassword) {
        return res.send({ message: "Passwords do not match" });
      }
      if (!phone) {
        return res.send({ message: "Phone Number is Required" });
      }
      //check user
      const exisitingUser = await doctorModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new doctorModel({
        name,
        email,
        password: hashedPassword,
        repassword: hashedPassword,
        phone,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in Registeration",
        error,
      });
    }
  };
  
