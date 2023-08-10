import express from "express";
import { userRegisterController } from "../controllers/regUserController.js"

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/register",userRegisterController);

export default router;