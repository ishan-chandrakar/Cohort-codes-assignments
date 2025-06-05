const express = require("express")
const fs = require("fs");
const { json } = require("stream/consumers");
const app = express()
const filepath = "./tasks.json"

app.use(express.json());

app.get("/", function(req, res){
    const data = fs.readFileSync(filepath)
    res.json(JSON.parse(data))
})

app.post("/", function(req, res){
    const task = req.body.task
    const data = fs.readFileSync(filepath)
    let tasks = JSON.parse(data)
    let id = tasks.length + 1
    tasks.push({
        "id": id,
        "task": task
    })
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 4))
    res.send("Done")
})

app.put("/", function(req, res){
    const oldTask = req.body.oldTask
    const newTask = req.body.newTask
    const data = fs.readFileSync(filepath)
    let tasks = JSON.parse(data)
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task == oldTask){
            tasks[i].task = newTask
            fs.writeFileSync(filepath, JSON.stringify(tasks, null, 4))
        }
    }
    res.send("Task updated")
})

app.delete("/", function(req, res){
    const delTask = req.body.delTask
    let updatedTasks = []
    const data = fs.readFileSync(filepath)
    let tasks = JSON.parse(data)
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task != delTask){
            updatedTasks.push(tasks[i])
        }
    }
    tasks = updatedTasks
    fs.writeFileSync(filepath, JSON.stringify(tasks, null, 4))
    res.send("Task deleted")
})

app.listen(3000)