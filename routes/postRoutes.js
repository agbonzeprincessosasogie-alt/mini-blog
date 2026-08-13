const express = require("express");

const {
    createPost,
    getPosts,
    updatePost,
    deletePost

} = require("../controllers/postControllers");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getPosts);

router.post("/", authMiddleware, createPost);

router.put("/:id", authMiddleware, updatePost);

router.delete("/:id", authMiddleware, deletePost);
module.exports = router;