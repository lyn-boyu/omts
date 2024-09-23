export class MinHeap {
    // Store heap elements
    heap: number[] = []

    // Calculate parent index
    getParentIdx = (idx: number) => Math.floor((idx - 1) / 2)

    // Calculate left child index
    getLeftChildIdx = (idx: number) => idx * 2 + 1

    // Calculate right child index
    getRightChildIdx = (idx: number) => idx * 2 + 2

    // Get parent value
    getParent = (idx: number) => this.heap[this.getParentIdx(idx)]

    // Get left child value
    getLeftChild = (idx: number) => this.heap[this.getLeftChildIdx(idx)]

    // Get right child value
    getRightChild = (idx: number) => this.heap[this.getRightChildIdx(idx)]

    // Swap two elements in the heap
    swap = (idx1: number, idx2: number) => {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }

    // Move the newly added element up to maintain the heap property
    heapifyUp = () => {
        let idx = this.heap.length - 1
        while (idx > 0 && this.getParent(idx) > this.heap[idx]) {
            this.swap(this.getParentIdx(idx), idx)
            idx = this.getParentIdx(idx)
        }
    }

    // Move the top element down to maintain the heap property
    heapifyDown = () => {
        let idx = 0
        while (this.getLeftChildIdx(idx) < this.heap.length) {
            // Find the smaller child
            let smallerChildIdx = this.getLeftChildIdx(idx)
            if (this.getRightChildIdx(idx) < this.heap.length && this.getRightChild(idx) < this.getLeftChild(idx)) {
                smallerChildIdx = this.getRightChildIdx(idx)
            }

            // Break if the current node is smaller than the smallest child
            if (this.heap[idx] <= this.heap[smallerChildIdx]) {
                break;
            }

            // Swap with the smaller child and continue down
            this.swap(idx, smallerChildIdx)
            idx = smallerChildIdx
        }
    }

    // Insert an element and maintain the heap property
    insert = (ele: number) => {
        this.heap.push(ele)
        this.heapifyUp()
    }

    // Remove and return the minimum element
    extractMin = (): number | null => {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop()!;

        const min = this.heap[0];
        this.heap[0] = this.heap.pop()!;
        this.heapifyDown();
        return min;
    }

    // Return the size of the heap
    size() {
        return this.heap.length;
    }

    // Peek the minimum value without removing it
    peek() {
        return this.heap[0] ?? null;
    }
}
