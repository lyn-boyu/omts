import { describe, expect, test } from "bun:test";
import { bucketSort } from './index';

describe('bucketSort', () => {
    test('should sort an array of positive numbers', () => {
        const input = [42, 32, 33, 52, 37, 47, 51];
        const output = bucketSort(input);
        expect(output).toEqual([32, 33, 37, 42, 47, 51, 52]);
    });

    test('should sort an array with negative numbers', () => {
        const input = [4, -1, -9, 0, 12, -5, 8];
        const output = bucketSort(input);
        expect(output).toEqual([-9, -5, -1, 0, 4, 8, 12]);
    });

    test('should return the same array when input is empty', () => {
        const input: number[] = [];
        const output = bucketSort(input);
        expect(output).toEqual([]);
    });

    test('should return the same array when input has one element', () => {
        const input = [10];
        const output = bucketSort(input);
        expect(output).toEqual([10]);
    });

    test('should sort an array of floating-point numbers', () => {
        const input = [0.42, 0.32, 0.33, 0.52, 0.37, 0.47, 0.51];
        const output = bucketSort(input);
        expect(output).toEqual([0.32, 0.33, 0.37, 0.42, 0.47, 0.51, 0.52]);
    });

    test('should sort an array with duplicates', () => {
        const input = [5, 3, 8, 3, 9, 1, 5, 4];
        const output = bucketSort(input);
        expect(output).toEqual([1, 3, 3, 4, 5, 5, 8, 9]);
    });

    test('should sort an array with a custom bucket size', () => {
        const input = [42, 32, 33, 52, 37, 47, 51];
        const output = bucketSort(input, undefined, 10); // Custom bucket size
        expect(output).toEqual([32, 33, 37, 42, 47, 51, 52]);
    });

    test('should sort numbers in descending order using custom compareFn', () => {
        const input = [29, 25, 3, 49, 9, 37, 21, 43];
        const compareFn = (a: number, b: number) => b - a; // Descending order
        const output = bucketSort(input, compareFn);
        expect(output).toEqual([49, 43, 37, 29, 25, 21, 9, 3]);
    });
});
