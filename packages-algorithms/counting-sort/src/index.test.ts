import { countingSort } from './index';
import { expect, test, describe } from "bun:test";

describe('countingSort', () => {
  test('should sort an array of positive numbers', () => {
    const arr = [1, 3, 2, 2];
    expect(countingSort(arr)).toEqual([1, 2, 2, 3]);
  });

  test('should handle an empty array', () => {
    const arr: number[] = [];
    expect(countingSort(arr)).toEqual([]);
  });

  test('should handle an array with one element', () => {
    const arr = [5];
    expect(countingSort(arr)).toEqual([5]);
  });

  test('should handle an array with all identical elements', () => {
    const arr = [4, 4, 4, 4];
    expect(countingSort(arr)).toEqual([4, 4, 4, 4]);
  });

  test('should handle an array with negative numbers', () => {
    const arr = [-1, -3, -2, -2];
    expect(countingSort(arr)).toEqual([-3, -2, -2, -1]);
  });

  test('should sort an array of mixed positive and negative numbers', () => {
    const arr = [3, -2, 0, -1, 2, -3, 1];
    expect(countingSort(arr)).toEqual([-3, -2, -1, 0, 1, 2, 3]);
  });
});
