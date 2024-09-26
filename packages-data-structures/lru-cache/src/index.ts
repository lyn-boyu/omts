class Node<TKey, TValue> {
    key: TKey;
    value: TValue;
    next: Node<TKey, TValue> | null = null;
    prev: Node<TKey, TValue> | null = null;

    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }
}

export class LRUCache<TKey, TValue> {
    private capacity: number;
    private cache: Map<TKey, Node<TKey, TValue>>;
    private head: Node<TKey, TValue> | null = null;
    private tail: Node<TKey, TValue> | null = null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    // Private method to remove a node from the doubly linked list
    private removeNode(node: Node<TKey, TValue>): void {
        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }

    // Private method to insert a node at the front of the doubly linked list
    private insertAtFront(node: Node<TKey, TValue>): void {
        node.next = this.head;
        node.prev = null;

        if (this.head) {
            this.head.prev = node;
        }
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
    }

    // Get the value for a given key
    get(key: TKey): TValue | null {
        if (!this.cache.has(key)) return null;

        const node = this.cache.get(key)!;
        this.removeNode(node);
        this.insertAtFront(node);

        return node.value;
    }

    // Put a new key-value pair into the cache
    put(key: TKey, value: TValue): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            this.removeNode(node);
            node.value = value;
            this.insertAtFront(node);
        } else {
            const newNode = new Node(key, value);
            if (this.cache.size >= this.capacity) {
                if (this.tail) {
                    this.cache.delete(this.tail.key);
                    this.removeNode(this.tail);
                }
            }
            this.cache.set(key, newNode);
            this.insertAtFront(newNode);
        }
    }
}
