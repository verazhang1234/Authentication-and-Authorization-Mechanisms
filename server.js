const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// 让 Express 提供 public 目录下的静态文件
app.use(express.static("public"));

// 解析 JSON 请求
app.use(express.json());

// 连接 MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB 连接成功"))
    .catch(err => console.error("❌ MongoDB 连接失败:", err));

// 导入认证路由
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// 监听端口
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ 服务器已启动: http://localhost:${PORT}`);
});
