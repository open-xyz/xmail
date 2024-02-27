"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
// Helper function to generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};
// Registration Route
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Please provide an email and password" });
    }
    // Check if user already exists
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    // Create user
    const user = yield User_1.default.create({
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400).json({ message: "Invalid user data" });
    }
}));
// Login Route
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    // Check for user email
    const user = yield User_1.default.findOne({ email });
    if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
        res.json({
            _id: user.id,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(401).json({ message: "Invalid email or password" });
    }
}));
exports.default = router;
