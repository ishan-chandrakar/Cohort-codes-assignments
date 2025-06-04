const express = require('express')
const app = express()

var users = [{
    name: "John",
    kidneys : [{
        healthy: false
    },{
        healthy :true
    }]
}]
app.use(express.json())
app.get("/", function(req, res){
    let johnKidneys = users[0].kidneys.length
    let healthyKidneys = 0
    let unhealthyKidneys = 0
    for(let i=0; i<johnKidneys; i++){
        if(users[0].kidneys[i].healthy)
            healthyKidneys++;
        else
            unhealthyKidneys++;
    }
    res.send({johnKidneys, healthyKidneys, unhealthyKidneys})
})


app.post("/", function(req, res){
    let ishealthy = req.body.ishealthy
    users[0].kidneys.push({
        healthy : ishealthy
    })
    res.send("Done")
})

app.put("/", function(req, res){
    let unhealthyKidneys = 0
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            unhealthyKidneys++;
        }
    }
    if(unhealthyKidneys=0){
        res.status(411).json({
            msg: "All kidneys are healthy"
        })
    }
    else{

        for(let i=0; i<users[0].kidneys.length; i++){
            users[0].kidneys[i].healthy = true
        }
        res.send("Done")
    }
})

app.delete("/", function(req, res){
    let unhealthyKidneys = 0
    for(let i=0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            unhealthyKidneys++;
        }
    }

    if(unhealthyKidneys>0){
        let healthyKidneys = []
        for(let i=0; i<users[0].kidneys.length; i++){
            if(users[0].kidneys[i].healthy){
                healthyKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = healthyKidneys
        res.send("removed unhealthy kidney")
    }
    else{
        res.status(411).json({
            msg: "you have no unhealthy kidney"
        })
    }
})

app.listen(3000)