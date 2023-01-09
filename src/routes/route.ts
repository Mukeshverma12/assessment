import express from "express";
const router= express.Router();
import { userDetails,createUser,userlogin,selectSlot,slotApproval } from "../controller/userController";

router.get("",userDetails);
router.post("",createUser);
router.post("/login",userlogin);
router.post('/selectslot',selectSlot)
router.post('/slotapproval',slotApproval)


export default router;