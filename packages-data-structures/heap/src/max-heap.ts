export class MaxHeap {
    // Store the heap as an array
    heap: number[] = []

    // Get parent index
    getParentIdx = (i: number) => Math.floor((i - 1) / 2)

    // Get left child index
    getLeftChildIdx = (i: number) => i * 2 + 1

    // Get right child index
    getRightChildIdx = (i: number) => i * 2 + 2

    // Get parent value
    getParent = (i: number) => this.heap[this.getParentIdx(i)]

    // Get left child value
    getLeftChild = (i: number) => this.heap[this.getLeftChildIdx(i)]

    // Get right child value
    getRightChild = (i: number) => this.heap[this.getRightChildIdx(i)]

    // Swap two elements in the heap
    swap = (i: number, j: number) => {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }

    // Insert a new value into the heap
    insert = (value: number) => {
        this.heap.push(value)
        this.heapifyUp()
    }

    // Move the newly inserted element up to maintain the max heap property
    heapifyUp = () => {
        let idx = this.heap.length - 1
        while (idx > 0 && this.getParent(idx) < this.heap[idx]) {
            this.swap(idx, this.getParentIdx(idx))
            idx = this.getParentIdx(idx)
        }
    }

    // Move the top element down to maintain the max heap property
    heapifyDown = () => {
        let idx = 0
        while (this.getLeftChildIdx(idx) < this.heap.length) {
            let largerChildIndex = this.getLeftChildIdx(idx)
            if (this.getRightChildIdx(idx) < this.heap.length &&
                this.getRightChild(idx) > this.getLeftChild(idx)) {
                largerChildIndex = this.getRightChildIdx(idx)
            }

            if (this.heap[idx] >= this.heap[largerChildIndex]) {
                break;
            }

            this.swap(largerChildIndex, idx)
            idx = largerChildIndex
        }
    }

    // Extract the maximum value from the heap
    extractMax = (): number | null => {
        if (this.heap.length === 0) return null
        if (this.heap.length === 1) return this.heap.pop()!

        const max = this.heap[0]
        this.heap[0] = this.heap.pop()!
        this.heapifyDown()
        return max
    }

    // Peek at the maximum value without removing it
    peek = (): number | undefined => {
        return this.heap[0]
    }

    // Return the size of the heap
    size = (): number => {
        return this.heap.length
    }
}
