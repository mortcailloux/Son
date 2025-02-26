code faust pour le son

Source principale: Digital audio antiquing - Signal processing methods for imitating the sound quality of historical recordings, VESA VÄLIMÄKI, SIRA GONZÁLEZ, OSSI KIMMELMA, JUKKA PARVIAINEN

"Dégradations" a implémenter pour un effet vinyle:
1. Dégradations globales
Réduction de la bande passante : Appliquer un filtre passe-bas (~15 kHz pour un LP).
Distorsion non linéaire : Utiliser une fonction de saturation comme tanh(x).
Ajout de bruit de fond (hiss) : Générer un bruit blanc filtré.
2. Dégradations localisées
Clicks & Pops : Générer des impulsions aléatoires d'amplitude et durée variées.


lancer le projet:
- aller dans inteface_graphique/back
- faire npm install
- npm start
- aller dans votre navigateur et aller sur le localhost, après vous aurez seulement besoin de suivre les instructions dessus.