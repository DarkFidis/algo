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

// Algorithme de tri-fusion
function mergeArrays(arr, left, middle, right) {
    const leftArrayLength = middle - left + 1;
    const rightArrayLength = right - middle;
    const leftArray = [];
    const rightArray = [];
    for (let i = 0; i < leftArrayLength; i++) {
        leftArray[i] = arr[left + i];
    }
    for (let i = 0; i < rightArrayLength; i++) {
        rightArray[i] = arr[middle + i + 1];
    }
    let leftIndex = 0;
    let rightIndex = 0;
    let indexToFill = left;

    while (leftIndex < leftArrayLength && rightIndex < rightArrayLength) {
        if (leftArray[leftIndex] < rightArray[rightIndex]) {
            arr[indexToFill] = leftArray[leftIndex];
            leftIndex++;
        } else {
            arr[indexToFill] = rightArray[rightIndex];
            rightIndex++;
        }
        indexToFill++;
    }
    while (leftIndex < leftArrayLength) {
        arr[indexToFill] = leftArray[leftIndex];
        leftIndex++;
        indexToFill++;
    }
    while (rightIndex < rightArrayLength) {
        arr[indexToFill] = rightArray[rightIndex];
        rightIndex++;
        indexToFill++;
    }
}

function mergeSort(arr, left = 0, right = arr.length - 1) {
    if (left >= right) {
        return;
    }
    const middle = Math.floor((left + right) / 2);
    mergeSort(arr, left, middle);
    mergeSort(arr, middle + 1, right);
    return mergeArrays(arr, left, middle, right);
}

const arr = [38, 27, 43, 3, 9, 82, 10];
mergeSort([38, 27, 43, 3, 9, 82, 10]);
console.log({arr});

// Algorithme de Quick-sort

function swap(arr, firstIndex, secondIndex) {
    if (firstIndex !== secondIndex) {
        const tmp = arr[secondIndex];
        arr[secondIndex] = arr[firstIndex];
        arr[firstIndex] = tmp;
    }
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, right);
    return i + 1;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
}

const arr = [2, 8, 7, 1, 3, 5, 6, 4];
quickSort(arr);
console.log(arr);

// Tri par comptage (Counting sort)

function get_max(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function countingSort(arr) {
    // Récupérer la plus grande valeur du tableau :
    const max = get_max(arr);

    // Créer un tableau de comptage de k + 1 éléments :
    const counts = new Array(max + 1);

    // Initialiser le tableau de comptage avec des 0 :
    for (let i = 0; i < counts.length; i++) {
        counts[i] = 0;
    }

    // Compter le nombre d'occurences de chaque item :
    for (let i = 0; i < arr.length; i++) {
        counts[arr[i]]++;
    }

    // Calculer la position de chaque item dans le tableau trié :
    for (let i = 1; i < counts.length; i++) {
        counts[i] += counts[i - 1];
    }

    // Créer le tableau de sortie :
    const sortedArr = new Array(arr.length);

    // Placer chaque élément dans le tableau de sortie :
    for (let i = arr.length - 1; i >= 0; i--) {
        const value = arr[i];
        const position = counts[value];
        sortedArr[position - 1] = value;
        counts[value]--;
    }
    return sortedArr;
}

const arr = [7, 5, 2, 4, 3, 9];
console.log({ countSort : countingSort(arr) });

// Optimisé pour JavaScript
// Les clés numériques sont triées de manière croissante depuis ES6
function countingSortESM(arr, n = arr.length) {
    const counts = {};

    for (let i = 0; i < n; i++) {
        counts[arr[i]] ??= 0; // Initialisation à 0 uniquement si null ou undefined
        counts[arr[i]]++; // Incrémentation
    }

    const sortedArr = [];
    for (const i in counts) {
        while (counts[i] > 0) {
            sortedArr.push(+i);
            counts[i]--;
        }
    }
    return sortedArr;
}

const arr = [7, 5, 2, 4, 3, 9, 3, 2, 1, 5, 6, 7, 9, 4, 1, 2, 3, 4, 5, 6, 7, 9];
console.log({ esmCountSort : countingSortESM(arr) });

// Tri radix

function radixSort(arr, base = 10) {
    if (arr.length < 2) {
        return arr;
    }
    const max = get_max(arr);

    for (let i = 1; max / i > 0; i *= base) {
        arr = countingSort(arr, base, i);
    }
    return arr;
}

const arr = [2, 1, 1, 23, 4, 0, 121, 5, 54, 1, 32, 5000];
console.log({ radix : radixSort(arr) });

// Tri par paquets

function getMinMax(arr) {
    let min = arr[0];
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return { min, max };
}

function bucketSort(arr) {
    const { min, max } = getMinMax(arr);
    const n = arr.length;
    const h = (max - min) / n;
    const buckets = [];
    for (let i = 0; i < n; i++) {
        buckets[i] = [];
    }
    for (let i = 0; i < n; i++) {
        let k = 0;
        while (min + h * (k + 1) < arr[i]) {
            k++;
        }
        buckets[k].push(arr[i]);
    }
    for (let i = 0; i < n; i++) {
        insertionSort(buckets[i]);
    }
    let result = [];
    for (let i = 0; i < n; i++) {
        result = result.concat(buckets[i]);
    }
    return result;
}