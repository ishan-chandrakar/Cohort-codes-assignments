const express = require("express")
const app = express()

function sumTillN(n){
    let num = Number(n)
    return num*(num+1)/2
}
app.get("/", function(req, res){
    let n = req.query.n;
    const ans = sumTillN(n)
    res.send(`hi your ans is ${ans}`)
})
app.listen(3000)