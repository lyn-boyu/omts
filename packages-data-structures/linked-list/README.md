# @omts/list-node 🚀

A versatile utility library for creating and manipulating singly linked lists (`ListNode`) in TypeScript. This package supports generic types, allowing you to build linked lists for any data type, and provides various operations such as insertion, deletion, reversing, and more.

## Installation 📦

Install the package via npm or pnpm:

```bash
npm install @omts/list-node
```

or

```bash
pnpm add @omts/list-node
```

## Usage ✨

This package exports a `ListNode` class with a variety of static methods for working with singly linked lists. It supports generic types, making it flexible for use with different data types.

### Example: Creating a Linked List

```typescript
import { ListNode } from '@omts/list-node';

// Create a linked list from an array of numbers
const list = ListNode.createFromArray([1, 2, 3, 4]);
console.log(ListNode.toArray(list)); // Output: [1, 2, 3, 4]

// Get the length of the linked list
const length = ListNode.size(list);
console.log(length); // Output: 4
```

### Example: Inserting, Deleting, and Reversing

```typescript
// Insert a value at index 2
const newList = ListNode.insertAt(list, 2, 99);
console.log(ListNode.toArray(newList)); // Output: [1, 2, 99, 3, 4]

// Delete the value at index 1
const afterDeletion = ListNode.deleteAt(newList, 1);
console.log(ListNode.toArray(afterDeletion)); // Output: [1, 99, 3, 4]

// Reverse the linked list
const reversedList = ListNode.reverse(afterDeletion);
console.log(ListNode.toArray(reversedList)); // Output: [4, 3, 99, 1]
```

### Example: Detecting Cycles and Merging Lists

```typescript
// Check if a linked list has a cycle
const hasCycle = ListNode.hasCycle(list);
console.log(hasCycle); // Output: false

// Merge two sorted linked lists
const list1 = ListNode.createFromArray([1, 3, 5]);
const list2 = ListNode.createFromArray([2, 4, 6]);
const mergedList = ListNode.mergeTwoLists(list1, list2);
console.log(ListNode.toArray(mergedList)); // Output: [1, 2, 3, 4, 5, 6]
```

## API Documentation 📚

- **`ListNode.createFromArray(arr: T[]): ListNode<T> | null`**: Creates a linked list from an array of values.
- **`ListNode.toArray(head: ListNode<T> | null): T[]`**: Converts a linked list back to an array.
- **`ListNode.size(head: ListNode<T> | null): number`**: Returns the number of nodes in the linked list.
- **`ListNode.insertAt(head: ListNode<T> | null, index: number, val: T): ListNode<T> | null`**: Inserts a new node at a specific position in the list.
- **`ListNode.deleteAt(head: ListNode<T> | null, index: number): ListNode<T> | null`**: Deletes a node from a specific position in the list.
- **`ListNode.find(head: ListNode<T> | null, val: T): ListNode<T> | null`**: Finds a node by its value and returns it.
- **`ListNode.reverse(head: ListNode<T> | null): ListNode<T> | null`**: Reverses the linked list.
- **`ListNode.append(head: ListNode<T> | null, val: T): ListNode<T> | null`**: Appends a new node to the end of the linked list.
- **`ListNode.prepend(head: ListNode<T> | null, val: T): ListNode<T>`**: Prepends a new node to the beginning of the linked list.
- **`ListNode.clear(head: ListNode<T> | null): ListNode<T> | null`**: Clears the linked list.
- **`ListNode.hasCycle(head: ListNode<T> | null): boolean`**: Detects if the linked list contains a cycle.
- **`ListNode.mergeTwoLists(l1: ListNode<T> | null, l2: ListNode<T> | null): ListNode<T> | null`**: Merges two sorted linked lists into one.

### Key Features ✨

- **Generic Support**: The linked list is implemented with TypeScript generics, allowing you to use it with any data type.
- **Comprehensive Linked List Operations**: Provides essential linked list operations such as insertion, deletion, reversal, and more.
- **Cycle Detection**: Detect if a linked list contains a cycle.
- **Merge Sorted Lists**: Easily merge two sorted linked lists into one.

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

 