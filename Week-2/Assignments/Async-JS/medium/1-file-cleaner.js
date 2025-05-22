// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```hello     world    my    name   is       raman```

// After the program runs, the output should be

// ```hello world my name is raman```

const fs = require("fs")
let content = fs.readFileSync("./medium/a.txt", 'utf8', function(err, data){
    
});

function clean(content){
    content = content.replace(/\s+/g,' ').trim()
    return content;
}

fs.writeFile("./medium/a.txt", clean(content), "utf-8", function(err,data){
    console.log("file cleaned");
})
fs.readFile("./medium/a.txt", 'utf-8', function(err, data){
    console.log(data)
})