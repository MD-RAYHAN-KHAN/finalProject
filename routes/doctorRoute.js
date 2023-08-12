import express from "express";
import {
    docRegisterController,
    loginController,
    testController,
 } from "../controllers/doctorController.js";
 import {requireSignIn } from "../middlewares/authMiddleware.js";

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/docregister",docRegisterController);

//LOGIN || POST
router.post("/doctorlogin", loginController);

//test routes
router.get("/doctortest",requireSignIn, testController);

export default router;
