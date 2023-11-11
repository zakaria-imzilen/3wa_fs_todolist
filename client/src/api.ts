import axios from "axios";

export const baseAPIUrl = "http://localhost:4000";

export const axiosInstance = axios.create({
    baseURL: baseAPIUrl,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
        origin: "*",
        credentials: "same-origin",
    },
});

export const fetchProjects = async () => {
    try {
        const fetching = await axiosInstance.get("/projects");

        const response = await fetching.data;
        console.log("Headers", fetching.headers);

        if (fetching.status !== 200) {
            console.error(response.data);
            return { status: false, ...response };
        } else {
            return { status: true, ...response };
        }
    } catch (err) {
        console.error("Trying to fetching projects: ", err);
        return { status: false, ...err }
    }
};

export const fetchProject = async ({ prjId }) => {
    if (!prjId) {
        return { status: false, message: "Project Id not provided" };
    }

    try {
        const fetching = await axiosInstance.get(`/projects/${prjId}`);

        const response = await fetching.data;

        if (fetching.status !== 200) {
            console.error(response.data);
            return { status: false, ...response };
        } else {
            return { status: true, ...response };
        }
    } catch (error) {
        console.error(error)
        return { status: false, ...error }

    }
};
