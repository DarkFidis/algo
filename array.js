export class StaticArray {
    constructor() {
        this.value = new Array(0);
    }
    // Equivalent de unshift()
    // Complexité : O(n)
    insertAtBeginning(item) {
        // Créer un nouvel array
        const newArray = new Array(this.value.length + 1);
        // Insérer l'item à l'index 0
        newArray[0] = item;
        // Insérer les items du tableau d'origine après, c-à-d à leur index d'origine + 1
        for (let i = 0; i < this.value.length; i++) {
            newArray[i + 1] = this.value[i];
        }
        this.value = newArray;
    }

    // Equivalent de push()
    // Complexité : O(n)
    insertAtEnd(item) {
        // Créer un nouveau tableau avec une longueur + 1
        const newArray = new Array(this.value.length + 1);
        // Insérer les items du tableau d'origine
        let i = 0;
        while (i < this.value.length) {
            newArray[i] = this.value[i];
            i++;
        }
        // Insérer l'item cible au dernier index connu
        newArray[i] = item;
        this.value = newArray;
    }

    insertAtIndex(item, position) {
        if (position > this.value.length || position < 0) {
            throw new Error('Position invalide');
        } else {
            // Créer un nouveau tableau avec une longueur + 1
            const newArray = new Array(this.value.length + 1);
            for (let i = 0; i < this.value.length + 1; i++) {
                if (i === position) {
                    // Si l'index correspond à celui demandé, insérer l'item cible
                    newArray[i] = item;
                } else if (i < position) {
                    // Si l'index est inférieur à l'index cible, insérer l'item initialement présent à l'index courant
                    newArray[i] = this.value[i];
                } else {
                    // Si l'index est supérieur à l'index cible, cela signifie que l'index des items d'origine est décalé de 1, donc insérer l'item initialement présent à l'index courant - 1
                    newArray[i] = this.value[i - 1];
                }
            }
            this.value = newArray;
        }
    }

    // Equivalent de shift()
    // Complexité : 0(n)
    removeAtBeginning() {
        if (this.value.length === 0) {
            return;
        } else {
            // Créer un nouvel array avec longueur d'origine - 1
            const newArray = new Array(this.value.length - 1);
            // Insérer les items d'origine en commençant par l'index 1
            for (let i = 1; i < this.value.length; i++) {
                newArray[i - 1] = this.value[i];
            }
            this.value = newArray;
        }
    }

    // Equivalent de pop()
    // Complexité : O(n)
    removeAtEnd() {
        if (this.value.length === 0) {
            return;
        } else {
            // Créer un nouvel array avec longueur d'origine - 1
            const newArray = new Array(this.value.length - 1);
            // Insérer les items d'origine en s'arrêtant à length - 2
            for (let i = 0; i < this.value.length - 1; i++) {
                newArray[i] = this.value[i];
            }
            this.value = newArray;
        }
    }

    removeAtIndex(index) {
        if (index < 0 || index >= this.value.length) {
            throw new Error('Index invalide');
        } else {
            const newArray = new Array(this.value.length - 1);
            for (let i = 0; i < this.value.length; i++) {
                if (i < index) {
                    newArray[i] = this.value[i];
                } else if (i > index) {
                    newArray[i - 1] = this.value[i];
                }
            }
            this.value = newArray;
        }
    }
}