export function isObject(obj) {
    return (
        obj &&
        typeof obj !== "function" &&
        !Array.isArray(obj) &&
        obj === Object(obj)
    );
}

export function debounce(fn, delay) {
    let timerId = null;
    return function (...args) {
        clearInterval(timerId);

        timerId = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}