# @omts/deep-clone 🚀

A versatile and efficient deep clone utility implemented in TypeScript. This package is designed to work seamlessly in both Node.js and browser environments and can handle cloning of various JavaScript data types, including objects, arrays, dates, regexes, maps, sets, and more, even in the presence of circular references.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/deep-clone
```

## Usage ✨

This package exports a `deepClone` function that performs a deep copy of the provided input. Below are some examples of how to use it:

```typescript
import { deepClone } from '@omts/deep-clone';

// Example usage
const originalObject = {
  name: "Alice",
  age: 30,
  hobbies: ["reading", "gaming"],
  address: {
    city: "Wonderland",
    zip: 12345
  },
  createdAt: new Date(),
  pattern: /abc/g
};

const clonedObject = deepClone(originalObject);

console.log(clonedObject); // Output: A deep cloned copy of the original object
console.log(clonedObject === originalObject); // false
console.log(clonedObject.address === originalObject.address); // false
```

### Supported Types

- **Primitive Types**: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
- **Objects**: Plain objects, arrays
- **Built-in Objects**: `Date`, `RegExp`, `Map`, `Set`
- **Special Types**: `BigInt`
- **Circular References**: Supported through `WeakMap` to avoid infinite recursion.

### Features ✨

- **Handles Complex Data Structures**: Supports deep cloning of nested objects, arrays, `Date` objects, `RegExp` objects, `Map`, `Set`, `BigInt`, and more.
- **Handles Circular References**: Uses a `WeakMap` to manage circular references efficiently.
- **Compatible with Node.js and Browser Environments**: Can be used in both Node.js applications and browser-based projects.
- **Zero Dependencies**: The package is lightweight with no external dependencies.

### Complexity 📊

- **Time Complexity**: The complexity depends on the size and depth of the object structure. In general, it is `O(n)` where `n` is the total number of properties in the object.
- **Space Complexity**: The space complexity is also `O(n)` due to the additional storage needed for the cloned structure and the stack space required for recursion.

## Limitations 🚧

While `@omts/deep-clone` provides comprehensive cloning capabilities for most use cases, there are some limitations to be aware of:

1. **Unsupported Types**: The `deepClone` function does not support cloning of certain JavaScript types, such as `WeakMap`, `WeakSet`, `Promise`, `Proxy`, `Function`, and `Error` objects.
   
2. **Performance Considerations**: For very large and deeply nested objects, the cloning process can be slow and may consume significant memory due to the recursive nature of the algorithm. It is recommended to avoid cloning large datasets directly.

3. **Prototype Chain**: The cloned object does not maintain the prototype chain of the original object. If you need to preserve class instances or custom prototypes, additional handling is required.

4. **Immutable Data Structures**: The function is not designed to handle or clone immutable data structures commonly used in libraries like `Immutable.js`.

## Development 🛠️

- **`clean`**: Removes the `dist` directory.
- **`build`**: Cleans the dist directory and runs all build steps.
- **`tdd`**: Runs the tests in watch mode, useful for Test-Driven Development.
- **`test`**: Runs all test cases.
- **`prepublishOnly`**: Runs the build command before publishing to ensure the package is up-to-date.

### Bun and Development Setup ⚙️

1. **Install Bun**: Visit the [official Bun website](https://bun.sh/) for installation instructions.
   
2. **Install Bun VSCode Extension**: Install the **Bun for Visual Studio Code** extension by **Oven** from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode).

3. **Debugging with Bun**: 
   - Set a breakpoint in `index.ts` by adding `debugger`.
   - Switch to `index.test.ts`, then open the command palette (`Cmd + Shift + P` on Mac, `Ctrl + Shift + P` on Windows/Linux) and select `Bun: Debug`.

## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy coding! 🎉

 