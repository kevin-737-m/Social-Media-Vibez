const postModel = require("../models/post.model");
const { uploadFile, deleteFile } = require("../storage/storage.service.js");

const createPost = async (req, res) => {
    const { title, description } = req.body;

    if (!req.file) return res.status(400).json({
        message: "Image is required"
    });

    const result = await uploadFile(req.file.buffer);

    const post = await postModel.create({
        image: result.url,
        imageKitFileId: result.fileId,
        title,
        description,
        userId: req.id,
        likes: [],
        comments: []
    });
    res.status(201).json({
        message: "Post created successfully",
        post
    })
}

const getAllPosts = async (req, res) => {
    const posts = await postModel.find().populate("comments.userId", "username");
    res.status(200).json({
        message: "Posts fetched successfully",
        posts
    })
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findOneAndDelete({
        userId: req.id,
        _id: id
    });
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    await deleteFile(post.imageKitFileId);

    res.status(200).json({
        message: "Post deleted successfully",
        post
    })
}

const likePost = async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) { // check if the post exists
        return res.status(404).json({
            message: "Post not found"
        })
    }
    const hasLiked = post.likes.some((id) => id.toString() === req.id.toString());
    if (hasLiked) {
        post.likes = post.likes.filter((id) => id.toString() !== req.id.toString());
    } else {
        post.likes.push(req.id);
    }
    await post.save();
    await post.populate("comments.userId", "username");
    res.status(200).json({
        message: "Post liked successfully",
        post
    })
}

const commentPost = async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;

    const post = await postModel.findById(id);
    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }
    post.comments.push({
        text: comment,
        userId: req.id
    })
    await post.save();
    await post.populate("comments.userId", "username");
    res.status(200).json({
        message: "Comment added successfully",
        post
    })
}


module.exports = { createPost, getAllPosts, deletePost, likePost, commentPost };