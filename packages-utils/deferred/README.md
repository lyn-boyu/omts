# @omts/deferred ⏳

A simple and flexible implementation of the deferred pattern in TypeScript. This package allows you to create a `Promise` and control its resolution and rejection externally, making it ideal for managing complex asynchronous workflows.

## Installation 📦

You can install the package via npm or pnpm:

```bash
npm install @omts/deferred
```

or

```bash
pnpm add @omts/deferred
```

## Usage ✨

This package exports a `Deferred` class, which provides a `promise` object, along with `resolve` and `reject` methods to manually handle promise state. Below is an example of how to use it:

```typescript
import { Deferred } from '@omts/deferred';

// Create a new Deferred instance
const deferred = new Deferred<string>();

// Example usage: Resolve the promise after a delay
setTimeout(() => {
  deferred.resolve("Success!");
}, 1000);

// Consume the promise
deferred.promise.then(result => {
  console.log(result); // Output: "Success!"
}).catch(err => {
  console.error(err);
});
```

### Methods:
- **`resolve(value: T)`**: Resolves the promise with the given value.
- **`reject(reason?: any)`**: Rejects the promise with the specified reason.
- **`promise`**: The `Promise` instance which can be awaited or handled with `.then()`.

### Parameters:
- **T**: The type of value that will be resolved by the promise.

### Complexity 📊
- **Time Complexity**: O(1) for resolving or rejecting the promise. 
- **Space Complexity**: O(1) as only a few references (the promise, resolve, and reject functions) are maintained.

## Example: Handling Asynchronous Events 💡

You can use `Deferred` to manage asynchronous events, making it easier to handle event-based or callback-driven code:

```typescript
import { Deferred } from '@omts/deferred';

const deferred = new Deferred<string>();

// Simulate an API call or asynchronous operation
setTimeout(() => {
  deferred.resolve("Data received!");
}, 2000);

deferred.promise.then((result) => {
  console.log(result); // Output: "Data received!"
});
```

## Development 🛠️

### Bun and Development Setup

We recommend using **Bun** as the development tool. Follow the steps below for development and testing:

1. **Clean**: Remove the `dist` directory.
   ```bash
   pnpm run clean
   ```

2. **Build**: Generate ES and CommonJS formats.
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

- **`build`**: Run a clean build and generate outputs in ES and CommonJS formats.  
  `pnpm run build`

- **`test`**: Run all tests using Bun.  
  `pnpm run test`

- **`tdd`**: Run tests in watch mode.  
  `pnpm run tdd`

## Contributing 🤝

Contributions are welcome! If you have any improvements, bug fixes, or new ideas, feel free to open an issue or submit a pull request (PR).

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy async coding! 🎉

 