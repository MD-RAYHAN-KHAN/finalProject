import express from "express";
import { 
    nurseRegisterController,
    loginController,
    testController,
 } from "../controllers/NurseController.js";
 import {requireSignIn } from "../middlewares/authMiddleware.js";


//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/nurseregister",nurseRegisterController);

//LOGIN || POST
router.post("/nurselogin", loginController);

//test routes
router.get("/test",requireSignIn, testController);

export default router;
