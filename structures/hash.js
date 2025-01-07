export default class HashTableBasic {
    constructor() {
        // Tableau statique donc de taille fixe, cette dernière doit être un nombre premier car on utilise modulo
        this.table = new Array(97); // 97 est un nombre premier
        this.size = 0;
    }

    // Hachage statique, méthode par division
    // Exemple de collision clé 197 et 'ad'
    divisionHash(key) {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % this.table.length;
        } else if (typeof key === 'number') {
            return key % this.table.length;
        }
    }

    // Hachage statique, méthode par multiplication
    multiplicationHash(key) {
        const A = 0.8018543616126939; // 0 < A < 1
        let total = 0;
        if (typeof key === 'string') {
            for (let i = 0; i < key.length; i++) {
                total += key.charCodeAt(i);
            }
        } else if (typeof key === 'number') {
            total = key;
        }
        return Math.floor(this.table.length * ((total * A) % 1));
    }

    set(key, value = null) {
        const index = this.hash(key);
        if (this.table[index]) {
            console.log('Collision !');
        } else {
            this.size++;
        }
        // Si pas de valeur, on considère que la clé est à la fois la valeur et la clé : 197 => 197 / 'ad' => 'ad'
        this.table[index] = value ?? key;
    }

    get(key) {
        const index = this.hash(key);
        return this.table[index];
    }

    delete(key) {
        const index = this.hash(key);
        const deleted = this.table[index];
        if (deleted) {
            this.size--;
            this.table[index] = null;
        }
        return deleted;
    }

    isEmpty() {
        return this.size === 0;
    }
}

// Liste chaînée pour table de hash
export class HashNode {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

export class HashLinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(key, value = null) {
        let current = this.head;
        if (!current) {
            this.head = new HashNode(key, value ?? key);
        } else {
            while (current.next) {
                current = current.next;
            }
            current.next = new HashNode(key, value ?? key);
        }
        this.size++;
    }

    get(key) {
        let current = this.head;
        if (!current) {
            return null;
        } else {
            while (current) {
                if (key === current.key) {
                    return current.value;
                }
                current = current.next;
            }
            return null;
        }
    }

    delete(key) {
        let current = this.head;
        if (!current) {
            return null;
        } else if (key === current.key) {
            const nodeValue = current.value;
            this.head = current.next;
            this.size--;
            return nodeValue;
        } else {
            while (current.next) {
                if (key === current.next.key) {
                    const nodeValue = current.next.value;
                    current.next = current.next.next;
                    this.size--;
                    return nodeValue;
                }
                current = current.next;
            }
            return null;
        }
    }

    update(key, value) {
        let current = this.head;
        if (!current) {
            return false;
        } else {
            while (current) {
                if (key === current.key) {
                    current.value = value;
                    return value;
                }
                current = current.next;
            }
            return false;
        }
    }
}

// Table de hash avec résolution des collisions

export class ChainingHashTable {
    constructor() {
        this.table = new Array(97);
        this.size = 0;
    }

