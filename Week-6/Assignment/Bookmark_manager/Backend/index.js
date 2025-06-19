const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let bookmarks = [
	{
		id: 1,
		url: "www.google.com",
		category: "search",
	},
	{
		id: 2,
		url: "www.youtube.com",
		category: "search/social",
	},
];

app.post("/add-bookmark", function (req, res) {
	const id = req.body.id;
	const url = req.body.url;
	const category = req.body.category;

	bookmarks.push({
		id: id,
		url: url,
		category: category,
	});
	res.json(bookmarks);
});

app.delete("/delete-bookmark", function (req, res) {
	const id = req.body.id;

	let newBookmark = [];
	for (let i = 0; i < bookmarks.length; i++) {
		if (bookmarks[i].id !== id) newBookmark.push(bookmarks[i]);
	}
	bookmarks = newBookmark;
	res.json(bookmarks);
});

app.get("/get-bookmark", function (req, res) {
    res.json(bookmarks)
});

app.listen(3001, console.log("Backend is running"));
