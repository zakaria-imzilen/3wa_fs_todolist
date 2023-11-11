import { createLogger, format, transports } from "winston";


export const activityLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: "./logs/activity.log", eol: "\r\n" })
    ],
    format: format.json()
})