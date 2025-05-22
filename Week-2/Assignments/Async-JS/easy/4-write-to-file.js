// ## Write to a file
// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

const fs = require("fs")
let content = "Aur bhai kya haal hai?"
fs.writeFile("./easy/a.txt",content, "utf-8", function(err,data){
    console.log("changes done");
})
