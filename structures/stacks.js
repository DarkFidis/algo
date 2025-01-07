// Implémentation pour les tableaux dynamiques
import {LinkedList} from "./chained_list";

export class DynamicArrayStack {
    constructor() {
        this.array = new Array();
        this.top = -1;
    }

    push(value) {
        this.top++;
        this.array[this.top] = value;
    }

    pop() {
        if (this.top === -1) {
            return null;
        } else {
            const value = this.array[this.top];
            this.top--;
            return value;
        }
    }

    peek() {
        if (this.top === -1) {
            return null;
        } else {
            return this.array[this.top];
        }
    }

    getSize() {
        return this.top + 1;
    }

    isEmpty() {
        return this.top === -1;
    }

    clear() {
        this.top = -1;
    }
}

// Implémentation pour les tableaux statiques
export class ArrayStack {
    // Tableau de taille fixe
    constructor(size) {
        this.top = -1; // Pointeur de pile
        // Dans le cas d'un tableau statique, sa taille est fixe
        this.MAX = size;
        this.array = Array(size); // Simule tableau statique
    }

    push(value) {
        if (this.top >= this.MAX - 1) {
            // Cas de dépassement de pile
            throw new Error('Stack overflow');
        } else {
            this.top++;
            this.array[this.top] = value;
        }
    }

    pop() {
        if (this.top === -1) {
            return null;
        } else {
            const value = this.array[this.top];
            this.top--;
            return value;
        }
    }

    peek() {
        if (this.top === -1) {
            return null;
        } else {
            return this.array[this.top];
        }
    }

    getSize() {
        return this.top + 1;
    }

    isEmpty() {
        return this.top === -1;
    }

    clear() {
        this.top = -1;
    }
}

// Implémentation pour les listes chaînées

export class LinkedListStack {
    constructor() {
        this.list = new LinkedList();
    }

    push(value) {
        this.list.addFirst(value);
    }

    pop() {
        return this.list.removeFirst();
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.list.head.value;
    }

    getSize() {
        return this.list.size;
    }

    isEmpty() {
        return this.list.size === 0;
    }

    print() {
        return this.list.print();
    }

    clear() {
        this.list.clear();
    }
}