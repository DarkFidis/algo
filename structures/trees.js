import {LinkedListQueue} from "./queues";

export class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

export default class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(key) {
        const newNode = new TreeNode(key);
        let current = this.root;
        let parent = null;
        while (current !== null) {
            parent = current;
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        if (parent === null) {
            this.root = newNode;
        } else if (key < parent.key) {
            parent.left = newNode;
        } else if (key > parent.key) {
            parent.right = newNode;
        }
    }

    search(searchedKey) {
        let current = this.root;
        while (current !== null && current.key !== searchedKey) {
            if (searchedKey < current.key) {
                // Si la clé courante est plus grande que la clé cible, on va à gauche
                current = current.left;
            } else {
                // Si la clé courante est plus petite que la clé cible, on va à droite
                current = current.right;
            }
        }
        return current;
    }

    min() {
        let current = this.root;
        // Pour trouver la valeur la plus petite, on va toujours à gauche dans l'arbre
        while (current.left !== null) {
            current = current.left;
        }
        return current.key;
    }

    minfrom(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    max() {
        let current = this.root;
        // Pour trouver la valeur la plus grande, on va toujours à droite dans l'arbre
        while (current.right !== null) {
            current = current.right;
        }
        return current.key;
    }

    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }

    deleteNode(node, key) {
        if (!node) {
            node = null;
        } else if (key > node.key) {
            node.right = this.deleteNode(node.right, key);
        } else if (key < node.key) {
            node.left = this.deleteNode(node.left, key);
        } else {
            if (!node.left && !node.right) {
                node = null;
            } else if (!node.left) {
                node = node.right;
            } else if (!node.right) {
                node = node.left;
            } else {
                const minNode = this.minfrom(node.right);
                node.key = minNode.key;
                node.right = this.deleteNode(node.right, minNode.key);
            }
        }
        return node;
    }

    isEmpty() {
        return this.root === null;
    }

    // Parcours de l'arbre en profondeur
    preOrderTreeWalk(node) {
        if (node !== null) {
            console.log(node.key);
            this.preOrderTreeWalk(node.left);
            this.preOrderTreeWalk(node.right);
        }
    }

    // Récupérer les valeurs dans l'ordre croissant
    inOrderTreeWalk(node) {
        if (node !== null) {
            this.inOrderTreeWalk(node.left);
            console.log(node.key);
            this.inOrderTreeWalk(node.right);
        }
    }

    postOrderTreeWalk(node) {
        if (node !== null) {
            this.postOrderTreeWalk(node.left);
            this.postOrderTreeWalk(node.right);
            console.log(node.key);
        }
    }

    // Parcours de l'arbre en largeur
    levelOrderTraversal() {
        const queue = new LinkedListQueue();
        queue.enqueue(this.root);
        while (!queue.isEmpty()) {
            const current = queue.dequeue();
            console.log(current.key);
            if (current.left !== null) {
                queue.enqueue(current.left);
            }
            if (current.right !== null) {
                queue.enqueue(current.right);
            }
        }
    }
}

export class AVLTree {
    constructor() {
        this.root = null;
    }

    insertNode(node, key) {
        if (node === null) {
            return new TreeNode(key);
        } else if (key < node.key) {
            node.left = this.insertNode(node.left, key);
        } else if (key > node.key) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }
        return node;
    }

    insert(key) {
        this.root = this.insertNode(this.root, key);
    }

    getMinNode(node) {
        let current = node;
        while (current.left !== null) {
            current = current.left;
        }
        return current;
    }

    deleteNode(root, key) {
        if (root == null) {
            return root;
        }
        if (key < root.key) {
            root.left = this.deleteNode(root.left, key);
        } else if (key > root.key) {
            root.right = this.deleteNode(root.right, key);
        } else {
            if (root.left === null || root.right === null) {
                let temp = null;
                if (temp == root.left) {
                    temp = root.right;
                } else {
                    temp = root.left;
                }

                if (temp == null) {
                    temp = root;
                    root = null;
                } else {
                    root = temp;
                }
            } else {
                const minNode = this.getMinNode(root.right);
                root.key = minNode.key;
                root.right = this.deleteNode(root.right, minNode.key);
            }
        }
        if (root == null) {
            return root;
        }
        return root;
    }

    delete(key) {
        this.root = this.deleteNode(this.root, key);
    }

    getNodeHeight(node) {
        if (node === null) {
            return 0;
        }
        return node.height;
    }

    getBalanceFactor(node) {
        return this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    }

    setNodeHeight(node) {
        node.height =
            Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
            1;
    }

    // Rotation gauche
