import { faker } from "@faker-js/faker";
import User from "../models/User";
import Todo from "../models/Todo";
import Project from "../models/Project";
import { TodoObj, TodoStatus, UserObj, UserRole } from "../interfaces";
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
    projectId: Types.ObjectId;
    collaborators: ObjectIdInt[];
};

type Project = {
    title: String;
    creator: Object;
    contributors: Array<{}>;
};

export const generateUsers = async (num: number) => {
    const users: Array<UserObj> = [];

    for (let i = 0; i < num; i++) {
        users.push({
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            pwd: faker.internet.password(),
            profile_image: faker.image.avatar()
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

    for (let i = 0; i < num; i++) {
        const randomUserIds: ObjectIdInt[] = [];
        for (let j = 0; j < 3; j++) {
            const randomId = await guessRandomUserId();
            if (randomId) {
                randomUserIds.push(randomId);
            }
        }

        const randomCreatorId = await guessRandomUserId();
        if (randomCreatorId) {
            projects.push({
                title: faker.word.words(),
                creator: randomCreatorId,
                contributors: randomUserIds.map((id) => ({
                    id,
                    role: guessRandomUserRole(),
                })),
            });
        }
    }

    return Project.insertMany(projects)
        .then((resp) => {
            console.log(resp);
        })
        .catch((err) => {
            console.log(err);
        });
};

const guessRandomUserRole = (): UserRole => {
    const randomNumber = Math.round(Math.random() + 1);

    return randomNumber == 1 ? UserRole.Admin : UserRole.User;
};

export const generateTasks = async (num: number) => {
    const tasks: Array<Task> = [];

    try {
        const randomPrjId = await guessRandomProjectId();
        for (let i = 0; i < num; i++) {
            const randomUserId = await guessRandomUserId();
            const randomUserIds = await guessRandomUsersIds(Math.round(Math.random() * 10));
            const randomObjStatus = guessRandomTodoStatus();

            if (randomUserId && randomPrjId && randomUserIds)
                tasks.push({
                    label: faker.word.words(),
                    user: randomUserId,
                    status: randomObjStatus,
                    projectId: randomPrjId,
                    collaborators: randomUserIds
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
};

const guessRandomUsersIds = async (numberOfIds: number): Promise<ObjectIdInt[] | null> => {
    try {
        const randomUsersIds = await User.find({}).select("_id");

        const idsToReturn: ObjectIdInt[] = [];

        for (let i = 0; i < numberOfIds; i++) {
            const randomId =
                randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;

            idsToReturn.push(randomId);
        }

        return idsToReturn;
    } catch (error) {
        console.log(error);
        activityLogger.error(error);
        return null;
    }
};

const guessRandomProjectId = async (): Promise<Types.ObjectId | null> => {
    try {
        const randomPrjIds = await Project.find({}).select("_id");
        console.log(randomPrjIds)
        const randomId =
            randomPrjIds[Math.floor(Math.random() * randomPrjIds.length)]._id;
        return randomId;
    } catch (error) {
        console.log(error);
        activityLogger.error(error);
        return null;
    }
};

const guessRandomTodoStatus = (): TodoStatus => {
    const randomNumber = Math.round(Math.random() * 2);

    switch (randomNumber) {
        case 0:
            return TodoStatus.TODO;

        case 1:
            return TodoStatus.WIP;

        default:
            return TodoStatus.DONE;
    }
}