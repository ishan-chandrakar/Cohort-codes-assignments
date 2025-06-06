// Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console

const express = require("express");
const app = express();

function log(req, res, next){
    let method = req.method
    let url = req.url
    let timeStamp = new Date().toLocaleString()
    console.log(`${method}, ${url}, ${timeStamp}`);
    next();
}
app.use(log)
app.get("/sum", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);

    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});
    
app.listen(3000);