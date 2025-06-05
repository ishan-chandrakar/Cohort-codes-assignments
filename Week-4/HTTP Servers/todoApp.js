const express = require("express");
const app = express();
app.use(express.json());

let tasks = [
    {
        id: 1,
        task: "eating",
    },
    {
        id: 2,
        task: "sleeping",
    },
];

app.get("/", function (req, res) { 
    res.send(tasks)
});
app.post("/", function(req, res){
    const task = req.body.task
    let id = tasks.length + 1
    tasks.push({
        id: id,
        task: task
    })
    res.send("Added task")
})

app.put("/", function(req, res){
    const oldTask = req.body.oldTask
    const newTask = req.body.newTask

    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task == oldTask){
            tasks[i].task = newTask
        }
    }
    res.send("Task updated")
})

app.delete("/", function(req, res){
    const delTask = req.body.delTask
    let updatedTasks = []
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].task != delTask){
            updatedTasks.push(tasks[i])
        }
    }
    tasks = updatedTasks
    res.send("Task deleted")
})
app.listen(3000);
