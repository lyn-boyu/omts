import { deepClone } from './index';
import { expect, test, describe } from "bun:test";


describe("deepClone function", () => {
    test("should return primitives as is", () => {
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
        expect(deepClone(42)).toBe(42);
        expect(deepClone("hello")).toBe("hello");
        expect(deepClone(true)).toBe(true);
        expect(deepClone(BigInt(123))).toBe(BigInt(123));
        // symbol copy is not supported 
        const testSymbol = Symbol("test");
        expect(deepClone(testSymbol)).toBe(testSymbol);
    });

    test("should deeply clone an array", () => {
        const originalArray = [1, 2, [3, 4], { a: 5 }];
        const clonedArray = deepClone(originalArray);
        // value is the same
        expect(clonedArray).toEqual(originalArray);
        // reference is different
        expect(clonedArray).not.toBe(originalArray);
        // nested array reference is different
        expect(clonedArray[2]).not.toBe(originalArray[2]);
        // nested object reference is different
        expect(clonedArray[3]).not.toBe(originalArray[3]);
    });

    test("should deeply clone an object", () => {
        const originalObject = {
            name: "Alice",
            age: 30,
            hobbies: ["reading", "gaming"],
            address: { city: "Wonderland", zip: 12345 },
        };
        const clonedObject = deepClone(originalObject);
        // value is the same
        expect(clonedObject).toEqual(originalObject);
        // reference is different
        expect(clonedObject).not.toBe(originalObject);
        //nested array reference is different
        expect(clonedObject.hobbies).not.toBe(originalObject.hobbies);
        // nested object reference is different
        expect(clonedObject.address).not.toBe(originalObject.address);
    });

    test("should handle Date objects", () => {
        const originalDate = new Date();
        const clonedDate = deepClone(originalDate);

        expect(clonedDate).toEqual(originalDate);
        expect(clonedDate).not.toBe(originalDate);
        // date value is the same
        expect(clonedDate.getTime()).toBe(originalDate.getTime());
    });

    test("should handle RegExp objects", () => {
        const originalRegExp = /abc/gi;
        const clonedRegExp = deepClone(originalRegExp);
        // value is the same
        expect(clonedRegExp).toEqual(originalRegExp);
        // reference is different
        expect(clonedRegExp).not.toBe(originalRegExp);
        // cloned Regexp is the same as the original one
        expect(clonedRegExp.source).toBe(originalRegExp.source);
        expect(clonedRegExp.flags).toBe(originalRegExp.flags);
    });

    test("should handle nested structures", () => {
        const originalObject = {
            a: { b: { c: [1, 2, 3] } },
            d: new Date(),
            e: /def/gi,
        };
        const clonedObject = deepClone(originalObject);
        // value is the same
        expect(clonedObject).toEqual(originalObject);
        // reference is different
        expect(clonedObject).not.toBe(originalObject);
        // nested object reference is different
        expect(clonedObject.a.b.c).not.toBe(originalObject.a.b.c);
        // Date reference is different
        expect(clonedObject.d).not.toBe(originalObject.d);
        // RegExp reference is different
        expect(clonedObject.e).not.toBe(originalObject.e);
    });

    test("should handle circular references", () => {
        const originalObject: any = { a: 1 };
        originalObject.self = originalObject;  // self reference object
        const clonedObject = deepClone(originalObject);
        // value is the same
        expect(clonedObject).toEqual({ a: 1, self: clonedObject });
        // reference is different
        expect(clonedObject).not.toBe(originalObject);
    });


    test("should clone a Set correctly", () => {
        const originalObject = { a: 4 };
        const originalArray = [5, 6];
        const originalSet = new Set([1, 2, 3, originalObject, originalArray]);

        const clonedSet = deepClone(originalSet);

        // Test primitives
        [1, 2, 3].forEach((value) => {
            expect(clonedSet.has(value)).toBe(true);  // All primitive elements should be present in the cloned set
        });

        // Test object and array cloning
        const clonedObject = [...clonedSet].find((v) => typeof v === 'object' && !Array.isArray(v));
        expect(clonedObject).toEqual(originalObject);  // Deeply equal objects
        expect(clonedObject).not.toBe(originalObject);  // Different references

        const clonedArray = [...clonedSet].find((v) => Array.isArray(v));
        expect(clonedArray).toEqual(originalArray);  // Deeply equal arrays
        expect(clonedArray).not.toBe(originalArray);  // Different references

        // Check that all elements are present
        expect(clonedSet.size).toBe(originalSet.size);
    });

    test("should clone a Map correctly", () => {
        const originalObjectKey = { k: 4 };
        const originalObjectValue = { a: 1, b: [2, 3] };
        const originalArrayKey = [1, 2, 3];
        const originalMap = new Map<any, any>([
            ["key1", "value1"],  // Primitive value
            ["key2", originalObjectValue],  // Object value
            [originalObjectKey, "complexKey"],  // Object key
            [originalArrayKey, "arrayKey"],  // Array key
        ]);

        const clonedMap = deepClone(originalMap);

        // Test primitives
        expect(clonedMap.has("key1")).toBe(true);  // Key exists
        expect(clonedMap.get("key1")).toBe("value1");  // Value matches

        // Test object value cloning
        const clonedObjectValue = clonedMap.get("key2");
        expect(clonedObjectValue).toEqual(originalObjectValue);  // Deeply equal
        expect(clonedObjectValue).not.toBe(originalObjectValue);  // Different references

        // Test object key cloning
        const clonedObjectKey = [...clonedMap.keys()].find((k) => typeof k === 'object' && !Array.isArray(k) && k.k === 4);
        expect(clonedObjectKey).toEqual(originalObjectKey);  // Deeply equal
        expect(clonedObjectKey).not.toBe(originalObjectKey);  // Different references
        expect(clonedMap.get(clonedObjectKey)).toBe("complexKey");  // Correct value associated with cloned key

        // Test array key cloning
        const clonedArrayKey = [...clonedMap.keys()].find((k) => Array.isArray(k) && k[0] === 1 && k[1] === 2 && k[2] === 3);
        expect(clonedArrayKey).toEqual(originalArrayKey);  // Deeply equal
        expect(clonedArrayKey).not.toBe(originalArrayKey);  // Different references
        expect(clonedMap.get(clonedArrayKey)).toBe("arrayKey");  // Correct value associated with cloned key

        // Ensure size matches
        expect(clonedMap.size).toBe(originalMap.size);
    });


    test("should clone BigInt correctly", () => {
        const originalBigInt = BigInt("123456789012345678901234567890");
        const clonedBigInt = deepClone(originalBigInt);

        expect(clonedBigInt).toBe(originalBigInt);  // Same value
        expect(typeof clonedBigInt).toBe("bigint");  // Correct type
    });
});
