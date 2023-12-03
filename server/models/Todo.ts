import { Schema, Types, model } from "mongoose";
import { v4 } from "uuid";
import { TodoStatus } from "../interfaces";

const todoSchema = new Schema({
    id: {
        type: String,
        required: true,
        default: v4(),
    },
    label: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: TodoStatus.TODO
    },
    projectId: {
        type: Types.ObjectId,
        required: true
    }
});


export default model("Todo", todoSchema);