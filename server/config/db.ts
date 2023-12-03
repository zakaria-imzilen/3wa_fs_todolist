import { connect } from "mongoose";


const URI = "mongodb://localhost:27017/";

export default async () => {
    try {
        await connect(URI, { dbName: "3WA_SF_TODO" });
        console.log("Connected successfuly")
    } catch (error) {
        console.log("DB Issue: ", error);
    }
}