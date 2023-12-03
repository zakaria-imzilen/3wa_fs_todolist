import { faker } from "@faker-js/faker";
import User from "../models/User";
import Todo from "../models/Todo";
import Project from "../models/Project";
import { TodoStatus } from "../interfaces";
import { Types } from "mongoose";
import { ObjectIdInt } from "../interfaces/dummyDB";
import { activityLogger } from "./logger";

type User = {
    fullName: String;
    email: String;
    pwd: String;
};

type Task = {
    label: String;
    user: Object;
    status: TodoStatus;
    projectId: Types.ObjectId
};

type Project = {
    title: String;
    creator: Object;
    contributors: Array<{}>;
};

export const generateUsers = (num: number) => {
    const users: Array<User> = [];

    for (let i = 0; i < num; i++) {
        users.push({
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            pwd: faker.internet.password(),
        });
    }

    return User.insertMany(users)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const generateProjects = async (num: number) => {
    const projects: Array<Project> = [];

    const randomUsersIds = await User.find({}).select("_id");

    for (let i = 0; i < num; i++) {
        const randomId =
            randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;

        const randomId1 =
            randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;
        const randomId2 =
            randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;
        const randomId3 =
            randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;

        projects.push({
            title: faker.word.words(),
            creator: randomId,
            contributors: [randomId1, randomId2, randomId3],
        });
    }

    return Project.insertMany(projects)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        });
};

export const generateTasks = async (num: number) => {
    const tasks: Array<Task> = [];

    try {
        for (let i = 0; i < num; i++) {
            const randomUserId = await guessRandomUserId();
            const randomPrjId = await guessRandomProjectId();

            if (randomUserId && randomPrjId) tasks.push({
                label: faker.word.words(),
                user: randomUserId,
                status: TodoStatus.TODO,
                projectId: randomPrjId
            });
        }

        Todo.insertMany(tasks)
            .then((resp) => {
                console.log("Success - Generating new tasks response: ", resp);
            })
            .catch((err) => {
                console.log("Failure - Generating new tasks response: ", err);
            });
    } catch (error) {
        console.log(error);
    }
};

const guessRandomUserId = async (): Promise<ObjectIdInt | null> => {
    try {
        const randomUsersIds = await User.find({}).select("_id");
        const randomId =
            randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;
        return randomId;
    } catch (error) {
        console.log(error);
        activityLogger.error(error);
        return null;
    }
}

const guessRandomProjectId = async (): Promise<Types.ObjectId | null> => {
    try {
        const randomPrjIds = await Project.find({}).select("_id");
        const randomId =
            randomPrjIds[Math.floor(Math.random() * randomPrjIds.length)]._id;
        return randomId;
    } catch (error) {
        console.log(error);
        activityLogger.error(error);
        return null;
    }
}