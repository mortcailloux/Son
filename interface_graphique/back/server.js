const express = require("express");
const SerialPort = require("serialport");
const cors = require("cors");

const app = express();
const port = 65535; 
app.use(cors());
app.use(express.json());
app.use(express.static("/app/public"));
app.get("/", (req, res) => {
    res.sendFile("/app/public/index.html");
});


global.serial = new SerialPort.SerialPort({ //les variables globales servent plus à rien maintenant
        path: `/dev/ttyS3`,
        baudRate: 115200,
        autoOpen: false
    });
global.serial.open((err) => {
        if (err) {
            console.error("Erreur d'ouverture du port :", err.message);
        } else {
            console.log(`Connexion série ouverte sur /dev/ttyS3`);
        }
    });






// Endpoint pour envoyer les paramètres au Teensy
app.post("/set", (req, res) => {
    const { param, value } = req.body;

    if (!param || value === undefined) {
        return res.status(400).send("Paramètre ou valeur manquante");
    }

    // Envoie la commande sous forme de texte : ex. "V50\n"
    let command = `${param}${Math.round(value)}\n`;

    global.serial.write(command, (err) => {
        if (err) {
            console.error("Erreur d'envoi :", err.message);
            return res.status(500).send("Échec de l'envoi");
        }
        console.log("Commande envoyée :", command);
        res.send("Commande envoyée : " + command);
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur Node.js en écoute sur http://localhost:${port}`);
});