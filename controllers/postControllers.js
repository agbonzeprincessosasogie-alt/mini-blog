const Post = require("../models/Post");

const createPost = async(req, res) => {
    try {
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({
                message: "Title and body are required"
            });
        }

        const post = new Post({
            title,
            body,

            author: req.user.id
        });

        const savedPost = await post.save();

        res.status(201).json(savedPost);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const getPosts = async(req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "email");

        res.status(200).json(posts);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const updatePost = async(req, res) => {
    try {
        const { title, body } = req.body;

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to edit this post"
            });
        }

        post.title = title || post.title;
        post.body = body || post.body;

        const updatedPost = await post.save();

        res.status(200).json(updatedPost);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
const deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to delete this post"
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};
module.exports = {
    createPost,
    getPosts,
    updatePost,
    deletePost
};