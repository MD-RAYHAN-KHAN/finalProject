import express from "express";
import { volRegisterController } from "../controllers/regVolController.js"

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/volregister",volRegisterController);

export default router;
