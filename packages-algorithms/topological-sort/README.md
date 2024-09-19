 # @omts/dag-sort 🚀

A lightweight, TypeScript-based utility for performing **topological sorting** on **Directed Acyclic Graphs (DAGs)**. This package allows you to efficiently sort nodes of a DAG, detecting any cycles that might prevent a valid sort.

## Installation 📦

Install the package via npm or pnpm:

```bash
npm install @omts/dag-sort
```

or

```bash
pnpm add @omts/dag-sort
```

## Usage ✨

This package exports a `topologicalSort` function, which takes a **DAG** represented as an adjacency list and returns a valid topological order. If the graph contains cycles, an error is thrown.

### Example

```typescript
import { topologicalSort } from '@omts/dag-sort';

// Define a directed acyclic graph (DAG)
const graph = new Map<string, string[]>([
    ['A', ['C']],
    ['B', ['C', 'D']],
    ['C', ['E']],
    ['D', ['F']],
    ['E', ['F']],
    ['F', []]
]);

// Perform topological sort
const sorted = topologicalSort(graph);
console.log(sorted); // Output: [ 'B', 'A', 'D', 'C', 'E', 'F' ]
```

### Handling Cycles

If the graph contains a cycle, the `topologicalSort` function will throw an error. This ensures that only valid DAGs are processed.

```typescript
const cyclicGraph = new Map<string, string[]>([
    ['A', ['B']],
    ['B', ['C']],
    ['C', ['A']] // Cycle exists: A -> B -> C -> A
]);

try {
    topologicalSort(cyclicGraph);
} catch (error) {
    console.error(error.message); // Output: Graph has a cycle, topological sort is not possible!
}
```

## API Documentation 📚

### `topologicalSort(graph: Map<string, string[]>): string[]`

- **Parameters**:
  - `graph`: A directed acyclic graph represented as an adjacency list using a `Map<string, string[]>`. Each key represents a node, and its corresponding value is an array of nodes it points to.
  
- **Returns**: An array of nodes in topologically sorted order.

- **Throws**: If a cycle is detected, an error is thrown with the message `"Graph has a cycle, topological sort is not possible!"`.

### Key Features ✨

- **Topological Sorting**: Efficiently sorts DAG nodes in a valid linear order.
- **Cycle Detection**: Automatically detects and throws an error if a cycle is found.
- **TypeScript Support**: Built with TypeScript, ensuring strong typing and type safety.
- **Simple API**: Provides a minimal, easy-to-use API for topological sorting.

## Development 🛠️

### Install dependencies:

```bash
pnpm install
```

### Run tests:

```bash
pnpm run test
```

### Build the project:

```bash
pnpm run build
```

## License ⚖️

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
