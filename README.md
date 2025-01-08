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

### Arbre

Un arbre est une structure non-linéaire caractérisée par : 

- Un noeud racine, c-à-d sans parent
- Chaque noeud peut être connecté à un ou plusieurs autres noeuds mais n'a qu'un seul noeud parent
- Les __feuilles__ désignent les noeuds sans enfants
- Les noeuds ayant le même parent sont __frères__
- La profondeur d'un noeud est le nombre de connexions qui le sépare du noeud racine
- La hauteur d'un arbre est la distance entre le noeud racine et le noeud le plus profond

L'exemple d'arbre le plus connu est le DOM.

#### Arbre binaire

Un arbre binaire est un arbre ou les noeuds ont 2 enfants maximum. L'exemple le plus connu est l'arbre binaire de recherche dans lequel chaque noeud a une clé telle
que : 

- Chaque noeud situé dans la partie gauche de l'arbre a une clé inférieure ou égale au noeud parent
- Chaque noeud situé dans la partie droite de l'arbre a une clé supérieure ou égale au noeud parent

#### Arbre AVL

Dans un arbre AVL, chaque noeud doit avoir des sous-arbres de taille égale ou différent de 1



