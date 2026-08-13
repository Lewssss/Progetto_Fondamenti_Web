import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};

export const refreshToken = async (req, res) => {
    const token = req.body.refreshToken;
    if (!token) {
        return res.status(401).json({ message: "Refresh token missing." });
    }

    try {
        const user = await User.findOne({ refreshToken: token });
        if (!user) {
            return res.status(403).json({ message: "Invalid refresh token." });
        }

        jwt.verify(token, process.env.JWT_REFRESH_KEY, (err) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token." });
            }

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.JWT_ACCESS_KEY,
                { expiresIn: "1h" }
            );

            res.json({ token: accessToken });
        });
    } catch (error) {
        return res.status(403).json({ message: "Server error." });
    }
};

export const deleteToken = async (req, res) => {
    const token = req.body.refreshToken;
    try {
        if (token) {
            await User.findOneAndUpdate(
                { refreshToken: token },
                { $set: { refreshToken: null } }
            );
        }
        res.json({ message: "Logged out successfully." });
    } catch (error) {
        return res.status(403).json({ message: "Server error." });
    }
};
