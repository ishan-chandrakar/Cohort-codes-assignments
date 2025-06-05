const express = require("express");
const app = express();
app.use(express.json());

// function isOldEnough(age){
//     if(Number(age)>=14)
//         return true
//     else
//         return false
// }
function isOldEnoughMiddleware(req, res, next) {
	const age = req.query.age;
	if (Number(age) >= 14) next();
	else {
		res.json({
			msg: "You are underage",
		});
	}
}
app.use(isOldEnoughMiddleware)
app.get("/ride1", isOldEnoughMiddleware, function (req, res) {
	res.json({
		msg: "You have successfully riden to ride 1",
	});
});

app.listen(3000);