    hash(key) {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % this.table.length;
        } else if (typeof key === 'number') {
            return key % this.table.length;
        }
    }

    set(key, value = null) {
        const index = this.hash(key);
        const list = this.table[index];
        if (!list) {
            this.table[index] = new HashLinkedList();
            this.table[index].add(key, value);
            this.size++;
        } else {
            if (!list.update(key, value)) {
                list.add(key, value);
                this.size++;
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        const list = this.table[index];
        if (!list) {
            return null;
        }
        return list.get(key);
    }

    delete(key) {
        const index = this.hash(key);
        const list = this.table[index];
        if (!list) {
            return null;
        }
        const value = list.delete(key);
        if (value) {
            this.size--;
        }
        return value;
    }

    isEmpty() {
        return this.size === 0;
    }
}

// Gestion des collisions par adressage ouvert
export class LinearProbingHashTable {
    constructor() {
        this.table = new Array(97);
        this.size = 0;
    }

    hash(key) {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % this.table.length;
        } else if (typeof key === 'number') {
            return key % this.table.length;
        }
    }

    probe(index) {
        if (index === this.table.length - 1) {
            return 0;
        } else {
            return index + 1;
        }
    }
    set(key, value = null) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            // Si la position est une tombe (null) ou n'est pas occupée (undefined) alors on peut ajouter l'élément :
            if (!this.table[position]) {
                this.table[position] = { key, value: value ?? key };
                this.size++;
                return;
                // Si la position est occupée par l'élément à ajouter
                // on met à jour la valeur :
            } else if (this.table[position]?.key === key) {
                this.table[position].value = value;
                return;
            }
            position = this.probe(position);
            i++;
        }
        throw new Error('La table est pleine');
    }

    get(key) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            if (this.table[position]?.key === key) {
                return this.table[position].value;
            } else if (this.table[position] === undefined) {
                return null;
            }
            position = this.probe(position);
            i++;
        }
        return null;
    }

    delete(key) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            if (this.table[position]?.key === key) {
                // On met une tombe à la place de l'élément à supprimer :
                this.table[position] = null;
                this.size--;
                return;
            } else if (this.table[position] === undefined) {
                return;
            }
            position = this.probe(position);
            i++;
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}

// Facteur de compression
export class RehashingHashTable {
    static primeNumbers = [
        23, 47, 97, 197, 397, 797, 1597, 3203, 6421, 12853, 25717, 51437, 102877,
        205759, 411527, 823117, 1646237, 3292489, 6584983, 13169977,
    ];

    constructor() {
        this.table = new Array(11);
        this.size = 0;
        this.MAX_LOAD_FACTOR = 0.75;
    }

    hash(key) {
        if (typeof key === 'string') {
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash += key.charCodeAt(i);
            }
            return hash % this.table.length;
        } else if (typeof key === 'number') {
            return key % this.table.length;
        }
    }

    // O(n)
    rehash() {
        const oldTable = this.table;
        this.table = new Array(this.getNextPrime());
        this.size = 0;
        for (let i = 0; i < oldTable.length; i++) {
            if (oldTable[i]) {
                this.set(oldTable[i].key, oldTable[i].value);
            }
        }
    }

    getNextPrime() {
        const doubledLength = this.table.length * 2;
        for (let i = 0; i < HashTableRehashing.primeNumbers.length; i++) {
            if (HashTableRehashing.primeNumbers[i] > doubledLength) {
                return HashTableRehashing.primeNumbers[i];
            }
        }
        throw new Error('Table trop grande');
    }

    probe(index) {
        if (index === this.table.length - 1) {
            return 0;
        } else {
            return index + 1;
        }
    }

    set(key, value = null) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            // Si la position est une tombe (null) ou n'est pas occupée (undefined)
            // alors on peut ajouter l'élément :
            if (!this.table[position]) {
                this.table[position] = { key, value: value ?? key };
                this.size++;
                if (this.size / this.table.length > this.MAX_LOAD_FACTOR) {
                    this.rehash();
                }
                return;
                // Si la position est occupée par l'élément à ajouter
                // on met à jour la valeur :
            } else if (this.table[position]?.key === key) {
                this.table[position].value = value;
                return;
            }
            position = this.probe(position);
            i++;
        }
        throw new Error('La table est pleine');
    }

    get(key) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            if (this.table[position]?.key === key) {
                return this.table[position].value;
            } else if (this.table[position] === undefined) {
                return null;
            }
            position = this.probe(position);
            i++;
        }
        return null;
    }

    delete(key) {
        const index = this.hash(key);
        let position = index;
        let i = 0;
        while (i < this.table.length) {
            if (this.table[position]?.key === key) {
                // On met une tombe à la place de l'élément à supprimer :
                this.table[position] = null;
                this.size--;
                return;
            } else if (this.table[position] === undefined) {
                return;
            }
            position = this.probe(position);
            i++;
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}