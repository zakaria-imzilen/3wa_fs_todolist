import { Schema, Types, model } from "mongoose";
import { v4 } from "uuid";

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
    }
});


export default model("Todo", todoSchema);