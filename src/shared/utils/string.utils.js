import {isObject} from "./object.utils";

export function getUniqId () {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97) +
        Math.random().toString(16).slice(2) +
        Date.now().toString(16).slice(4)
}

export function getClassNames(existClass, classes) {
    if(!existClass && !isObject(classes)) {
        return "";
    }

    let result = (existClass && String(existClass)) || "";

    Object.entries(classes).forEach(([className, isEnable]) => {
        if(!isEnable) {
            return;
        }

        result += ` ${className}`;
    })

    return result;
}