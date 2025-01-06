export function factorielle(nb) {
    return nb > 1 ? nb * factorielle(nb - 1) : 1
}