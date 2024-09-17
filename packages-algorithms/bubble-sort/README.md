# @omts/bubble-sort 🚀

A simple and easy-to-understand implementation of the Bubble Sort algorithm in TypeScript. This package provides a basic sorting utility that works in both Node.js and browser environments.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/bubble-sort
```

## Usage ✨

This package exports a `bubbleSort` function that sorts an array of numbers using the Bubble Sort algorithm. Below are some examples of how to use it:

```typescript
import { bubbleSort } from '@omts/bubble-sort';

// Example usage
const unsortedArray = [5, 2, 9, 1, 5, 6];
const sortedArray = bubbleSort(unsortedArray);

console.log(sortedArray); // Output: [1, 2, 5, 5, 6, 9]
```

### Complexity 📊

- **Time Complexity**:
  - **Average Case**: O(n^2)
  - **Worst Case**: O(n^2) - This occurs when the array is sorted in reverse order.
  - **Best Case**: O(n) - This occurs when the array is already sorted.
- **Space Complexity**:
  - **O(1)** as it sorts the array in place without using additional space.

## Development 🛠️

- **`dev`**: Cleans and builds the package in watch mode using Bun.

- **`build`**: Runs a clean build by generating multiple module formats (CJS, ESM, UMD) and type declarations.

- **`build:esm`**: Builds the TypeScript source to ES Module (ESM) format.

- **`build:cjs`**: Builds the TypeScript source to CommonJS (CJS) format.

- **`build:umd`**: Builds the TypeScript source to UMD format with a global name `OmtsBubbleSort`.

- **`build:types`**: Generates type declaration files using the TypeScript compiler.

- **`test`**: Runs all test cases using Bun. 

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
 


 ---
 