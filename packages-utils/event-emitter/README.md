
# @omts/event-emitter 🚀

A type-safe, flexible, and efficient `EventEmitter` implementation in TypeScript for both Node.js and browser environments. This package simplifies the management of event-driven architecture with strict type safety, optimized performance, and easy-to-use APIs.

## Installation 📦

Install the package via npm or pnpm:

```bash
npm install @omts/event-emitter
```

or

```bash
pnpm add @omts/event-emitter
```

## Usage ✨

The package exports an `EventEmitter` class that allows you to subscribe to events, emit events, manage listeners with type safety, and handle errors with detailed context. Here’s how to use it:

### Example

Define your events and their payloads using TypeScript's type system:

```typescript
import { EventEmitter } from '@omts/event-emitter';

// Define your events and their payload types
interface Events {
  data: number;
  error: Error;
  message: string;
}

// Create an instance of EventEmitter
const emitter = new EventEmitter<Events>();


// Subscribe to 'data' event with disposable support
const subscription = emitter.on('data', (num) => {
  console.log('Received data:', num);
});

// Emit 'data' event
emitter.emit('data', 42);  // Output: "Received data: 42"

// Dispose of the subscription
subscription.dispose();

// Emit 'data' event again - no output this time since the listener is disposed
emitter.emit('data', 100);

// Subscribe to 'data' event with a listener that triggers only once
const singleUseSubscription = emitter.once('data', (num) => {
  console.log('Received data once:', num);
});

// Emit 'data' event - triggers the listener once
emitter.emit('data', 200);  // Output: "Received data once: 200"

// Emit 'data' event again - no output since the listener is automatically removed
emitter.emit('data', 300);

// Subscribe to an event
const subscription = emitter.on('data', (num) => {
  if (num === 42) throw new Error('The number 42 is not allowed!');
  console.log('Received data:', num);
});

// Register a custom error handler
const errorSubscription = emitter.onError((event, error, listener) => {
  console.error(`Error in event '${event}': ${error.message}`);
  console.error('Listener that caused the error:', listener);
});

// Emit 'data' event that will cause an error
emitter.emit('data', 42);  
// Output: "Error in event 'data': The number 42 is not allowed!"
// "Listener that caused the error: [Function: listener]"

// Dispose the error handler
errorSubscription.dispose();

// Emit 'data' event again - error will not be handled as the handler is removed
emitter.emit('data', 42);  // No output

// Dispose the data event listener
subscription.dispose();
```

### Key Features ✨

- **Type-Safe Event Handling**: Define events and payloads using TypeScript types, ensuring compile-time checks and reducing runtime errors.
- **Built-in `once` Method**: Automatically remove listeners after they are triggered once, preventing memory leaks.
- **Detailed Error Handling**: Register custom error handlers with `onError` to handle errors with context, including the event name, error object, and the listener that caused the error.
- **Flexible and Lightweight**: Works seamlessly in both Node.js and browser environments without additional dependencies.
- **Supports Removing Specific Listeners**: Easily manage event listeners and remove them when no longer needed.

### API Documentation 📚

- **`on(event, listener)`**: Adds a listener for the specified event.
  - `event`: The event name.
  - `listener`: The callback function that will be invoked when the event is emitted.
  - **Returns**: A `Disposable` object to remove the listener.

- **`off(event, listener)`**: Removes a specific listener from the event.
  - `event`: The event name.
  - `listener`: The callback function to be removed.

- **`once(event, listener)`**: Adds a listener that will be called at most once.
  - `event`: The event name.
  - `listener`: The callback function that will be invoked only once.
  - **Returns**: A `Disposable` object to remove the listener.

- **`emit(event, data)`**: Emits an event with the specified data.
  - `event`: The event name.
  - `data`: The data to be passed to the listeners.
  - **Returns**: `true` if listeners are called; `false` if there are no listeners.

- **`onError(handler)`**: Registers a custom error handler for events.
  - `handler`: A function that receives the event name, error object, and listener that caused the error.
  - **Returns**: A `Disposable` object to remove the error handler.

- **`removeAllListeners(event)`**: Removes all listeners for the specified event.
  - `event`: The event name.

### Complexity 📊

- **Time Complexity**:
  - Adding or removing listeners: O(1) average case with `Set`.
  - Emitting events: O(n), where n is the number of listeners for the event.
  - Error handling: O(m), where m is the number of error handlers.

- **Space Complexity**:
  - O(n + m), where n is the number of registered listeners and m is the number of registered error handlers.

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

Happy coding with `@omts/event-emitter`! 🎉

Feel free to use, contribute, and star the repository if you find it useful!
