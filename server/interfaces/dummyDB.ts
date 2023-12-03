import { Types } from "mongoose";

export interface ObjectIdInt {
    prototype?: Types.ObjectId | undefined;
    cacheHexString?: unknown;
    generate?: {} | undefined;
    createFromTime?: {} | undefined;
    createFromHexString?: {} | undefined;
    createFromBase64?: {} | undefined;
    isValid?: {} | undefined;
}