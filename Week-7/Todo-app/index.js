const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const env = require("dotenv").config()

const JWT_key = process.env.JWT_key;

mongoose.connect(process.env.MongoUrl);

app.use(express.json());

app.post("/signup", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	await UserModel.create({
		email: email,
		password: password,
		name: name,
	});
	res.json({
		msg: "You are logged in",
	});
});

app.post("/login", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;

	const user = await UserModel.findOne({
		email: email,
		password: password,
	});
	console.log(user);

	if (user) {
		const token = jwt.sign(
			{
				id: user._id,
			},
			JWT_key
		);
		res.json({ token });
	} else {
		res.send({
			msg: "incorrect credentials",
		});
	}
});

app.post("/todo", auth, async function (req, res) {
	await TodoModel.create({
		userId: req.userId,
		description: req.body.description,
		done: req.body.done,
	});
	res.json({
		msg: "task added",
	});
});

app.get("/todos", function (req, res) {});

function auth(req, res, next) {
	const token = req.headers.token;

	const response = jwt.verify(token, JWT_key);
	if (response) {
		req.userId = response.id;
		next();
	} else {
		res.json({
			msg: "Incorrect token",
		});
	}
}

app.listen(3000);
