// authController.js 中的代码
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.login = async (req, res) => {
    try {
        // 添加调试日志
        console.log('Login request received:', req.body);
        
        const { username, password } = req.body;

        // 1. 检查用户是否存在（同时支持username和email登录）
        const user = await User.findOne({
            $or: [
                { username: username },
                { email: username }
            ]
        });

        // 添加调试日志
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // 2. 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        
        // 添加调试日志
        console.log('Password match:', isMatch ? 'Yes' : 'No');

        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        // 3. 生成 JWT Token
        const token = jwt.sign(
            { userId: user._id }, 
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // 4. 返回成功响应
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// 添加登出功能
exports.logout = async (req, res) => {
    try {
        // 客户端需要清除token
        res.json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};
