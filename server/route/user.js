const express = require("express");
const router = express.Router();
const User = require("../model/user");
const Post = require("../model/Post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const user = require("../model/user");

const salt = bcrypt.genSaltSync(10);

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  let userCheck = await User.findOne({ username });
  if (userCheck) {
    return res.status(400).send("User with the provided email already exist.");
  }

  const user = new User({
    username: username,
    password: bcrypt.hashSync(password, salt),
  });

  user
    .save()
    .then((result) => {
      res.status(201).send({
        message: "user registered succesfully",
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error registering User.",
        error,
      });
    });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, data) => {
        if (err) throw err;

        const token = jwt.sign(
          {
            ID: user._id,
            username: user.username,
          },
          "RANDOM-TOKEN",
          {
            expiresIn: "24h",
          }
        );

        if (data) {
          return res.status(200).send({
            message: "login sucess",
            username: user.username,
            token,
          });
        } else {
          return res.status(401).send({
            message: "Invalid Credentials",
          });
        }
      });
    })
    .catch((error) => {
      res.status(404).send({
        message: "Email not exist",
        error,
      });
    });
});

router.get("/profile", auth, (req, res) => {
  res.send({ message: "You are authorized to acess.", user: req.user });
});

router.post(
  "/post",
  uploadMiddleware.single("file"),
  auth,
  async (req, res) => {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { title, summary, content } = req.body;

    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: req.user.ID,
    });

    console.log(postDoc);
    res.json(postDoc);
  }
);

router.get("/post", async (req, res) => {
  const posts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 });
  res.send(posts);
});

router.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);
  res.json(postDoc);
});

module.exports = router;
