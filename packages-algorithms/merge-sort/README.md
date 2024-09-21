# @omts/merge-sort 🚀

A TypeScript-based, flexible, and generic implementation of the **Merge Sort** algorithm. This package supports sorting arrays of various types and allows for custom comparison functions to control sorting order (ascending or descending).

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/merge-sort
```

or

```bash
pnpm add @omts/merge-sort
```

## Usage ✨

The package exports a `mergeSort` function that supports sorting any array. You can provide a custom comparison function to define the sorting behavior, such as ascending or descending order.

### Example

#### Basic Usage

```typescript
import { mergeSort } from '@omts/merge-sort';

// Sorting an array of numbers in ascending order (default)
const resultAsc = mergeSort([10, 5, 15, 1]);
console.log(resultAsc); // Output: [1, 5, 10, 15]

// Sorting an array of numbers in descending order (using custom comparator)
const resultDesc = mergeSort([10, 5, 15, 1], (a, b) => b - a);
console.log(resultDesc); // Output: [15, 10, 5, 1]
```

#### Custom Comparator

You can sort arrays of objects or use custom sorting logic by providing a custom comparator function.

```typescript
interface Person {
    name: string;
    age: number;
}

const people: Person[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 20 },
    { name: 'Charlie', age: 30 }
];

// Sorting by age in ascending order
const sortedByAgeAsc = mergeSort(people, (a, b) => a.age - b.age);
console.log(sortedByAgeAsc);
/*
Output:
[
  { name: 'Bob', age: 20 },
  { name: 'Alice', age: 25 },
  { name: 'Charlie', age: 30 }
]
*/

// Sorting by age in descending order
const sortedByAgeDesc = mergeSort(people, (a, b) => b.age - a.age);
console.log(sortedByAgeDesc);
/*
Output:
[
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 20 }
]
*/
```

## API Documentation 📚

### `mergeSort<T>(arr: T[], compareFn?: (a: T, b: T) => number): T[]`

- **Parameters**:
  - `arr`: The array to be sorted.
  - `compareFn`: Optional. A custom comparison function used to compare elements. If not provided, elements are compared using the default `<` and `>` operators for ascending order.

- **Returns**: A new sorted array.

### Features

- **Flexible Sorting**: Sorts arrays in any order based on the provided comparator function.
- **Custom Comparator**: Supports custom comparison logic, useful for sorting complex data types.
- **TypeScript Support**: Fully typed, ensuring type safety when sorting arrays.
- **Stable Sort**: Maintains the relative order of elements with equal keys.

### Time Complexity 📊

- **Time Complexity**: O(n log n), where n is the number of elements in the array.
- **Space Complexity**: O(n), due to the auxiliary space required for merging.

## Development 🛠️

### Install dependencies:

```bash
pnpm install
```

### Run tests:

```bash
pnpm run test
```

### Build the project:

```bash
pnpm run build
```

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Happy sorting with `@omts/merge-sort`! 🎉

Feel free to use, contribute, and star the repository if you find it useful!