const port_serv=80; //j'ai map le port 80 de l'hôte au port 65535 du conteneur, au moins je saurai qu'il faut pas faire ça la prochaine fois


async function envoyerParam(parametre,valeur){
    
    console.log("envoi des parametres");
    console.log(parametre);
    console.log(valeur);
    
    try {
        let reponse=await fetch(`http://host.docker.internal:${port_serv}/set`,{method:"POST",
         headers:{"Content-Type": "application/json" },
         body: JSON.stringify({ param: parametre, value: valeur })});
        let retour=await reponse.text();
        console.log(retour); //pour le débuguage
    }
    catch (error){
        console.error("erreur envoi paramètres:", error);
    }
}

