import { Node } from './chained_list'
import {LinkedListStack} from "./stacks";
// Implémentation de file pour un tableau statique
export class QueueArray {
    // Tableau de taille fixe
    constructor(size) {
        this.head = 0;
        this.tail = 0;
        this.MAX = size; // Taille maximale du tableau
        this.array = Array(size).fill(null);
    }

    enqueue(value) {
        if (this.getSize() === this.MAX) {
            // Dans ce cas, on dépasse la taille fixe du tableau
            throw new Error('Queue is full');
        }
        this.array[this.tail] = value;
        this.tail++;
        if (this.tail === this.MAX) {
            this.tail = 0;
        }
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const value = this.array[this.head];
        this.array[this.head] = null;
        this.head++;
        if (this.head === this.MAX) {
            this.head = 0;
        }
        return value;
    }

    peek() {
        return this.array[this.head];
    }

    isEmpty() {
        return this.array[this.head] === null;
    }

    clear() {
        this.head = 0;
        this.tail = 0;
        this.array = Array(this.MAX).fill(null);
    }

    getSize() {
        if (this.isEmpty()) {
            return 0;
        } else if (this.head < this.tail) {
            return this.tail - this.head;
        } else {
            return this.MAX - this.head + this.tail;
        }
    }
}

// Implémentation d'une file pour une liste chaînée
export class LinkedListQueue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(value) {
        const node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = this.tail.next;
        }
        this.size++;
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        const node = this.head;
        this.head = this.head.next;
        this.size--;
        if (this.size === 0) {
            this.tail = null;
        }
        return node.value;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.head.value;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}

// Reverse d'une queue avec une pile
export function reverseQueueStack(queue) {
    const stack = new LinkedListStack();
    while (!queue.isEmpty()) {
        stack.push(queue.dequeue());
    }
    while (!stack.isEmpty()) {
        queue.enqueue(stack.pop());
    }
    return queue;
}

// Reverse d'une queue de manière récursive
export function reverseQueueRecursive(queue) {
    if (queue.isEmpty()) {
        return;
    }

    const item = queue.dequeue();
    reverseQueueRecursive(queue);
    queue.enqueue(item);
    return queue;
}