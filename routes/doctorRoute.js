import express from "express";
import { docRegisterController } from "../controllers/regDoctorController.js"

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/docregister",docRegisterController);

export default router;
