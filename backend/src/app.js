const express = require("express");
const authroute = require("./routes/auth.routes.js");
const postroute = require("./routes/post.routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin: "https://social-media-vibez.vercel.app",
    credentials: true
}));

app.use("/api/auth", authroute);
app.use("/api/posts", postroute);

module.exports = app;