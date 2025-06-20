const express = require("express");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	const hashedPassword = await bcrypt.hash(password, 10);
	console.log(hashedPassword);

	await UserModel.create({
		email: email,
		password: hashedPassword,
		name: name,
	});

	res.json({
		message: "You are signed up",
	});
});

app.post("/signin", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;

	const response = await UserModel.findOne({
		email: email,
		password: password,
	});

	if (response) {
		const token = jwt.sign(
			{
				id: response._id.toString(),
			},
			process.env.JWT_SECRET
		);

		res.json({
			token,
		});
	} else {
		res.status(403).json({
			message: "Incorrect creds",
		});
	}
});

app.post("/todo", auth, async function (req, res) {
	const userId = req.userId;
	const title = req.body.title;
	const done = req.body.done;

	await TodoModel.create({
		userId,
		title,
		done,
	});

	res.json({
		message: "Todo created",
	});
});

app.get("/todos", auth, async function (req, res) {
	const userId = req.userId;

	const todos = await TodoModel.find({
		userId,
	});

	res.json({
		todos,
	});
});

function auth(req, res, next) {
	const token = req.headers.authorization;

	const response = jwt.verify(token, process.env.JWT_SECRET);

	if (response) {
		req.userId = response.id;
		next();
	} else {
		res.status(403).json({
			message: "Incorrect creds",
		});
	}
}

app.listen(3000);
