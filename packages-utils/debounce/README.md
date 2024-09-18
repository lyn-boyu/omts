Below is a comprehensive README for the `@omts/debounce` package in markdown format. This README includes installation instructions, usage examples, API details, and more.

---

# @omts/debounce 🚀

A lightweight and highly flexible debounce function for TypeScript and JavaScript projects. This package provides a simple way to limit the rate at which a function can be called, making it ideal for handling events that can fire frequently (like window resizing, keystrokes, or scroll events).

## Installation 📦

You can install the package via npm or pnpm:

```bash
# npm
npm install @omts/debounce

# pnpm
pnpm add @omts/debounce
```

## Usage ✨

This package exports a `debounce` function that delays the execution of a function until after a specified wait time has elapsed since the last time the debounced function was invoked.

### Basic Usage

```typescript
import { debounce } from '@omts/debounce';

// Example: Debouncing a function that logs a message
function logMessage(message: string) {
  console.log(message);
}

const debouncedLog = debounce(logMessage, 300);

// Call the debounced function multiple times
debouncedLog('Hello');  // Only this call will execute after 300ms
debouncedLog('Hello again');  // Cancels the previous call and schedules this one
```

### Immediate Execution

You can configure `debounce` to execute the function immediately on the first call and then wait for the specified delay:

```typescript
const debouncedImmediateLog = debounce(logMessage, 300, true);

debouncedImmediateLog('Immediate Hello');  // Executes immediately
debouncedImmediateLog('Immediate Hello again');  // Ignored if called within 300ms
```

### API Reference 📘

#### `debounce<T>(func: T, wait: number, immediate?: boolean): (...args: Parameters<T>) => void`

Creates a debounced version of the provided function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. If `immediate` is set to `true`, `func` is invoked on the leading edge instead of the trailing edge of the `wait` interval.

- **Parameters**:
  - `func` (`T`): The function to debounce.
  - `wait` (`number`): The number of milliseconds to delay.
  - `immediate` (`boolean`, optional): If `true`, trigger the function on the leading edge instead of the trailing. Defaults to `false`.

- **Returns**:
  - Returns a new debounced function.

### Example Usage with Events

```typescript
const handleResize = () => {
  console.log('Window resized!');
};

const debouncedResizeHandler = debounce(handleResize, 500);

window.addEventListener('resize', debouncedResizeHandler);
```

### Custom Context Binding

When using debounce in a class or object context, make sure to bind the function to the correct `this` context:

```typescript
class Search {
  value: string = '';

  constructor() {
    this.handleSearch = debounce(this.handleSearch.bind(this), 300);
  }

  handleSearch(query: string) {
    this.value = query;
    console.log('Searching for:', this.value);
  }
}

const search = new Search();
search.handleSearch('debounce example');  // Debounced call
```

### Development 🛠️

- **clean**: Removes the `dist` directory.  
  `pnpm run clean`

- **build**: Runs a clean build for all module formats.  
  `pnpm run build`

- **tdd**: Runs all tests in watch mode for test-driven development.  
  `pnpm run tdd`

- **test**: Runs all test cases using Bun.  
  `pnpm run test`

- **prepublishOnly**: Runs the build before publishing.  
  `pnpm run prepublishOnly`

### Bun and Development Setup ⚙️

Bun is a fast JavaScript runtime like Node.js but built from scratch to focus on performance. It supports TypeScript out of the box and provides its own package manager.

#### Install Bun

To install Bun, follow these instructions:

```bash
curl -fsSL https://bun.sh/install | bash
```

#### Install Bun Extension for VSCode

You can install the "Bun for Visual Studio Code" extension by Oven from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode).

#### Debugging Setup

To debug with Bun in VSCode:

1. Set a breakpoint in `index.ts` by adding `debugger`.
2. Switch to `index.test.ts`.
3. Open the command palette with `Shift + Cmd + P` (Mac) or `Ctrl + Shift + P` (Windows).
4. Select `Bun: Debug`.

### Limitations 🛑

- It does not support advanced configurations like throttling or different trailing/leading combinations.

## Contributing 🤝

Contributions are welcome! If you have any improvements, suggestions, or find any issues, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---