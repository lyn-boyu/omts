
# @omts/counting-sort 🚀

A simple and efficient implementation of the Counting Sort algorithm in TypeScript. This package provides a stable and linear-time sorting utility that can be used in both Node.js and browser environments.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/counting-sort
```

## Usage ✨

This package exports a `countingSort` function that sorts an array of non-negative integers using the Counting Sort algorithm. Below is an example of how to use it:

```typescript
import { countingSort } from '@omts/counting-sort';

// Example usage
const unsortedArray = [3, 6, 8, 10, 1, 2, 1];
const sortedArray = countingSort(unsortedArray);

console.log(sortedArray); // Output: [1, 1, 2, 3, 6, 8, 10]
```

### Complexity 📊

- **Time Complexity**:
  - **Best, Average, and Worst Case**: O(n + k), where `n` is the number of elements in the input array and `k` is the range of the input.
- **Space Complexity**:
  - **O(n + k)** due to the auxiliary arrays used for counting and output.

## Development 🛠️

- **`clean`**: Removes the `dist` directory.  
  `pnpm run clean`

- **`dev`**: Cleans and builds the package in watch mode.  
  `pnpm run dev`

- **`build`**: Runs a clean build by generating both ES2015 output and a minified version.  
  `pnpm run build`

- **`build:es2015`**: Builds the TypeScript source to ES2015 JavaScript.  
  `pnpm run build:es2015`

- **`build:minify`**: Minifies the JavaScript output and generates source maps.  
  `pnpm run build:minify`

- **`build:types`**: Generates type declaration files only.  
  `pnpm run build:types`

- **`test`**: Runs all test cases using Bun.  
  `pnpm run test`

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
