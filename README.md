code faust pour le son

Source principale: Digital audio antiquing - Signal processing methods for imitating the sound quality of historical recordings, VESA VÄLIMÄKI, SIRA GONZÁLEZ, OSSI KIMMELMA, JUKKA PARVIAINEN

"Dégradations" a implémenter pour un effet vinyle:
1. Dégradations globales
Réduction de la bande passante : Appliquer un filtre passe-bas (~15 kHz pour un LP).
Distorsion non linéaire : Utiliser une fonction de saturation comme tanh(x).
Variation de pitch (Wow & Flutter) : Ajouter une modulation lente et une plus rapide sur la vitesse de lecture.
Ajout de bruit de fond (hiss) : Générer un bruit blanc filtré.
2. Dégradations localisées
Clicks & Pops : Générer des impulsions aléatoires d'amplitude et durée variées.
Thumps : Ajouter des basses fréquences résonantes lors de grosses rayures simulées.
3. Autres effets spécifiques
Simulation de réponse fréquentielle du haut-parleur de gramophone : Appliquer un filtre basé sur une réponse mesurée.
Conversion Stéréo → Mono : Moyenne des canaux.