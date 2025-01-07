const [a, b, c] = [[], [], []]

function initHanoi(n) {
    while (n > 0) {
        a.push(n);
        n--;
    }
}

function solveHanoi(n, source, auxiliaire, destination) {
    if (n > 0) {
        solveHanoi(n - 1, source, destination, auxiliaire);
        destination.push(source.pop());
        console.log(a, b, c);
        solveHanoi(n - 1, auxiliaire, source, destination);
    }
}

const n = 3; // Nombre de disques
initHanoi(n);
solveHanoi(n, a, b, c);