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
            _id: {
                type: Types.ObjectId,
                ref: "User"
            },
            role: {
                type: String,
                enum: ["admin", "user"]
            }
        }
    ],
}, { timestamps: true });

export default model("Project", projectSchema);