const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
require('dotenv').config();
const JWT_Secret = process.env.JWT_Secret;

mongoose.connect(process.env.MONGO_URL)

app.use(express.json());

app.post("/signup", async function (req, res) {
    await UserModel.create({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
    });
    res.json({
        msg: "You are logged in",
    });
});

app.post("/login", async function (req, res) {
    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    console.log(user);

    if (user) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_Secret)
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            msg: "Incorrect Credentials",
        });
    }
});

app.post("/todo", auth, async function (req, res) {

    await TodoModel.create({
        description: req.body.description,
        status: req.body.status,
        userId: req.userId
    })
    res.json({
        msg: "Task added"
    })
});

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId
    const todos = await TodoModel.find({
        userId
    })
    res.json({
        todos
    })
});

function auth(req, res, next) {
    const token = req.headers.token
    const verifyToken = jwt.verify(token, JWT_Secret)

    if (verifyToken) {
        req.userId = verifyToken.id
        next();
    }
    else {
        res.status(403).json({
            msg: "incorrect credentials"
        })
    }
}

app.listen(3000);
