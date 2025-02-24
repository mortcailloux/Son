#!/bin/sh
set -e

# Extraction du numéro de port COM à partir de l'environnement
COM_NUM=${COM_PORT:-4}
echo "Configuration du port COM${COM_NUM}..."

# Création d'un pont TCP vers le port COM
echo "Création d'un pont TCP vers le port COM hôte..."
socat pty,link=/dev/ttyS3,raw tcp:host.docker.internal:4562 &
SOCAT_PID=$!

# Attendre la création du port
sleep 1

# Vérifier si le fichier de périphérique existe
if [ -e "/dev/ttyS3" ]; then
    echo "Port série créé à /dev/ttyS3"
    chmod 666 /dev/ttyS3
else
    echo "ERREUR: Impossible de créer le port série /dev/ttyS3"
fi

# Démarrer le serveur Node.js
echo "Démarrage du serveur Node.js..."
node server.js &
NODE_PID=$!

# Fonction pour terminer proprement les processus
cleanup() {
    echo "Arrêt des services..."
    kill $SOCAT_PID
    kill $NODE_PID
    exit 0
}

# Intercepter les signaux de terminaison
trap cleanup SIGTERM SIGINT

# Attendre que les processus se terminent
wait