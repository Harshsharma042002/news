import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check",
                success: false,
            });
        }
        
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists with the same email",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({
            message: "Account is created successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing, please check",
                success: false,
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Incorrect email or password",
                success: false,
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
        
        return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${user.username}`,
            success: true,
            userId: user._id,  
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
;

export const logOut = async (req, res) => {
    try {
        return res.cookie('token', "", { maxAge: 0 }).json({
            message: "Logout is done successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        return res.status(200).json({
            user,
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
