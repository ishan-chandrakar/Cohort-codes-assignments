const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "PhalanaDhimkana";

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

app.post("/signup", function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (!username && !password) {
		res.send("Enter credentials");
	} else {
		let userExist = false;
		for (let i = 0; i < users.length; i++) {
			if (users[i].username == username) {
				userExist = true;
				res.send("You already have account");
			}
		}
		if (!userExist) {
			users.push({
				username: username,
				password: password,
                todos: []
			});
			res.send("You are Signed Up");
		}
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
			JWT_SECRET_KEY
		);

		res.header("token", token);
		res.json({
			token: token,
		});
	} else {
		res.send("Bhag saale");
	}
});

function auth(req, res, next) {
	const token = req.headers.token;
	const decodedData = jwt.verify(token, JWT_SECRET_KEY);

	if (decodedData.username) {
		req.username = decodedData.username;
		next();
	} else {
		res.json({
			message: "Incorrect credantials",
		});
	}
}

app.get("/my-todos", auth, function (req, res) {
    res.json("Logged In")
});

app.post("/add-todo", auth, function (req, res) {
	let userDetails = null;
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == req.username) {
			userDetails = users[i];
		}
	}

	let id = req.body.id;
	let task = req.body.task;

	userDetails.todos.push({
		id: id,
		task: task
	});
    res.json({userDetails})
    console.log(userDetails)
});

app.post("/delete-todo", auth, function(req, res){
    let userDetails = null;
	for (let i = 0; i < users.length; i++) {
		if (users[i].username == req.username) {
			userDetails = users[i];
		}
	}
    let taskAfterDeleting = []
    for(let j=0; j<userDetails.todos.length; j++){
        if(userDetails.todos[j].id != req.body.id){
            taskAfterDeleting.push({
                id: userDetails.todos[j].id,
                task: userDetails.todos[j].task
            })
        }
    }
    userDetails.todos = taskAfterDeleting

    res.json({userDetails})
})
app.listen(3000);
