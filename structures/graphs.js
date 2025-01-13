import {LinkedListQueue} from "./queues";
import {DynamicArrayStack} from "./stacks";

export class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
            this.adjacencyList.get(vertex1).push(vertex2);
            this.adjacencyList.get(vertex2).push(vertex1);
        }
    }

    removeEdge(vertex1, vertex2) {
        if (this.adjacencyList.has(vertex1) && this.adjacencyList.has(vertex2)) {
            this.adjacencyList.set(
                vertex1,
                this.adjacencyList.get(vertex1).filter(vertex => vertex !== vertex2)
            );
            this.adjacencyList.set(
                vertex2,
                this.adjacencyList.get(vertex2).filter(vertex => vertex !== vertex1)
            );
        }
    }

    removeVertex(vertex) {
        if (this.adjacencyList.has(vertex)) {
            this.adjacencyList.get(vertex).forEach(connectedVertex => {
                this.removeEdge(vertex, connectedVertex);
            });
            this.adjacencyList.delete(vertex);
        }
    }

    display() {
        for (let [vertex, edges] of this.adjacencyList.entries()) {
            console.log(vertex, '->', edges.join(', '));
        }
    }

    bfs(startingVertex) {
        const visited = new Set();
        const queue = new LinkedListQueue();

        queue.enqueue(startingVertex);

        while (!queue.isEmpty()) {
            const currentVertex = queue.dequeue();
            if (!visited.has(vertex)) {
                console.log(vertex);
                visited.add(vertex);

                const neighbors = this.adjacencyList.get(vertex);
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        queue.push(neighbor);
                    }
                }
            }
        }
    }
}

export function depthFirstSearch(graph, startingVertex) {
    const stack = new DynamicArrayStack();
    const visited = {};
    const result = [];

    stack.push(startingVertex);

    while (!stack.isEmpty()) {
        const currentVertex = stack.pop();
        if (!visited[currentVertex]) {
            result.push(currentVertex);
            visited[currentVertex] = true;
            for (const vertex of graph.adjacencyList[currentVertex]) {
                if (!visited[vertex[i]]) {
                    stack.push(vertex[i]);
                }
            }
        }
    }

    return result;
}

export function recursiveDepthFirstSearch(graph, startingVertex) {
    const visited = {};
    const result = [];

    function traverse(vertex) {
        if (!vertex) {
            return null;
        }
        visited[vertex] = true;
        result.push(vertex);
        for (const item of graph.adjacencyList[vertex]) {
            if (!item[i]) {
                return traverse(item[i]);
            }
        }
    }

    traverse(startingVertex);

    return result;
}

export function getConnectedComponents(graph) {
    const visited = {};
    const components = [];

    for (let vertex in graph.adjacencyList) {
        if (!visited[vertex]) {
            const component = depthFirstSearch(graph, +vertex); // Les clés sont des chaînes de caractères
            components.push(component);
            component.forEach((v) => (visited[v] = true));
        }
    }

    return components;
}

export class WeightedGraphAdjacencyList {
    constructor() {
        this.adjacencyList = {};
    }

    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
        this.adjacencyList[vertex2].push({ vertex: vertex1, weight });
    }

    addDirectedEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ vertex: vertex2, weight });
    }

    removeDirectedEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v.vertex !== vertex2
        );
    }

    removeEdge(vertex1, vertex2) {
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
            (v) => v.vertex !== vertex2
        );
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
            (v) => v.vertex !== vertex1
        );
    }

    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop().vertex;
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
}

export function shortestPathBfs(graph, startingVertex, endingVertex) {
    const queue = new LinkedListQueue();
    const visited = {};
    const previous = {}; // Pour construire le chemin

    queue.enqueue(startingVertex);
    visited[startingVertex] = true;

    while (!queue.isEmpty()) {
        const currentVertex = queue.dequeue();

        if (currentVertex === endingVertex) {
            const path = [endingVertex];
            let previousVertex = previous[endingVertex];
            while (previousVertex) {
                path.push(previousVertex);
                previousVertex = previous[previousVertex];
            }
            return path.reverse();
        }

        for (const neighbor of graph.adjacencyList[currentVertex]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                queue.enqueue(neighbor);
                previous[neighbor] = currentVertex;
            }
        }
    }
    // Aucun chemin trouvé
    return null;
}
