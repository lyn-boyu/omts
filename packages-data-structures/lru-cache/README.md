# @omts/lru-cache 🚀

A simple, efficient, and type-safe **LRU (Least Recently Used) Cache** implementation in TypeScript. This cache evicts the least recently used entries when the capacity is exceeded.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/lru-cache
```

or

```bash
pnpm add @omts/lru-cache
```

## Usage ✨

The `LRUCache` class allows you to cache key-value pairs with a maximum capacity. When the capacity is exceeded, the least recently accessed entry will be evicted.

### Example

```typescript
import { LRUCache } from '@omts/lru-cache';

// Create an LRU cache with a capacity of 3
const cache = new LRUCache<string, number>(3);

// Add key-value pairs to the cache
cache.put('a', 1);
cache.put('b', 2);
cache.put('c', 3);

// Access a value
console.log(cache.get('a')); // Output: 1

// Add another key-value pair, which causes the least recently used ('b') to be evicted
cache.put('d', 4);

// Now 'b' is no longer in the cache
console.log(cache.get('b')); // Output: null

// 'a', 'c', and 'd' are still in the cache
console.log(cache.get('a')); // Output: 1
console.log(cache.get('c')); // Output: 3
console.log(cache.get('d')); // Output: 4
```

## API Documentation 📚

### LRUCache

- **`constructor(capacity: number)`**: Creates a new `LRUCache` instance with the specified `capacity`.
  - **`capacity`**: The maximum number of entries the cache can hold. Once the limit is reached, the least recently used entries will be removed.

- **`get(key: TKey): TValue | null`**: Retrieves the value associated with the given `key`. If the key is present, it will be moved to the front of the cache to mark it as the most recently accessed. Returns `null` if the key is not found.

- **`put(key: TKey, value: TValue): void`**: Adds a key-value pair to the cache. If the key already exists, the value is updated and the key is moved to the front. If the cache exceeds its capacity, the least recently used entry will be evicted.

## Example of LRU Behavior 💡

If the capacity of the cache is 3, and we perform the following actions:

```typescript
const cache = new LRUCache<number, string>(3);
cache.put(1, 'one'); // Cache: [1]
cache.put(2, 'two'); // Cache: [1, 2]
cache.put(3, 'three'); // Cache: [1, 2, 3]
cache.get(1);         // Cache: [2, 3, 1] (1 is now the most recently used)
cache.put(4, 'four'); // Cache: [3, 1, 4] (2 is evicted because it's the least recently used)
```

## Complexity 📊

- **Time Complexity**:
  - **Insertion**: O(1)
  - **Get**: O(1)
  - **Eviction**: O(1)
  
- **Space Complexity**: O(n), where `n` is the capacity of the cache.

## Development 🛠️

To develop and build this package, the following commands are available:

- **`build`**: Builds the package for production, generating multiple module formats (CJS, ESM, UMD) and type declarations.
  ```bash
  bun run build
  ```

- **`test`**: Runs the test cases for the package.
  ```bash
  bun run test
  ```

- **`clean`**: Cleans up the build artifacts.
  ```bash
  bun run clean
  ```

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy caching with `@omts/lru-cache`! 🎉

