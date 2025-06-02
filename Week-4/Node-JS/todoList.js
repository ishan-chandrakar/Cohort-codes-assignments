let count = 2;
const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
	.name("counter")
	.description("CLI to do file based tasks")
	.version("0.8.0");

program
	.command("add")
	.description("task to add")
	.argument("<string>", "task to add")
	.action((string) => {
		fs.readFile("./todos.json", "utf-8", function (err, data) {
			let tasks = JSON.parse(data);

			const newTask = {
				id: tasks.length + 1,
				task: string,
				completed: false,
			};
			tasks.push(newTask);

			fs.writeFile(
				"./todos.json",
				JSON.stringify(tasks, null, 4),
				(err) => {
					console.log("New task added and file updated.");
				}
			);
		});
	});

program
	.command("delete")
	.description("task to delete")
	.argument("<delTask>", "task to delete")
	.action((delTask) => {
		fs.readFile("./todos.json", "utf-8", function (err, data) {
			let tasks = JSON.parse(data);

			let delTaskId = null;
			for (let i = 0; i < tasks.length; i++) {
				if (tasks[i].task == delTask) {
					delTaskId = i;
				}
			}
			let newTask = [];
			for (let i = 0; i < tasks.length; i++) {
                if(i==delTaskId)
                    continue
				const individualTask = {
					id: i+1,
					task: tasks[i].task,
					completed: tasks[i].completed,
				};
                newTask.push(individualTask)
			}

			// console.log(delTaskId);

			fs.writeFile("./todos.json", JSON.stringify(newTask,null,4), (err) => {
				console.log("Task deleted");
			});
		});
	});

program
	.command("completed")
	.description("task completed")
	.argument("<completed>", "task completed")
	.action((completed) => {
		fs.readFile("./todos.json", "utf-8", function (err, data) {
            let tasks = JSON.parse(data)
            
            for(let i=0; i<tasks.length; i++){
                if(tasks[i].task==completed){
                    tasks[i].completed = true
                }
            }
            fs.writeFile("./todos.json", JSON.stringify(tasks, null, 4), (err)=>{
                console.log(`task ${completed} is marked as completed`)
            })
		});
	});

program.parse();
