import { MaxHeap } from './max-heap';
import { expect, test, describe, beforeEach } from "bun:test";


describe('MaxHeap', () => {
    let heap: MaxHeap;

    beforeEach(() => {
        heap = new MaxHeap();
    });

    test('should insert elements and maintain max-heap property', () => {
        heap.insert(10);
        heap.insert(15);
        heap.insert(20);
        heap.insert(17);

        expect(heap.peek()).toBe(20);
        expect(heap.size()).toBe(4);
    });

    test('should return the correct max element after insertion', () => {
        heap.insert(30);
        heap.insert(20);
        heap.insert(10);
        heap.insert(50);

        expect(heap.extractMax()).toBe(50);
        expect(heap.extractMax()).toBe(30);
        expect(heap.extractMax()).toBe(20);
        expect(heap.extractMax()).toBe(10);
        expect(heap.extractMax()).toBeNull();
    });

    test('should handle empty heap correctly', () => {
        expect(heap.extractMax()).toBeNull();
        expect(heap.peek()).toBeUndefined();
        expect(heap.size()).toBe(0);
    });

    test('should maintain heap property after extracting the max element', () => {
        heap.insert(50);
        heap.insert(40);
        heap.insert(45);
        heap.insert(30);
        heap.insert(35);

        expect(heap.extractMax()).toBe(50);
        expect(heap.peek()).toBe(45);
        expect(heap.size()).toBe(4);
    });

    test('should handle single element heap correctly', () => {
        heap.insert(100);
        expect(heap.peek()).toBe(100);
        expect(heap.extractMax()).toBe(100);
        expect(heap.extractMax()).toBeNull();
    });

    test('should correctly return the size of the heap', () => {
        heap.insert(10);
        heap.insert(20);
        heap.insert(30);

        expect(heap.size()).toBe(3);

        heap.extractMax();
        expect(heap.size()).toBe(2);
    });

    test('should maintain correct order when inserting random numbers', () => {
        const randomNumbers = [12, 7, 10, 20, 8, 15];
        randomNumbers.forEach(num => heap.insert(num));

        expect(heap.extractMax()).toBe(20);
        expect(heap.extractMax()).toBe(15);
        expect(heap.extractMax()).toBe(12);
        expect(heap.extractMax()).toBe(10);
        expect(heap.extractMax()).toBe(8);
        expect(heap.extractMax()).toBe(7);
    });
});


