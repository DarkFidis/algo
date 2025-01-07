# Algo Basics

## Définitions

### Algorithme

Un algorithme est une série finie d'instructions visant à la résolution d'un problème.

### Pile (Stack)

Une pile est une structure de données basée sur le principe LIFO (__Last In, First Out__). Quand on ajoute un item à la pile, on *__empile__*. A l'inverse, quand
on supprime, on *__dépile__*.

### File (Queue)

Une pile est une structure de données basée sur le principe FIFO (__First In, First Out__). Quand on ajoute un item à la pile, on *__enfile__*. A l'inverse, quand
on supprime, on *__défile__*.

### Dictionnaires

Un dictionnaire est une structure composée de paires de key/value avec des keys uniques.

### Table de hachage

Une table de hachage reprend le concept de dictionnaire. Cette structure utilise une fonction pour calculer un index à partir de la key et stocker la valeur à l'index
obtenu. Cette fonction doit respecter certaines contraintes : 

- Doit retourner le même index pour la même clé
- Assure une distribution uniforme des clés, c-à-d éviter les collisions d'indexes.

> Une collision, c'est quand la fonction donne le même index pour deux keys différentes

Pour le calcul de l'index, deux solutions possibles : 

- Méthode par division : On calcule `key` modulo la longueur du tableau (ici `n`)

`hash(key) = key mod n`

- Méthode par multiplication : On multiplie `key` par une constante entre 0 et 1 et on ne garde que la partie entière du résultat. On multiplie ensuite ce résultat
par la longueur du tableau (`n`)

`hash(key) = Math.floor(n * (key * C mod 1))`



