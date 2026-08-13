const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const postRoutes = require("./routes/postRoutes");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error(err);
    });
app.get("/api/protected", authMiddleware, (req, res) => {
    res.json({
        message: "You have access to this protected route!",
        user: req.user
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port {process.env.PORT}`);
});