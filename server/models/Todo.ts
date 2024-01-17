import { Schema, Types, model } from "mongoose";
import { v4 } from "uuid";
import { TodoStatus } from "../interfaces";

const todoSchema = new Schema({
    label: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        default: TodoStatus.TODO,
    },
    projectId: {
        type: Types.ObjectId,
        required: true,
    },
    collaborators: [
        {
            type: Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true
});

export default model("Todo", todoSchema);
