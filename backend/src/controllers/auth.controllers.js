const jwt = require("jsonwebtoken");
const authModel = require("../models/auth.model");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await authModel.create({
        username,
        email,
        password: hash
    });

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000
    });

    res.status(201).json({
        message: "User registered successfully",
        user: {
            username,
            email
        }
    });
}

const login = async (req, res) => {
    const { username, email, password } = req.body;
    const loginKey = username || email;

    if (!loginKey || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const user = await authModel.findOne({
        $or: [
            { username: loginKey },
            { email: loginKey }
        ]
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid password"
        });
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600000
    });

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.username,
            email: user.email
        }
    });
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = { register, login, logout }
