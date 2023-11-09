import { faker } from "@faker-js/faker";
import User from "../models/User";
import Todo from "../models/Todo";
import Project from "../models/Project";
import { TodoStatus } from "../interfaces";

type User = {
    fullName: String;
    email: String;
    pwd: String;
};

type Task = {
    label: String;
    user: Object;
    status: TodoStatus
};

type Project = {
    title: String;
    creator: Object;
    contributors: Array<{}>;
};

export const generateUsers = (num: number): void => {
    const users: Array<User> = [];

    for (let i = 0; i < num; i++) {
        users.push({
            fullName: faker.person.fullName(),
            email: faker.internet.email(),
            pwd: faker.internet.password(),
        });
    }

    User.insertMany(users)
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

    Project.insertMany(projects)
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
        const randomUsersIds = await User.find({}).select("_id");

        for (let i = 0; i < num; i++) {
            const randomId =
                randomUsersIds[Math.floor(Math.random() * randomUsersIds.length)]._id;

            tasks.push({
                label: faker.word.words(),
                user: randomId,
                status: TodoStatus.TODO
            });
        }

        Todo.insertMany(tasks)
            .then((resp) => {
                resp.forEach((task) => {
                    Project.updateOne(
                        { _id: "6547fff4b59207a862648a6c" },
                        { $addToSet: { todos: task._id } }
                    )
                        .then((prjdata) => console.log(prjdata))
                        .catch((erro) => console.log(erro));
                });

                console.log("Success - Generating new tasks response: ", resp);
            })
            .catch((err) => {
                console.log("Failure - Generating new tasks response: ", err);
            });
    } catch (error) {
        console.log(error);
    }
};
