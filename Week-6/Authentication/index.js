const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "phalanaDhimkana";

app.use(express.json());

const users = [];

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", function (req, res) {
	let username = req.body.username;
	let password = req.body.password;

	let foundUser = false;
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == username && users[i].password == password) {
			foundUser = true;
			res.send("User already exists");
		}
	}
	if (!foundUser) {
		users.push({
			username: username,
			password: password,
		});
		res.send("Signed-Up");
	}
});

app.post("/signin", function (req, res) {
	let username = req.body.username;
	let password = req.body.password;

	let foundUser = null;
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == username && users[i].password == password) {
			foundUser = users[i];
		}
	}
	if (foundUser) {
		const token = jwt.sign(
			{
				username: foundUser.username,
			},
			JWT_SECRET
		);
		res.header("token", token);
		res.json({
			token: token,
		});
	} else {
		res.json({
			message: "User doesnot exist 😔",
		});
	}
});

function auth(req, res, next) {
	const token = req.headers.token;
	const decodedData = jwt.verify(token, JWT_SECRET);

	if (decodedData.username) {
		req.username = decodedData.username;
		next();
	} else {
		res.json({
			message: "Incorrect credantials",
		});
	}
}

app.get("/me", auth, function (req, res) {
	let foundUser = null;
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == req.username) {
			foundUser = users[i];
		}
	}
	res.json({
		username: foundUser.username,
		password: foundUser.password,
	});
});

app.listen(3000);
