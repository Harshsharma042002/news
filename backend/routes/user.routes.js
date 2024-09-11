import express from "express";
import { getProfile, login, logOut, register } from "../controllers/user.controller.js"; // Corrected path
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logOut);
router.route('/:id/profile').get(isAuthenticated, getProfile);

export default router;

