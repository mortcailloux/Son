/*
async function change_effects(){
    var volume,vinyle;
    [volume,vinyle]=read_data();

}


function read_data(){
    var volume=document.getElementById("volume").value;
    var vinyle=document.getElementById("effet-vinyle").value;
    return [volume,vinyle]

}

function main(){
    setTimeout(change_effects,150);
}

main() */

const serv_port=80;

async function envoyerParam(parametre,valeur){
    const com = document.getElementById("COM").value;
    console.log("envoi des parametres");
    console.log(parametre);
    console.log(valeur);
    if (!com) { //on ne veut pas faire de bug s'il n'y a pas de port com
        alert("Veuillez entrer un port COM !");
        return;
    }
    try {
        let reponse=await fetch(`http://localhost:${serv_port}/set`,{method:"POST",
         headers:{"Content-Type": "application/json" },
         body: JSON.stringify({ param: parametre, value: valeur })});
        let retour=await reponse.text();
        console.log(retour); //pour le débuguage
    }
    catch (error){
        console.error("erreur envoi paramètres:", error);
    }
}

async function init(port) {
    try{

    
    let reponse=await fetch(`http://localhost:${serv_port}/init`,{method:"POST",
    headers:{"Content-Type": "application/json" },
    body: JSON.stringify({ com: port })
    });
    let retour=reponse.text();
    console.log(retour);
    }
    catch (error){
        console.error("erreur initialisation:",error);
    }    
}
