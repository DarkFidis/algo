// Chaque liste chaînée contient un Node
export class Node {
    constructor(value, next = null) {
        // Valeur de la node
        this.value = value;
        // Valeur de la node suivante
        this.next = next;
    }
}

export class LinkedList {
    constructor() {
        // Adresse du premier élement de la liste
        this.head = null;
        // Taille de la liste
        this.size = null;
    }

    print() {
        let current = this.head;
        while (current) {
            process.stdout.write(`${current.value} -> `);
            current = current.next;
        }
        console.log(null);
    }

    addFirst(value) {
        this.head = new Node(value, this.head);
        this.size++;
    }

    addLast(value) {
        let current = this.head;
        // Si head est null, alors la liste est vide, donc on ajoute directement le nouveau node
        if (!current) {
            this.head = new Node(value);
        } else {
            // Tant qu'il y a une valeur next, on parcourt la liste
            while (current.next) {
                current = current.next;
            }
            // Quand il n'y a plus de valeur next, ajouter le nouveau node
            current.next = new Node(value);
        }
        this.size++;
    }

    add(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error('Index invalide');
        } else if (index === 0) {
            // Si index = 0, cela veut dire qu'on insère le node au début (voir addFirst)
            this.head = new Node(value, this.head);
        } else {
            let current = this.head;
            while (index - 1) {
                current = current.next;
                index--;
            }
            current.next = new Node(value, current.next);
        }
        this.size++;
    }

    removeFirst() {
        let current = this.head;
        if (!current) {
            return null;
        } else {
            this.head = current.next;
            this.size--;
            return current.value;
        }
    }

    removeLast() {
        let current = this.head;
        if (!current) {
            return null;
        } else if (!current.next) {
            this.head = null;
            this.size--;
            return current.value;
        } else {
            while (current.next.next) {
                current = current.next;
            }
            const lastNode = current.next;
            current.next = null;
            this.size--;
            return lastNode.value;
        }
    }

    remove(position) {
        if (position < 0 || position > this.size - 1) {
            throw new Error('Index invalide');
        } else if (position === 0) {
            return this.removeFirst();
        } else {
            let current = this.head;
            while (position - 1) {
                current = current.next;
                position--;
            }
            const nodeValue = current.next.value;
            current.next = current.next.next;
            this.size--;
            return nodeValue;
        }
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (Object.is(value, current.value)) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    getNodeAtIndex(index) {
        if (index < 0 || index > this.size - 1) {
            return null;
        } else {
            let current = this.head;
            while (index) {
                current = current.next;
                index--;
            }
            return current;
        }
    }
}

export function reverseList(linkedList) {
    let current = linkedList.head;
    if (!current || !current.next) {
        return;
    } else {
        let prev = null;
        while (current) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        linkedList.head = prev;
    }
}

export function sortList(linkedList) {
    let current = linkedList.head;
    if (!current || !current.next) {
        return;
    } else {
        const sortedList = new LinkedList();
        sortedList.addFirst(current.value);
        current = current.next;
        while (current) {
            let sortedHead = sortedList.head;
            while (sortedHead.next && sortedHead.next.value < current.value) {
                sortedHead = sortedHead.next;
            }
            if (sortedHead.value > current.value) {
                sortedList.head = new Node(current.value, sortedHead);
            } else {
                sortedHead.next = new Node(current.value, sortedHead.next);
            }
            current = current.next;
        }
        linkedList.head = sortedList.head;
    }
}

