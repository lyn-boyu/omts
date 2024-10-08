
# @omts/quick-sort 🚀

A simple and efficient implementation of the Quick Sort algorithm in TypeScript. This package provides a flexible and fast sorting utility that can be used in both Node.js and browser environments.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/quick-sort
```

## Usage ✨

This package exports a `quickSort` function that sorts an array of numbers using the Quick Sort algorithm. Below are some examples of how to use it:

```typescript
import { quickSort } from '@omts/quick-sort';

// Example usage
const unsortedArray = [3, 6, 8, 10, 1, 2, 1];
const sortedArray = quickSort(unsortedArray);

console.log(sortedArray); // Output: [1, 1, 2, 3, 6, 8, 10]
```

### Complexity 📊

- **Time Complexity**:
  - **Average Case**: O(n log n)
  - **Worst Case**: O(n^2) - This occurs when the pivot selection is poor (e.g., always choosing the largest or smallest element as pivot in a sorted array).
- **Space Complexity**:
  - **O(log n)** due to the recursion stack in the average case.

## Development 🛠️

- **`dev`**: Cleans and builds the package in watch mode using Bun.

- **`build`**: Runs a clean build by generating multiple module formats (CJS, ESM, UMD) and type declarations.

- **`build:esm`**: Builds the TypeScript source to ES Module (ESM) format.

- **`build:cjs`**: Builds the TypeScript source to CommonJS (CJS) format.

- **`build:umd`**: Builds the TypeScript source to UMD format with a global name `OmtsQuickSort`.

- **`build:types`**: Generates type declaration files using the TypeScript compiler.

- **`test`**: Runs all test cases using Bun. 

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 