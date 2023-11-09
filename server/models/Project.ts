import { Schema, Types, model } from "mongoose";

const projectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Types.ObjectId,
        required: true,
        ref: "User"
    },
    contributors: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ],
    todos: [
        {
            type: Types.ObjectId,
            ref: "Todo"
        }
    ]
    // todos: ["rihsb4785352w89", "487whjdsdsffdg", "r23784bdfsjfdf"]
}, { timestamps: true });

export default model("Project", projectSchema);