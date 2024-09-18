# @omts/throttle 🚀

A simple, customizable, and performant implementation of the throttle function in TypeScript. This package helps you control the frequency at which a function is executed, limiting it to run only once within a specified time window.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/throttle
```

or

```bash
pnpm add @omts/throttle
```

## Usage ✨

This package exports a `throttle` function that limits how often a given function can be called. Below is an example of how to use it:

```typescript
import { throttle } from '@omts/throttle';

// Example usage: Throttle a function that logs user input
const logInput = (input: string) => {
  console.log(input);
};

const throttledLogInput = throttle(logInput, 1000, { leading: true, trailing: true });

// Simulating function calls
throttledLogInput("Hello"); // Executed immediately
throttledLogInput("World"); // Ignored if called within 1000ms
setTimeout(() => throttledLogInput("Again!"), 1500); // Executed after 1500ms
```

### Options:
- **leading**: Determines if the function should be called immediately when invoked. Default is `true`.
- **trailing**: Determines if the function should be called after the throttle period has passed if it was invoked during that period. Default is `true`.

### Parameters:
- **func**: The function you want to throttle.
- **limit**: The minimum time (in milliseconds) between function executions.
- **options**: An object to control `leading` and `trailing` execution behavior.

### Complexity 📊
- **Time Complexity**: O(1) for each call. Setting up a `setTimeout` or clearing a timeout is a constant-time operation.
- **Space Complexity**: O(1) as only a few additional variables are stored (such as the timer reference and last execution time).

## Example with Leading and Trailing Edge Execution 💡

Throttle can be configured to execute the function at the beginning (leading) and/or end (trailing) of the throttle period.

```typescript
const throttled = throttle(() => console.log("Throttled"), 1000, { leading: false, trailing: true });
throttled(); // Will be executed after 1000ms, not immediately
```

## Development 🛠️

### Bun and Development Setup

To develop and test this package, we recommend using **Bun** as the development tool.

1. **Clean**: Remove the `dist` directory.
   ```bash
   pnpm run clean
   ```

2. **Build**: Generate ES, CommonJS, and UMD formats, and minify the outputs.
   ```bash
   pnpm run build
   ```

3. **Test**: Run the tests using the Bun test runner.
   ```bash
   pnpm run test
   ```

### Scripts
- **`clean`**: Remove the `dist` directory.  
  `pnpm run clean`

- **`build`**: Run a clean build by generating both ES and UMD formats, and minifying the output.  
  `pnpm run build`

- **`test`**: Run all tests using Bun.  
  `pnpm run test`

- **`tdd`**: Run tests in watch mode.  
  `pnpm run tdd`

 
## Contributing 🤝

Contributions are welcome! If you have any improvements or suggestions, feel free to open an issue or submit a pull request (PR).

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy throttling! 🎉