import express from "express";
import { volRegisterController } from "../controllers/volController.js"

//router object create
const router = express.Router()

//rouing 
//register || method post 
router.post("/volregister",volRegisterController);

export default router;
