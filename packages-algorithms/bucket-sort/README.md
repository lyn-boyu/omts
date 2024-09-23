 # @omts/bucket-sort 🚀

A flexible and efficient **Bucket Sort** implementation in TypeScript. This sorting algorithm is particularly effective for uniformly distributed numerical data and supports custom comparison functions (`compareFn`).

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/bucket-sort
```

or

```bash
pnpm add @omts/bucket-sort
```

## Usage ✨

The `bucketSort` function sorts an array of numbers using the Bucket Sort algorithm. It automatically determines the number of buckets based on the square root of the array's length and distributes elements across the buckets.

### Example

```typescript
import { bucketSort } from '@omts/bucket-sort';

// Example usage: Sorting an array of numbers in ascending order
const unsortedArray = [29, 25, 3, 49, 9, 37, 21, 43];
const sortedArray = bucketSort(unsortedArray);

console.log(sortedArray);  // Output: [3, 9, 21, 25, 29, 37, 43, 49]
```

### Custom Comparator Example

You can customize the sorting logic by passing a custom `compareFn`. For example, to sort numbers in descending order:

```typescript
const compareFn = (a: number, b: number) => b - a; // Descending order

const unsortedArray = [29, 25, 3, 49, 9, 37, 21, 43];
const sortedArray = bucketSort(unsortedArray, compareFn);

console.log(sortedArray);  // Output: [49, 43, 37, 29, 25, 21, 9, 3]
```

#### Comparator Function:

- **`compareFn`**: Optional. A custom comparison function that defines the sort order. If not provided, it defaults to ascending numerical order.
- For example:
  - `(a, b) => a - b`: Sort in ascending order (default).
  - `(a, b) => b - a`: Sort in descending order.

## API Documentation 📚

### `bucketSort(arr: number[], compareFn?: (a: number, b: number) => number, bucketRangeOption?: number): number[]`

- **`arr`**: The array of numbers to be sorted.
- **`compareFn`**: (Optional) A custom comparison function to define the sorting order. If not provided, the default comparison is used (ascending order for numbers).
- **`bucketRangeOption`**: (Optional) A parameter to specify the range of each bucket. If not provided, the range is automatically calculated based on the data range.

### Parameters:

- `arr`: An array of numbers to be sorted.
- `compareFn`: (Optional) A custom comparator function for sorting within the buckets.
- `bucketRangeOption`: (Optional) Specifies the bucket range. If omitted, the bucket range is automatically computed.

### Returns:

- A sorted array of numbers.

## Optimization and Future Improvements 🔧

- **TODO 1**: Use **parallel processing**, such as Web Workers (in browsers) or threads (in Node.js), to sort buckets in parallel. This can improve performance by distributing the sorting work across multiple threads, especially for large arrays.

- **TODO 2**: Optimize the sorting algorithm for each bucket based on the bucket size:
  - For **small buckets**, use **insertion sort** for its time complexity close to O(n) for small arrays.
  - For **large buckets**, use more efficient algorithms like **quicksort** or **mergesort** for faster sorting.

These improvements can significantly enhance performance, particularly for large datasets with unevenly distributed values.

## Complexity 📊

- **Time Complexity**:
  - **Best Case**: O(n + k), where `n` is the number of elements and `k` is the number of buckets.
  - **Worst Case**: O(n²), when all elements fall into one bucket.
  
- **Space Complexity**: O(n + k), where `n` is the number of elements and `k` is the number of buckets.

## Development 🛠️

### Commands

- **`build`**: Builds the package for production by generating multiple module formats (CJS, ESM, UMD) and type declarations.

- **`test`**: Runs the test cases for the package.

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy sorting with `@omts/bucket-sort`! 🎉

