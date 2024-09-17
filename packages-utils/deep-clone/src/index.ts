export function deepClone<T = any>(input: T, weakMap = new WeakMap()): T {
    // handle null, undefined, 6 types primitive types(string\boolean\number\bigint\symbol\function)
    if (input === null || typeof input !== 'object') {
        return input;
    }

    // early return if the object has been cloned
    if (weakMap.has(input)) {
        return weakMap.get(input);
    }

    // handle Date
    if (input instanceof Date) {
        return new Date(input.getTime()) as T;
    }

    // handle RegExp
    if (input instanceof RegExp) {
        return new RegExp(input.source, input.flags) as T;
    }

    // Handle Array
    if (Array.isArray(input)) {
        const clonedArray = [] as any;
        weakMap.set(input, clonedArray);
        input.forEach((item, index) => {
            clonedArray[index] = deepClone(item, weakMap);
        });
        return clonedArray;
    }

    // Handle Map
    if (input instanceof Map) {
        const clonedMap = new Map();
        weakMap.set(input, clonedMap);
        input.forEach((value, key) => {
            clonedMap.set(deepClone(key, weakMap), deepClone(value, weakMap));
        });
        return clonedMap as any;
    }

    // Handle Set
    if (input instanceof Set) {
        const clonedSet = new Set();
        weakMap.set(input, clonedSet);
        input.forEach((value) => {
            clonedSet.add(deepClone(value, weakMap));
        });
        return clonedSet as any;
    }

    // Handle BigInt
    if (typeof input === 'bigint') {
        return BigInt((input as BigInt).toString()) as any;
    }


    // handle Object
    const clonedObject = Object.create(Object.getPrototypeOf(input));

    // strore the cloned object in hash
    weakMap.set(input, clonedObject)

    // iterate the obj and clone the properties
    Object.getOwnPropertyNames(input).forEach((prop) => {
        clonedObject[prop] = deepClone((input as any)[prop], weakMap);
    });

    // return the cloned object
    return clonedObject as T;
}