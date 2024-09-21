# @omts/bubble-sort 🚀

A simple and customizable **Bubble Sort** algorithm implementation in TypeScript. This package supports sorting arrays of various types, works in both Node.js and browser environments, and allows for custom comparator functions to control sorting behavior.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/bubble-sort
```

or

```bash
pnpm add @omts/bubble-sort
```

## Usage ✨

The package exports a `bubbleSort` function that allows you to sort arrays of any type. You can optionally provide a custom comparator function to define the sort order (ascending, descending, or other complex sorting logic).

### Basic Example (Numbers)

```typescript
import { bubbleSort } from '@omts/bubble-sort';

// Example usage: sorting an array of numbers in ascending order
const unsortedArray = [5, 2, 9, 1, 5, 6];
const sortedArray = bubbleSort(unsortedArray);

console.log(sortedArray); // Output: [1, 2, 5, 5, 6, 9]
```

### Custom Comparator Example

You can sort arrays of objects or control the sort order by providing a custom comparator function:

#### Comparator Function

A **comparator function** is used to define the sort order. It should take two arguments (usually referred to as `a` and `b`) and return:
- A **positive number** if `a` should come after `b`
- A **negative number** if `a` should come before `b`
- **0** if `a` and `b` are equal

By default, if no comparator is provided, the function will sort numbers in ascending order.

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
const sortedByAgeAsc = bubbleSort(people, (a, b) => a.age - b.age);
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
const sortedByAgeDesc = bubbleSort(people, (a, b) => b.age - a.age);
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

### Complexity 📊

- **Time Complexity**:
  - **Average Case**: O(n^2)
  - **Worst Case**: O(n^2) - This occurs when the array is sorted in reverse order.
  - **Best Case**: O(n) - This occurs when the array is already sorted.
- **Space Complexity**: O(1), since the sorting is done in place without using additional memory.

## Development 🛠️

### Available Scripts:

- **`dev`**: Cleans and builds the package in watch mode using Bun.
- **`build`**: Generates multiple module formats (CJS, ESM, UMD) and type declarations.
- **`build:esm`**: Builds the TypeScript source to ES Module (ESM) format.
- **`build:cjs`**: Builds the TypeScript source to CommonJS (CJS) format.
- **`build:umd`**: Builds the TypeScript source to UMD format with a global name `OmtsBubbleSort`.
- **`build:types`**: Generates type declaration files using the TypeScript compiler.
- **`test`**: Runs all test cases using Bun.

## Contributing 🤝

Contributions are welcome! If you have improvements or suggestions, feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy sorting with `@omts/bubble-sort`! 🎉

 