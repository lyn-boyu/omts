
import { expect, test, describe, beforeEach } from "bun:test";
import { MinHeap } from './min-heap';

describe('MinHeap', () => {

    let heap: MinHeap;

    beforeEach(() => {
        heap = new MinHeap();
    });

    test('should insert elements and maintain the heap property', () => {
        heap.insert(10);
        heap.insert(4);
        heap.insert(7);
        heap.insert(1);
        heap.insert(3);

        expect(heap.peek()).toBe(1);
        expect(heap.size()).toBe(5);
    });

    test('should return the correct minimum element after insertion', () => {
        heap.insert(20);
        heap.insert(15);
        heap.insert(5);
        heap.insert(30);
        heap.insert(2);

        expect(heap.extractMin()).toBe(2);
        expect(heap.extractMin()).toBe(5);
        expect(heap.extractMin()).toBe(15);
        expect(heap.extractMin()).toBe(20);
        expect(heap.extractMin()).toBe(30);
    });

    test('should handle empty heap correctly', () => {
        expect(heap.extractMin()).toBeNull();
        expect(heap.peek()).toBeNull();
    });

    test('should maintain heap property after extracting the minimum element', () => {
        heap.insert(9);
        heap.insert(4);
        heap.insert(8);
        heap.insert(6);
        heap.insert(7);

        expect(heap.extractMin()).toBe(4);
        expect(heap.peek()).toBe(6);
    });

    test('should handle single element heap correctly', () => {
        heap.insert(42);
        expect(heap.peek()).toBe(42);
        expect(heap.extractMin()).toBe(42);
        expect(heap.extractMin()).toBeNull();
    });

    test('should correctly return size of the heap', () => {
        heap.insert(10);
        heap.insert(20);
        heap.insert(30);
        expect(heap.size()).toBe(3);

        heap.extractMin();
        expect(heap.size()).toBe(2);
    });
});
