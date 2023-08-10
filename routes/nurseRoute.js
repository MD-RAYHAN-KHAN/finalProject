import express from "express";
import { nurseRegisterController } from "../controllers/regNurseController.js"

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/nurseregister",nurseRegisterController);

export default router;
