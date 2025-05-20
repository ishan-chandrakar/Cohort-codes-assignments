// setTimeout(function(){
//     console.log("hello world");
// }, 3000)

// promisified version of setTimeout
function setTimeoutPromisified(ms) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, ms);
    });
}
setTimeoutPromisified(3000).then(() => {
    console.log("hello world");
});


const fs = require("fs");
// fs.readFile("a.txt", "utf-8", function(err, data){
//     console.log(`Content of a.txt file is : ${data}`)
// })

// promisified version of fs.readFile()
function readFilePromisified(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, "utf-8", function (err, data) {
			if (err) reject("Error occured");
			else resolve(data);
		});
	});
}

readFilePromisified("a.txt")
	.then((data) => {
		console.log(`Content of a.txt file is : ${data}`);
	})
	.catch((error) => {
        console.log(error)
    });
