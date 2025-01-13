const matrixSize = [3, 4];
const matrix = [];

// 0 bloc / 1 sommet
for (let i = 0; i < matrixSize[0]; i++) {
    matrix[i] = [];
    for (let j = 0; j < matrixSize[1]; j++) {
        matrix[i][j] = 1;
    }
}

matrix[0][2] = 0;
matrix[2][2] = 0;

matrix[startingVertex[0]][startingVertex[1]] = 4;
matrix[endingVertex[0]][endingVertex[1]] = 5;

function getManhattanDistance(x, y, endingVertex) {
    return Math.abs(x - endingVertex[0]) + Math.abs(y - endingVertex[1]);
}

function getAdjacencyVertices(x, y, matrice, matriceSize) {
    const adjacencyVertices = [];
    // north
    if (y > 0 && matrice[x][y - 1] !== 0) {
        adjacencyVertices.push([x, y - 1]);
    }
    // west
    if (x > 0 && matrice[x - 1][y] !== 0) {
        adjacencyVertices.push([x - 1, y]);
    }
    // south
    if (y < matriceSize[1] - 1 && matrice[x][y + 1] !== 0) {
        adjacencyVertices.push([x, y + 1]);
    }
    // east
    if (x < matriceSize[0] - 1 && matrice[x + 1][y] !== 0) {
        adjacencyVertices.push([x + 1, y]);
    }
    return adjacencyVertices;
}

// [1, 1] =>  `1-1`
//  [[], []]     [x, y]      [x , y]         [x, y]
export async function astar(
    matrice,
    matriceSize,
    startingVertex,
    endingVertex
) {
    const dist = {};
    const prev = {};
    const heap = new MinPriorityQueue();
    const score = {};

    for (let i = 0; i < matriceSize[0]; i++) {
        for (let j = 0; j < matriceSize[1]; j++) {
            const vertexName = `${i}-${j}`;
            score[vertexName] = getManhattanDistance(i, j, endingVertex);
            prev[vertexName] = null;
            if (i === startingVertex[0] && j === startingVertex[1]) {
                dist[vertexName] = 0;
                heap.insert({ vertex: [i, j], priority: score[vertexName] });
            } else {
                dist[vertexName] = Infinity;
            }
        }
    }

    while (!heap.isEmpty()) {
        const { vertex: currentVertex } = heap.extractmin();
        if (
            currentVertex[0] === endingVertex[0] &&
            currentVertex[1] === endingVertex[1]
        ) {
            const path = [`${endingVertex[0]}-${endingVertex[1]}`];
            let prevVertex = prev[`${endingVertex[0]}-${endingVertex[1]}`];
            while (prevVertex) {
                path.push(prevVertex);
                prevVertex = prev[prevVertex];
            }
            return path.reverse();
        } else {
            const currentVertexName = `${currentVertex[0]}-${currentVertex[1]}`;
            const distance = dist[currentVertexName] + 1;
            for (let adjacencyVertex of getAdjacencyVertices(
                currentVertex[0],
                currentVertex[1],
                matrice,
                matriceSize
            )) {
                const adjacencyVertexName = `${adjacencyVertex[0]}-${adjacencyVertex[1]}`;
                if (dist[adjacencyVertexName] > distance) {
                    dist[adjacencyVertexName] = distance;
                    prev[adjacencyVertexName] = currentVertexName;
                    score[adjacencyVertexName] =
                        distance +
                        getManhattanDistance(
                            adjacencyVertex[0],
                            adjacencyVertex[1],
                            endingVertex
                        );
                    heap.insert({
                        vertex: adjacencyVertex,
                        priority: score[adjacencyVertexName],
                    });
                }
            }
        }
    }
}

astar(
    matrix,
    matrixSize,
    [1,1],
    [2,3]
);