/**
 * Performs topological sort on a directed acyclic graph (DAG).
 * @param graph A directed graph represented as an adjacency list.
 * @returns An array of nodes in topologically sorted order.
 * @throws Error if the graph has a cycle.
 */
export function dagSort(graph: Map<string, string[]>): string[] {
    const visited: Set<string> = new Set();
    const tempMark: Set<string> = new Set(); // Tracks nodes in the current recursion stack
    const sorted: string[] = []; // Stores the topological sort order

    /**
     * Recursive function to perform DFS and topologically sort the graph.
     * @param node The current node being visited.
     */
    function dfs(node: string): void {
        if (tempMark.has(node)) {
            throw new Error(`Graph has a cycle, topological sort is not possible! Node: ${node}`);
        }

        if (!visited.has(node)) {
            tempMark.add(node); // Mark this node temporarily (part of the current recursion stack)

            // Visit all neighbors (outgoing edges)
            const neighbors = graph.get(node) || [];
            for (const neighbor of neighbors) {
                dfs(neighbor);
            }

            tempMark.delete(node); // Remove temporary mark
            visited.add(node); // Mark as permanently visited
            sorted.unshift(node); // Add node to the result (prepending to ensure correct order)
        }
    }

    // Perform DFS for each node in the graph
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }

    return sorted;
}
