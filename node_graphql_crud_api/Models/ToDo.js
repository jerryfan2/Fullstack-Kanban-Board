import mongoose from "mongoose";

const toDoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    }
})

export const toDoModel = mongoose.model("todo", toDoSchema);