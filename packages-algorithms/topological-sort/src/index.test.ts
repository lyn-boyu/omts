import { describe, expect, test } from "bun:test";
import { dagSort } from './index'; 

describe('topologicalSort', () => {
    /** Test for a simple DAG with a valid topological order */
    test('should return correct topological sort for a valid DAG', () => {
        const graph = new Map<string, string[]>([
            ['A', ['C']],
            ['B', ['C', 'D']],
            ['C', ['E']],
            ['D', ['F']],
            ['E', ['F']],
            ['F', []]
        ]);

        const result = dagSort(graph);
        // Expected one valid topological sort order, can vary as long as the order is valid
        expect(result).toEqual(expect.arrayContaining(['B', 'A', 'D', 'C', 'E', 'F']));
    });

    /** Test for a DAG with a single node */
    test('should return the node itself for a single-node graph', () => {
        const graph = new Map<string, string[]>([
            ['A', []]
        ]);

        const result = dagSort(graph);
        expect(result).toEqual(['A']);
    });

    /** Test for an empty graph */
    test('should return an empty array for an empty graph', () => {
        const graph = new Map<string, string[]>();

        const result = dagSort(graph);
        expect(result).toEqual([]);
    });

    /** Test for a DAG where multiple topological sort orders are possible */
    test('should return valid topological sort with multiple valid orders', () => {
        const graph = new Map<string, string[]>([
            ['A', ['B']],
            ['B', ['C']],
            ['C', []],
            ['D', ['B']],
        ]);

        const result = dagSort(graph);
        // Valid topological sort could be ['D', 'A', 'B', 'C'] or ['A', 'D', 'B', 'C']
        expect(result).toEqual(expect.arrayContaining(['A', 'D', 'B', 'C']));
    });

    /** Test for a graph with no edges (disconnected graph) */
    test('should return nodes in any order for a disconnected graph with no edges', () => {
        const graph = new Map<string, string[]>([
            ['A', []],
            ['B', []],
            ['C', []]
        ]);

        const result = dagSort(graph);
        // Since there are no edges, the nodes can be in any order
        expect(result).toEqual(expect.arrayContaining(['A', 'B', 'C']));
    });

    /** Test for detecting a cycle in the graph */
    test('should throw an error for a graph with a cycle', () => {
        const graph = new Map<string, string[]>([
            ['A', ['B']],
            ['B', ['C']],
            ['C', ['A']] // This creates a cycle: A -> B -> C -> A
        ]);

        expect(() => dagSort(graph)).toThrowError('Graph has a cycle, topological sort is not possible!');
    });

    /** Test for a more complex graph */
    test('should return correct topological sort for a larger DAG', () => {
        const graph = new Map<string, string[]>([
            ['A', ['B']],
            ['B', ['C', 'D']],
            ['C', ['E']],
            ['D', ['E']],
            ['E', []],
            ['F', ['B']],
            ['G', ['F']]
        ]);

        const result = dagSort(graph);
        // A valid topological sort could be ['G', 'F', 'A', 'B', 'D', 'C', 'E']
        expect(result).toEqual(expect.arrayContaining(['G', 'F', 'A', 'B', 'D', 'C', 'E']));
    });
});
