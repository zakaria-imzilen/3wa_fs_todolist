import { UserObj } from "../../../interfaces";

export const isContribAlreadyExists = (
    contributors: UserObj[],
    newContrib: UserObj
): boolean => {
    const findUser = contributors.find(
        (contrib) => contrib._id == newContrib._id
    );

    if (!findUser) return false;
    return true;
};
