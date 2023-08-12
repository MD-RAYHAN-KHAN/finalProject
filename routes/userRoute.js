import express from "express";
import { 
    userRegisterController,
    loginController,
    testController,
 } from "../controllers/userscontroller.js"
 import {requireSignIn } from "../middlewares/authMiddleware.js";

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/userregister",userRegisterController);

//LOGIN || POST
router.post("/userlogin", loginController);

//test routes
router.get("/usertest",requireSignIn, testController);

export default router;