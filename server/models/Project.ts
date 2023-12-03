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
}, { timestamps: true });

export default model("Project", projectSchema);