// T1, T2, T3 sont les sous-arbres
//         x                               y
//        / \      Rotation gauche (y)    /  \
//       T1  y    - - - - - - - - ->     x    T3
//          / \   <- - - - - - - - -    /  \
//        T2  T3   Rotation droite (x) T1   T2
    leftRotate(x) {
        const y = x.right;
        const T2 = y.left;
        y.left = x;
        x.right = T2;
        this.setNodeHeight(x);
        this.setNodeHeight(y);
        return y;
    }

// Rotation droite
// T1, T2, T3 sont les sous-arbres
//         y                               x
//        / \     Rotation droite (x)     /  \
//       x   T3   - - - - - - - - ->     T1   y
//      / \       <- - - - - - - - -         / \
//     T1  T2     Rotation gauche (y)       T2  T3
    rightRotate(y) {
        const x = y.left;
        const T2 = x.right;
        x.right = y;
        y.left = T2;
        this.setNodeHeight(y);
        this.setNodeHeight(x);
        return x;
    }

    balanceNode(node) {
        const balanceFactor = this.getBalanceFactor(node);
        if (balanceFactor > 1) {
            // Gauche gauche ou gauche droite
            if (this.getBalanceFactor(node.left) >= 0) {
                // gauche gauche
                return this.rightRotate(node);
            } else {
                // gauche droite
                node.left = this.leftRotate(node.left);
                return this.rightRotate(node);
            }
        } else if (balanceFactor < -1) {
            // Droite droite ou droite gauche
            if (this.getBalanceFactor(node.right) <= 0) {
                // droite droite
                return this.leftRotate(node);
            } else {
                // droite gauche
                node.right = this.rightRotate(node.right);
                return this.leftRotate(node);
            }
        }
        return node;
    }
}

// Arbre rouge & noir
export class RBNode {
    constructor(key, color = 'red') {
        this.key = key;
        this.left = null;
        this.right = null;
        this.parent = null;
        this.color = color;
    }
}

export class RBTree {
    constructor() {
        this.NilNode = new RBNode(null, 'black');
        this.root = this.NilNode;
    }

