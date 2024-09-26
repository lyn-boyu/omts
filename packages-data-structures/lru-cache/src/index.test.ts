import { describe, it, expect } from "bun:test";
import { LRUCache } from "./index";

describe("LRUCache<TKey, TValue>", () => {
    it("should return the correct values and update recently used order", () => {
        const lruCache = new LRUCache<number, number>(2);

        lruCache.put(1, 10);
        lruCache.put(2, 20);
        expect(lruCache.get(1)).toBe(10); // cache: {1=10, 2=20}

        lruCache.put(3, 30);  // cache: {1=10, 3=30}, key 2 should be evicted
        expect(lruCache.get(2)).toBe(null); // key 2 was evicted
        expect(lruCache.get(3)).toBe(30);  // cache: {1=10, 3=30}

        lruCache.put(4, 40);  // cache: {3=30, 4=40}, key 1 should be evicted
        expect(lruCache.get(1)).toBe(null); // key 1 was evicted
        expect(lruCache.get(3)).toBe(30);  // key 3 should still exist
        expect(lruCache.get(4)).toBe(40);  // key 4 was just inserted
    });

    it("should handle edge cases with only one element", () => {
        const lruCache = new LRUCache<number, number>(1);

        lruCache.put(1, 10);
        expect(lruCache.get(1)).toBe(10); // cache: {1=10}

        lruCache.put(2, 20);  // cache: {2=20}, key 1 should be evicted
        expect(lruCache.get(1)).toBe(null); // key 1 was evicted
        expect(lruCache.get(2)).toBe(20);  // key 2 should still exist
    });

    it("should update the value if the key already exists", () => {
        const lruCache = new LRUCache<number, number>(2);

        lruCache.put(1, 10);
        lruCache.put(2, 20);
        lruCache.put(1, 15);  // Update key 1's value
        expect(lruCache.get(1)).toBe(15); // cache: {1=15, 2=20}
        expect(lruCache.get(2)).toBe(20);
    });

    it("should evict the least recently used item when capacity is exceeded", () => {
        const lruCache = new LRUCache<number, number>(2);

        lruCache.put(1, 10);
        lruCache.put(2, 20);
        lruCache.put(3, 30);  // cache: {2=20, 3=30}, key 1 should be evicted
        expect(lruCache.get(1)).toBe(null);
        expect(lruCache.get(2)).toBe(20);
        expect(lruCache.get(3)).toBe(30);
    });
});
