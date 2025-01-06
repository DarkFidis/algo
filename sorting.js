export const generateArrayOfRandomNumbers = (length, max) =>
    Array(length)
        .fill()
        .map(() => Math.round(Math.random() * max));

// Complexité : 0(n^2)
export function selectingSort(array) {
    let n = array.length;

    // On parcourt tout le tableau sauf le dernier élément
    // car il sera forcément trié lorsque nous aurons trié l'avant-dernier élément
    for (let i = 0; i < n - 1; i++) {
        // Nous sauvegardons l'index du plus petit élément :
        let minIndex = i;
        // Nous parcourons la partie du tableau pas encore triée :
        for (let j = i + 1; j < n; j++) {
            // Nous récupérons l'index de l'élément le plus petit :
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        // Si l'index de l'élément le plus petit est égal à l'itération en cours
        // nous n'avons pas à faire d'échanges (swap)
        if (minIndex != i) {
            // Sinon on fait un échange entre le plus petit élément et l'emplacement
            // correspondant à l'itération en cours :
            let tmp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = tmp;
        }
    }
    return array;
}

// Complexité : 0(n^2)
export function insertingSort(array) {
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i;
        while (j > 0 && current < v[j - 1]) {
            array[j] = array[j - 1];
            j--;
        }
        array[j] = current;
    }
    return array;
}

const randomNumbersArray = generateArrayOfRandomNumbers(20, 200)

const sortedByInsertArray = insertingSort(randomNumbersArray);
console.log({ sortedByInsertArray });

const sortedArray = selectingSort(randomNumbersArray);
console.log({ sortedArray });