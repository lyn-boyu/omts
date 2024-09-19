 

# @omts/disposable 🚀

A lightweight, efficient `DisposableSet` implementation in TypeScript for managing multiple disposable resources. This package simplifies the lifecycle management of both synchronous and asynchronous disposables with built-in error handling and easy-to-use APIs.

## Installation 📦

Install the package via npm or pnpm:

```bash
npm install @omts/disposable
```

or

```bash
pnpm add @omts/disposable
```

## Usage ✨

The package exports a `DisposableSet` class that allows you to manage a set of `IDisposable` objects, providing easy resource cleanup with support for both synchronous and asynchronous disposal.

### Example

Create an instance of `DisposableSet` and add disposable resources to it:

```typescript
import { DisposableSet, IDisposable } from '@omts/disposable';

// Define a disposable resource
class MyResource implements IDisposable {
  dispose(): void {
    console.log('Resource1 disposed');
  }
}

// Add a disposable class instance resource to the set
const disposable1 = new MyResource();

// or you can use the static `create` method:
const disposable2 = DisposableSet.create(() => {
 console.log('Resource2 disposed');
});

const set = new DisposableSet();
set.add(disposable, disposable2);

// Synchronously dispose all resources
set.dispose();
 // Output: 
 // "Resource1 disposed"
 // "Resource2 disposed"
```

### Example with Asynchronous Disposal

You can also manage resources that implement asynchronous `dispose()` methods:

```typescript
class AsyncResource implements IDisposable {
  async dispose(): Promise<void> {
    console.log('Async resource disposed');
    return new Promise(resolve => setTimeout(resolve, 1000));
  }
}

const set = new DisposableSet();
const asyncDisposable = new AsyncResource();
set.add(asyncDisposable);

// Asynchronously dispose all resources
await set.disposeAsync(); // Output (after 1 second): "Async resource disposed"
```

### Using Static Methods

The `DisposableSet` class provides static helper methods to check if an object is disposable and to create disposable objects.

#### `DisposableSet.is()`

This method checks if a given object conforms to the `IDisposable` interface.

```typescript
const obj = { dispose: () => console.log('Disposed') };

if (DisposableSet.is(obj)) {
  obj.dispose(); // Output: "Disposed"
}
```

#### `DisposableSet.create()`

This method creates a disposable object with a custom `dispose()` function.

```typescript
const disposable = DisposableSet.create(() => {
  console.log('Custom disposal logic executed');
});

disposable.dispose(); // Output: "Custom disposal logic executed"
```

### Error Handling

You can register custom error handlers to capture and manage any errors that occur during the disposal process:

```typescript
const set = new DisposableSet();

// Register a custom error handler
set.onError((error, disposable) => {
  console.error(`Error disposing resource: ${error.message}`);
});

const faultyDisposable: IDisposable = {
  dispose: () => { throw new Error('Failed to dispose resource'); }
};

set.add(faultyDisposable);

// Attempt to dispose the resources
set.dispose(); // Output: "Error disposing resource: Failed to dispose resource"
```

### Key Features ✨

- **Synchronous and Asynchronous Disposal**: Manage both sync and async `dispose()` methods, ensuring flexible resource lifecycle management.
- **Static Helper Methods**: Built-in static methods (`is`, `create`) for checking if an object is disposable and for creating disposable objects.
- **Error Handling**: Built-in error handling mechanism that allows you to register custom error handlers to manage exceptions during disposal.
- **Efficient Resource Management**: Uses `Set` to manage disposables for fast lookups and removals.
- **Automatic Resource Cleanup**: Resources are automatically removed from the set after they are disposed.

### API Documentation 📚

- **`push(...disposables: IDisposable[]): IDisposable`**: Adds one or more disposables to the set. Returns a `Disposable` that can be used to remove the added disposables from the set.
  - **Returns**: A `Disposable` to remove the disposables from the set.

- **`dispose(): void`**: Synchronously disposes all resources in the set. If an async `dispose()` is detected, a warning is logged.

- **`disposeAsync(): Promise<void>`**: Asynchronously disposes all resources in the set. Waits for any `Promise`-based disposal methods to complete before resolving.

- **`onError(handler: (error: Error, disposable: IDisposable) => void): IDisposable`**: Registers a custom error handler to capture any errors that occur during disposal.
  - **Returns**: A `Disposable` to remove the error handler.

- **Static Methods**:
  - **`DisposableSet.is(arg: unknown): arg is IDisposable`**: Checks if a given object implements the `IDisposable` interface.
  - **`DisposableSet.create(func: () => void): IDisposable`**: Creates a `Disposable` object with a custom `dispose` function.

### Complexity 📊

- **Time Complexity**:
  - Adding or removing disposables: O(1) with `Set`.
  - Disposing resources: O(n), where n is the number of disposables.
  - Error handling: O(m), where m is the number of error handlers.

- **Space Complexity**:
  - O(n + m), where n is the number of disposables and m is the number of error handlers.

## Development 🛠️

### Bun and Development Setup ⚙️

1. **Install Bun**: Visit the [official Bun website](https://bun.sh/) for installation instructions.

2. **Install Bun VSCode Extension**: Install the **Bun for Visual Studio Code** extension by **Oven** from the [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=oven.bun-vscode).

3. **Debugging with Bun**:
   - Set a breakpoint in `index.ts` by adding `debugger`.
   - Switch to `index.test.ts`, then open the command palette (`Cmd + Shift + P` on Mac, `Ctrl + Shift + P` on Windows/Linux) and select `Bun: Debug`.

### Development Commands

- **`clean`**: Removes the `dist` directory.  
  `pnpm run clean`

- **`build`**: Cleans and builds the package.  
  `pnpm run build`

- **`tdd`**: Runs the tests in watch mode, useful for Test-Driven Development.  
  `pnpm run tdd`

- **`test`**: Runs all test cases.  
  `pnpm run test`

- **`prepublishOnly`**: Runs the build command before publishing.  
  `pnpm run prepublishOnly`

## Contributing 🤝

Contributions are welcome! If you have any improvements, suggestions, or bug fixes, please feel free to open an issue or submit a pull request.

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Happy coding with `@omts/disposable`! 🎉

Feel free to use, contribute, and star the repository if you find it useful!

 