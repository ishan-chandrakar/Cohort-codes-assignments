const express = require("express");
const app = express();
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const env = require("dotenv").config();

const JWT_key = process.env.JWT_key;

mongoose.connect(process.env.MongoUrl);

app.use(express.json());

app.post("/signup", async function (req, res) {
	const requiredBody = z.object({
		email: z.string().min(5).max(30).email("Invalid email format"),
		password: z
			.string()
			.min(8, { message: "Password should have minimum length of 8" })
			.max(15, "Password is too long")
			.regex(/[A-Z]/, "Password must contain atleast one uppercase character")
			.regex(/[a-z]/, "Password must contain atleast one lowercase character")
            .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
		name: z.string().min(1).max(25),
	});

	const parsedData = requiredBody.safeParse(req.body);

	if (parsedData.error) {
		res.json({
			error: parsedData.error.issues
		});
	}

	const email = req.body.email;
	const password = req.body.password;
	const name = req.body.name;

	try {
		const hashedPassword = await bcrypt.hash(password, 5);

		await UserModel.create({
			email: email,
			password: hashedPassword,
			name: name,
		});
		res.json({
			msg: "You are logged in",
		});
	} catch (error) {
		res.json({
			msg: error.message,
		});
	}
});

app.post("/signin", async function (req, res) {
	const email = req.body.email;
	const password = req.body.password;

	const user = await UserModel.findOne({
		email: email,
	});
	if (!user) {
		res.status(403).json({
			msg: "User doesn't exist",
		});
	}
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (passwordMatch) {
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
