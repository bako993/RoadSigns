import express from "express";
import { getAllAdmins, getAdmin, registerAdmin, loginAdmin, updateAdmin, deleteAdmin } from "../controllers/admins.js";
import { authenticateToken } from '../middlewares/auth_token.js';

const router = express.Router();

router.get("/", authenticateToken, getAllAdmins);
router.get("/:id", authenticateToken, getAdmin);
router.put("/:id", authenticateToken, updateAdmin);
router.delete("/:id", authenticateToken, deleteAdmin);

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;