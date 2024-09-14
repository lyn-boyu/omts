import { quickSort } from './index';
import { expect, test, describe } from "bun:test";

describe('Quick Sort Algorithm', () => {
    test('should sort an array of numbers', () => {
        const arr = [3, 6, 8, 10, 1, 2, 1];
        const sortedArr = [1, 1, 2, 3, 6, 8, 10];

        expect(quickSort(arr)).toEqual(sortedArr);
    });

    test('should handle an empty array', () => {
        expect(quickSort([])).toEqual([]);
    });

    test('should handle already sorted arrays', () => {
        expect(quickSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle arrays with one element', () => {
        expect(quickSort([42])).toEqual([42]);
    });

    test('should handle arrays with duplicate elements', () => {
        const arr = [4, 5, 5, 4, 4];
        const sortedArr = [4, 4, 4, 5, 5];

        expect(quickSort(arr)).toEqual(sortedArr);
    });
});