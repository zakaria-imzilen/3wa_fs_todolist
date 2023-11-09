import { Schema, Types, model } from "mongoose";
import { v4 } from "uuid";

const userSchema = new Schema({
    _id: {
        type: Types.ObjectId,
    },
    id: {
        type: String,
        required: true,
        default: v4(),
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pwd: {
        type: String,
        required: true,
    },
});

export default model("User", userSchema);
