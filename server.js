const mongoose = require("mongoose");
const app = require("./app");

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Database Connected");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
    });