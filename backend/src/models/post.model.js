const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth",
    },
    image: {
        type: String,
        required: true,
    },
    imageKitFileId: String,

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "auth"
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "auth"
        },
        text: {
            type: String
        }
    }],
}, {
    timestamps: true
});

const postModel = mongoose.model("post", postSchema);

module.exports = postModel;