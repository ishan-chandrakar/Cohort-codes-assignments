const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema({
    name: String,
    password: String,
    email: {type: String, unique: true}
})

const Todo = new Schema({
    description: String,
    status: Boolean,
    userId: ObjectId
})

const UserModel = mongoose.model("users", User)
const TodoModel = mongoose.model("todos", Todo)

module.exports = {
    UserModel, TodoModel
}