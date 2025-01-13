export class MaxBinaryHeap {
    constructor() {
        this.heap = [];
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    getSize() {
        return this.heap.length;
    }

    findMax() {
        return this.heap[0];
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    insert(value) {
        this.heap.push(value);
        this.heapifyUpIterative(); // Itératif ou récursif
    }

    heapifyUpIterative() {
        let childIndex = this.heap.length - 1;
        let parentIndex = Math.floor((childIndex - 1) / 2);
        while (childIndex > 0 && this.heap[childIndex] > this.heap[parentIndex]) {
            this.swap(childIndex, parentIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    heapifyUpRecursive(index = this.heap.length - 1) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex] < this.heap[index]) {
            this.swap(parentIndex, index);
            this.heapifyUpRecursive(parentIndex);
        }
    }

    extractMax() {
        if (this.isEmpty()) {
            return null;
        }
        const max = this.heap[0];
        const end = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDownIterative(); // Itératif ou récursif
        }
        return max;
    }

    heapifyDownIterative() {
        let parentIndex = 0;
        let left = parentIndex * 2 + 1;
        let right = parentIndex * 2 + 2;
        const length = this.heap.length;
        while (
            (parentIndex < length &&
                left < length &&
                this.heap[left] > this.heap[parentIndex]) ||
            (right < length && this.heap[right] > this.heap[parentIndex])
            ) {
            let max;
            if (right >= length) {
                max = left;
            } else if (this.heap[left] > this.heap[right]) {
                max = left;
            } else {
                max = right;
            }
            this.swap(parentIndex, max);
            parentIndex = max;
            left = parentIndex * 2 + 1;
            right = parentIndex * 2 + 2;
        }
    }

    heapifyDownRecursive(index = 0) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
            largest = left;
        }

        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDownRecursive(largest);
        }
    }

}

// La priorité est un nombre entier positif.
// Plus le nombre est grand, plus la priorité est élevée.
// MaxHeap priority queue
export class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    insert(item) {
        this.heap.push(item);
        this.heapifyUpRecursive();
    }

    extractMax() {
        const item = this.heap[0];
        const lastItem = this.heap.pop();
        if (this.heap.length > 0) {
            this.heap[0] = lastItem;
            this.heapifyDownRecursive();
        }
        return item;
    }

    maximum() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(i, j) {
        let temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }

    heapifyUpRecursive(index = this.heap.length - 1) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[parentIndex]?.priority < this.heap[index]?.priority) {
            this.swap(parentIndex, index);
            this.heapifyUpRecursive(parentIndex);
        }
    }

    heapifyDownRecursive(index = 0) {
        let left = 2 * index + 1;
        let right = 2 * index + 2;
        let largest = index;

        if (
            left < this.heap.length &&
            this.heap[left].priority > this.heap[largest].priority
        ) {
            largest = left;
        }

        if (
            right < this.heap.length &&
            this.heap[right].priority > this.heap[largest].priority
        ) {
            largest = right;
        }

        if (largest !== index) {
            this.swap(index, largest);
            this.heapifyDownRecursive(largest);
        }
    }
}