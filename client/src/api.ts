import { baseAPIUrl } from "./utils";

export const fetchProjects = async ({ access_token, signal }) => {
    const fetching = await fetch(`${baseAPIUrl}/projects`, {
        headers: { Authorization: `Bearer ${access_token}` },
        signal,
    });

    const response = await fetching.json();

    if (fetching.status !== 200) {
        console.error(response.data);
        return { status: false, ...response };
    } else {
        return { status: true, ...response };
    }
};

export const fetchProject = async ({ access_token, prjId, signal }) => {
    if (!access_token) {
        return { status: false, message: "Access token not provided" }
    }

    if (!prjId) {
        return { status: false, message: "Project Id not provided" }
    }

    const fetching = await fetch(`${baseAPIUrl}/projects/${prjId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
        signal,
    });

    const response = await fetching.json();

    if (fetching.status !== 200) {
        console.error(response.data);
        return { status: false, ...response };
    } else {
        return { status: true, ...response };
    }
}