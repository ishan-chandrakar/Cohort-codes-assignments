let taskNum = 1;

async function signUp() {
	const response = await axios.post("http://localhost:3000/signup", {
		username: document.querySelector("#signup-username").value,
		password: document.querySelector("#signup-password").value,
	});
	// alert(response.data);
	if (response.data == "You are Signed Up") {
		let signUpDiv = document.querySelector("#signUp");
		let signInDiv = document.querySelector("#signIn");

		signUpDiv.style.display = "none";
		signInDiv.style.display = "flex";
	}
}

async function signIn() {
	const response = await axios.post("http://localhost:3000/signin", {
		username: document.querySelector("#signin-username").value,
		password: document.querySelector("#signin-password").value,
	});
	localStorage.setItem("token", response.data.token);
	if (response.data.token) {
		// alert("Sign-in successfull")
		myTodos();
	} else {
		alert("Incorrect credantials");
	}
}

async function myTodos() {
	const signUp = document.querySelector("#signUp");
	const signIn = document.querySelector("#signIn");
	const myTasks = document.querySelector("#myTasks");
	myTasks.style.display = "flex";
	signUp.style.display = "none";
	signIn.style.display = "none";

	await axios.get("http://localhost:3000/my-todos", {
		headers: {
			token: localStorage.getItem("token"),
		},
	});
}

async function addTodo() {
	let taskValue = document.querySelector("#task").value;
	let delBtn = document.createElement("button");
	delBtn.innerHTML = `<button onclick="delTask(${taskNum})">Delete</button>`;

	let task = document.createElement("span");
	task.innerText = taskValue;

	let newTask = document.createElement("div");
	newTask.setAttribute("id", taskNum);
	newTask.appendChild(task);
	newTask.appendChild(delBtn);

	document.querySelector("#myTasks").appendChild(newTask);

	const response = await axios.post(
		"http://localhost:3000/add-todo",
		{
			id: taskNum,
			task: taskValue,
		},
		{
			headers: {
				token: localStorage.getItem("token"),
			},
		}
	);

	taskNum++;
	console.log(response.data);
}

async function delTask(taskNum) {
	let myTasks = document.querySelector("#myTasks");
	let deleteTask = document.getElementById(taskNum);
	myTasks.removeChild(deleteTask);

	const response = await axios.post(
		"http://localhost:3000/delete-todo",
		{
			id: taskNum
		},
		{
			headers: {
				token: localStorage.getItem("token")
			}
		}
	);
	console.log(response.data);
}