    insert(key) {
        let current = this.root;
        let parent = this.NilNode;
        const newNode = new RBNode(key, 'red');

        while (current !== this.NilNode) {
            parent = current;
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                return;
            }
        }
        newNode.parent = parent;
        if (parent === this.NilNode) {
            newNode.color = 'black';
            this.root = newNode;
        } else if (parent.key > newNode.key) {
            parent.left = newNode;
        } else {
            parent.right = newNode;
        }
        newNode.left = this.NilNode;
        newNode.right = this.NilNode;
        this.insertFix(newNode);
    }

    insertFix(node) {
        let parent = node.parent;
        while (parent.color === 'red') {
            let grandParent = parent.parent;
            let uncle = this.getUncle(node);
            if (uncle.color === 'red') {
                uncle.color = 'black';
                parent.color = 'black';
                if (grandParent !== this.root) {
                    grandParent.color = 'red';
                    node = grandParent;
                    parent = node.parent;
                }
            } else {
                let nodeToRecolor = parent;
                if (parent === grandParent.left) {
                    if (node === parent.left) {
                        // rotation gauche gauche
                        this.rotateRight(grandParent);
                    } else {
                        // rotation gauche droite
                        this.rotateLeft(parent);
                        this.rotateRight(grandParent);
                        nodeToRecolor = node;
                    }
                } else {
                    if (node === parent.right) {
                        // rotation droite droite
                        this.rotateLeft(grandParent);
                    } else {
                        // droite gauche
                        this.rotateRight(parent);
                        this.rotateLeft(grandParent);
                        nodeToRecolor = node;
                    }
                }
                grandParent.color = 'red';
                nodeToRecolor.color = 'black';
                return;
            }
        }
    }

    rotateLeft(x) {
        const parent = x.parent;
        const y = x.right;
        x.right = y.left;
        if (y.left !== this.NilNode) {
            x.right.parent = x;
        }
        if (parent === this.NilNode) {
            this.root = y;
        } else if (parent.left === x) {
            parent.left = y;
        } else {
            parent.right = y;
        }
        y.parent = parent;
        x.parent = y;
        y.left = x;
    }

    rotateRight(x) {
        const parent = x.parent;
        const y = x.left;
        x.left = y.right;
        if (y.right !== this.NilNode) {
            x.left.parent = x;
        }
        if (parent === this.NilNode) {
            this.root = y;
        } else if (parent.left === x) {
            parent.left = y;
        } else {
            parent.right = y;
        }
        y.parent = parent;
        x.parent = y;
        y.right = x;
    }

    getUncle(node) {
        const parent = node.parent;
        const grandParent = parent.parent;
        if (parent === grandParent.left) {
            return grandParent.right;
        } else {
            return grandParent.left;
        }
    }

    search(key) {
        let current = this.root;
        while (current !== this.NilNode) {
            if (key < current.key) {
                current = current.left;
            } else if (key > current.key) {
                current = current.right;
            } else {
                return current;
            }
        }
        return null;
    }

    deleteNodeFromParent(node) {
        if (node.parent === this.NilNode) {
            this.root = this.NilNode;
        } else if (node.parent.left === node) {
            node.parent.left = this.NilNode;
        } else {
            node.parent.right = this.NilNode;
        }
    }

    minFromNode(node) {
        while (node.left !== this.NilNode) {
            node = node.left;
        }
        return node;
    }

    delete(key) {
        const node = this.search(key);
        if (!node) {
            return null;
        } else {
            let nodeToDelete = node;
            while (
                nodeToDelete.left !== this.NilNode ||
                nodeToDelete.right !== this.NilNode
                ) {
                if (nodeToDelete.left === this.NilNode) {
                    nodeToDelete.key = nodeToDelete.right.key;
                    nodeToDelete = nodeToDelete.right;
                } else if (nodeToDelete.right === this.NilNode) {
                    nodeToDelete.key = nodeToDelete.left.key;
                    nodeToDelete = nodeToDelete.left;
                } else {
                    let minNodeFromRight = this.minFromNode(nodeToDelete.right);
                    nodeToDelete.key = minNodeFromRight.key;
                    nodeToDelete = minNodeFromRight;
                }
            }
            if (nodeToDelete.color === 'black') {
                this.insertFixDelete(nodeToDelete);
            }
            this.deleteNodeFromParent(nodeToDelete);
        }
    }

    getSibling(node) {
        if (node.parent.left === node) {
            return node.parent.right;
        } else {
            return node.parent.left;
        }
    }

    getFarSiblingSon(node) {
        if (node.parent.left === node) {
            return node.parent.right.right;
        } else {
            return node.parent.left.left;
        }
    }

    getCloseSiblingSon(node) {
        if (node.parent.left === node) {
            return node.parent.right.left;
        } else {
            return node.parent.left.right;
        }
    }

    insertFixDelete(nodeToDelete) {
        if (nodeToDelete === this.root) {
            // cas a
            return;
        } else {
            let sibling = this.getSibling(nodeToDelete);
            let parent = nodeToDelete.parent;
            if (
                sibling.color === 'black' &&
                sibling.left.color === 'black' &&
                sibling.right.color === 'black'
            ) {
                // cas b
                sibling.color = 'red';
                if (parent.color === 'red') {
                    parent.color = 'black';
                } else {
                    this.insertFixDelete(parent);
                }
            } else if (sibling.color === 'red') {
                // cas c
                parent.color = 'red';
                sibling.color = 'black';
                if (parent.left === nodeToDelete) {
                    this.rotateLeft(parent);
                } else {
                    this.rotateRight(parent);
                }
                this.insertFixDelete(nodeToDelete);
            } else {
                let farSiblingSon = this.getFarSiblingSon(nodeToDelete);
                if (farSiblingSon.color === 'black') {
                    // cas d
                    const closeSiblingSon = this.getCloseSiblingSon(nodeToDelete);
                    closeSiblingSon.color = 'black';
                    sibling.color = 'red';
                    if (nodeToDelete === parent.left) {
                        this.rotateRight(sibling);
                    } else {
                        this.rotateLeft(sibling);
                    }
                }
                // cas e
                sibling = this.getSibling(nodeToDelete);
                farSiblingSon = this.getFarSiblingSon(nodeToDelete);
                sibling.color = parent.color;
                farSiblingSon.color = 'black';
                parent.color = 'black';
                if (nodeToDelete === parent.left) {
                    this.rotateLeft(parent);
                } else {
                    this.rotateRight(parent);
                }
            }
        }
    }
}
