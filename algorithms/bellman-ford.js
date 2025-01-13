export function bellmanFord(graph, startVertex) {
    const distances = {};
    const previousVertices = {};

    for (const vertex in graph.adjacencyList) {
        previousVertices[vertex] = null;
        if (vertex !== startVertex) {
            distances[vertex] = Infinity;
        } else {
            distances[vertex] = 0;
        }
    }

    // On itère V - 1 fois
    for (
        let iteration = 0;
        iteration < Object.keys(graph.adjacencyList).length - 1;
        iteration += 1
    ) {
        for (const vertex in graph.adjacencyList) {
            for (const neighbor of graph.adjacencyList[vertex]) {
                const distance = distances[vertex] + neighbor.weight;
                if (distance < distances[neighbor.vertex]) {
                    distances[neighbor.vertex] = distance;
                    previousVertices[neighbor.vertex] = vertex;
                }
            }
        }
    }

    for (const vertex in graph.adjacencyList) {
        for (const neighbor of graph.adjacencyList[vertex]) {
            const distance = distances[vertex] + neighbor.weight;
            if (distance < distances[neighbor.vertex]) {
                throw new Error('Graph contains a negative weight cycle');
            }
        }
    }

    return {
        distances,
        previousVertices,
    };
}