# @omts/heap 🚀

A lightweight TypeScript package that provides implementations of **MaxHeap** and **MinHeap** data structures. These heaps allow you to efficiently manage and retrieve the largest or smallest element in a dynamic dataset.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/heap
```

or

```bash
pnpm add @omts/heap
```

## Usage ✨

This package exports two main classes: `MaxHeap` and `MinHeap`. Each heap supports common heap operations such as insertion, extraction of the maximum or minimum value, and peeking at the top value.

### MaxHeap Example

The `MaxHeap` ensures that the largest value is always at the top of the heap.

```typescript
import { MaxHeap } from '@omts/heap';

// Create a new MaxHeap
const maxHeap = new MaxHeap();

// Insert elements into the heap
maxHeap.insert(10);
maxHeap.insert(15);
maxHeap.insert(20);

// Peek at the maximum element
console.log(maxHeap.peek()); // Output: 20

// Extract the maximum element
console.log(maxHeap.extractMax()); // Output: 20
console.log(maxHeap.extractMax()); // Output: 15

// Check the size of the heap
console.log(maxHeap.size()); // Output: 1
```

### MinHeap Example

The `MinHeap` ensures that the smallest value is always at the top of the heap.

```typescript
import { MinHeap } from '@omts/heap';

// Create a new MinHeap
const minHeap = new MinHeap();

// Insert elements into the heap
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(8);

// Peek at the minimum element
console.log(minHeap.peek()); // Output: 5

// Extract the minimum element
console.log(minHeap.extractMin()); // Output: 5
console.log(minHeap.extractMin()); // Output: 8

// Check the size of the heap
console.log(minHeap.size()); // Output: 1
```

## API Documentation 📚

### MaxHeap

- **`insert(value: number): void`**: Inserts a value into the heap while maintaining the max-heap property.
- **`extractMax(): number | null`**: Removes and returns the maximum value from the heap.
- **`peek(): number | undefined`**: Returns the maximum value without removing it.
- **`size(): number`**: Returns the number of elements in the heap.

### MinHeap

- **`insert(value: number): void`**: Inserts a value into the heap while maintaining the min-heap property.
- **`extractMin(): number | null`**: Removes and returns the minimum value from the heap.
- **`peek(): number | undefined`**: Returns the minimum value without removing it.
- **`size(): number`**: Returns the number of elements in the heap.

## Complexity 📊

- **Time Complexity**:
  - **Insertion**: O(log n)
  - **Extraction**: O(log n)
  - **Peek**: O(1)
- **Space Complexity**: O(n), where `n` is the number of elements in the heap.

## Development 🛠️

### Commands

## Development 🛠️

To develop this package, we use **Bun** as the runtime environment. The following scripts are available to streamline the development and build process.

### Available Commands

- **`clean`**: Cleans the `dist` directory to prepare for a fresh build.
  ```bash
  bun run clean
  ```

- **`build`**: Cleans and builds the package by running a build script located in `../../scripts/build-all.js`.
  ```bash
  bun run build
  ```

- **`test`**: Runs all test cases using the Bun test runner.
  ```bash
  bun run test
  ```

- **`tdd`**: Runs the tests in watch mode for Test-Driven Development (TDD).
  ```bash
  bun run tdd
  ```

- **`prepublishOnly`**: Automatically runs the build command before publishing the package to ensure everything is up to date.
  ```bash
  bun run prepublishOnly
  ```

These commands help ensure that your development workflow remains efficient and that all necessary steps are executed properly before publishing the package.


## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy sorting with `@omts/heap`! 🎉

