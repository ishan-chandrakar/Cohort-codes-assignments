let taskId = 3;

document
	.querySelector("#add-bookmark-btn")
	.addEventListener("click", function () {
		addBookmark(taskId);
	});

async function addBookmark(idNum) {
	let url = document.querySelector("#bookmark-url").value;
	let category = document.querySelector("#bookmark-category").value;
	// let idNum = taskId;
	let delBtn = document.createElement("button");
	delBtn.textContent = "Delete";
	delBtn.setAttribute("class", "delete-btn");
	delBtn.setAttribute("id", idNum);
	delBtn.addEventListener("click", function () {
		deleteBookmark(idNum);
	});

	let newUrl = document.createElement("li");
	newUrl.setAttribute("id", `Url-${idNum}`);
	newUrl.textContent = `${url} (${category})`;
	newUrl.appendChild(delBtn);

	document.querySelector("#bookmark-list").appendChild(newUrl);
	document.querySelector("#bookmark-url").value = "";
	document.querySelector("#bookmark-category").value = "";
	taskId++;

	const res = await axios.post("http://localhost:3001/add-bookmark", {
		id: idNum,
		url: url,
		category: category,
	});
	console.log(res.data);
}

async function deleteBookmark(idNum) {
	let urlLi = document.getElementById(`Url-${idNum}`);
	let bookmarkList = document.getElementById("bookmark-list");
	bookmarkList.removeChild(urlLi);

	const res = await axios.delete("http://localhost:3001/delete-bookmark", {
		data: {
			id: idNum,
		},
	});
	console.log(res.data);
}

async function getBookmarks() {
	const res = await axios.get("http://localhost:3001/get-bookmark");
	let bookmark = res.data;

	for (let i = 0; i < bookmark.length; i++) {
		let delBtn = document.createElement("button");
		delBtn.textContent = "Delete";
		delBtn.setAttribute("class", "delete-btn");
		delBtn.setAttribute("id", bookmark[i].id);
		delBtn.addEventListener("click", function () {
			deleteBookmark(bookmark[i].id);
		});

		let newUrl = document.createElement("li");
		newUrl.setAttribute("id", `Url-${bookmark[i].id}`);
		newUrl.textContent = `${bookmark[i].url} (${bookmark[i].category})`;
		newUrl.appendChild(delBtn);

		document.querySelector("#bookmark-list").appendChild(newUrl);
	}
}
getBookmarks();
