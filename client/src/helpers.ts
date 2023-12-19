import _ from "lodash";


export const diffArrFromArr = <T>(
    arr1: Array<T>,
    arr2: Array<T>
): Array<T> => {
    return _.difference(arr1, arr2);
};
