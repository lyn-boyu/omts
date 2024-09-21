import { describe, expect, test } from "bun:test";
import { mergeSort } from './index';

describe('mergeSort with generic support and custom comparator', () => {

    test('should sort an array of numbers in ascending and descending order', () => {
        const resultAsc = mergeSort([10, 5, 15, 1]);
        const resultDesc = mergeSort([10, 5, 15, 1], (a, b) => b - a); // Using custom comparator for descending
        expect(resultAsc).toEqual([1, 5, 10, 15]);
        expect(resultDesc).toEqual([15, 10, 5, 1]);
    });

    test('should sort an array of strings in ascending and descending order', () => {
        const resultAsc = mergeSort(['banana', 'apple', 'cherry']);
        const resultDesc = mergeSort(['banana', 'apple', 'cherry'], (a, b) => b.localeCompare(a)); // Custom comparator for descending
        expect(resultAsc).toEqual(['apple', 'banana', 'cherry']);
        expect(resultDesc).toEqual(['cherry', 'banana', 'apple']);
    });

    test('should sort an array of objects by age in ascending and descending order', () => {
        const people = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 },
            { name: 'Charlie', age: 30 }
        ];
        const resultAsc = mergeSort(people, (a, b) => a.age - b.age); // Ascending by age
        const resultDesc = mergeSort(people, (a, b) => b.age - a.age); // Descending by age
        expect(resultAsc).toEqual([
            { name: 'Bob', age: 20 },
            { name: 'Alice', age: 25 },
            { name: 'Charlie', age: 30 }
        ]);
        expect(resultDesc).toEqual([
            { name: 'Charlie', age: 30 },
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 20 }
        ]);
    });

    test('should sort an array with negative numbers and duplicates in ascending and descending order', () => {
        const resultAsc = mergeSort([3, -1, -5, 10, 0, 3, -1]);
        const resultDesc = mergeSort([3, -1, -5, 10, 0, 3, -1], (a, b) => b - a); // Custom comparator for descending
        expect(resultAsc).toEqual([-5, -1, -1, 0, 3, 3, 10]);
        expect(resultDesc).toEqual([10, 3, 3, 0, -1, -1, -5]);
    });

    test('should return the same array for empty or single-element arrays', () => {
        expect(mergeSort([])).toEqual([]);
        expect(mergeSort([42])).toEqual([42]);
    });

    test('should sort an array of floating-point numbers in ascending and descending order', () => {
        const resultAsc = mergeSort([3.5, 2.1, 0.2, 4.8, 1.3]);
        const resultDesc = mergeSort([3.5, 2.1, 0.2, 4.8, 1.3], (a, b) => b - a); // Custom comparator for descending
        expect(resultAsc).toEqual([0.2, 1.3, 2.1, 3.5, 4.8]);
        expect(resultDesc).toEqual([4.8, 3.5, 2.1, 1.3, 0.2]);
    });

});
