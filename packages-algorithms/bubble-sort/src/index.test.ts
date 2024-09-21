import { bubbleSort } from './index';
import { expect, test, describe } from "bun:test";

describe('Bubble Sort Algorithm', () => {
    test('should sort an array of numbers in ascending order by default', () => {
        const result = bubbleSort([10, 5, 15, 1]);
        expect(result).toEqual([1, 5, 10, 15]);
    });

    test('should sort an array of numbers in descending order using custom compareFn', () => {
        const result = bubbleSort([10, 5, 15, 1], (a, b) => b - a);
        expect(result).toEqual([15, 10, 5, 1]);
    });

    test('should sort an array of strings in alphabetical order', () => {
        const result = bubbleSort(['banana', 'apple', 'cherry']);
        expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    test('should sort an array of strings in reverse alphabetical order using custom compareFn', () => {
        const result = bubbleSort(['banana', 'apple', 'cherry'], (a, b) => b.localeCompare(a));
        expect(result).toEqual(['cherry', 'banana', 'apple']);
    });

    test('should sort an array of objects by a property in ascending order', () => {
        interface Person {
            name: string;
            age: number;
        }
        const people: Person[] = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 },
            { name: 'Charlie', age: 30 }
        ];

        const result = bubbleSort(people, (a, b) => a.age - b.age);
        expect(result).toEqual([
            { name: 'Bob', age: 20 },
            { name: 'Alice', age: 25 },
            { name: 'Charlie', age: 30 }
        ]);
    });

    test('should sort an array of objects by a property in descending order', () => {
        interface Person {
            name: string;
            age: number;
        }
        const people: Person[] = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 },
            { name: 'Charlie', age: 30 }
        ];

        const result = bubbleSort(people, (a, b) => b.age - a.age);
        expect(result).toEqual([
            { name: 'Charlie', age: 30 },
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 }
        ]);
    });

    test('should handle an empty array', () => {
        const result = bubbleSort([]);
        expect(result).toEqual([]);
    });

    test('should handle an array with one element', () => {
        const result = bubbleSort([42]);
        expect(result).toEqual([42]);
    });
});