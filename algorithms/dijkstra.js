import {MinPriorityQueue} from "../structures/binary_heap";

export function dijkstraPriorityQueue(graph, startVertex, endVertex) {
    const distances = {};
    const previous = {}; // uniquement pour reconstruire le chemin
    const priorityQueue = new MinPriorityQueue();

    for (const vertex in graph.adjacencyList) {
        if (vertex === startVertex) {
            distances[vertex] = 0;
            priorityQueue.insert({ vertex, priority: 0 });
        } else {
            distances[vertex] = Infinity;
        }
    }

    while (!priorityQueue.isEmpty()) {
        const { vertex } = priorityQueue.extractMin();
        if (vertex === endVertex) {
            const path = [endVertex];
            let previousVertex = previous[endVertex];
            while (previousVertex) {
                path.push(previousVertex);
                previousVertex = previous[previousVertex];
            }
            return { path: path.reverse(), distance: distances[endVertex] };
        }
        for (const neighbor of graph.adjacencyList[vertex]) {
            const distance = distances[vertex] + neighbor.weight;
            if (distance < distances[neighbor.vertex]) {
                distances[neighbor.vertex] = distance;
                previous[neighbor.vertex] = vertex;
                priorityQueue.insert({ vertex: neighbor.vertex, priority: distance });
            }
        }
    }

    // Aucun chemin trouvé
    return null;
}