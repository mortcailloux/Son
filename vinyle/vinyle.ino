#include <Audio.h>
#include "vinyle.h"

vinyle inyle;

AudioInputI2S audioInput;
AudioOutputI2S out;


AudioControlSGTL5000 audioShield;
AudioConnection patchCord0(audioInput, 0, inyle, 0); // Envoie le signal gauche à Faust
AudioConnection patchCord1(audioInput, 1, inyle, 1); // Envoie le signal droit à Faust
AudioConnection patchCord2(inyle, 0, out, 0);        // Sortie gauche
AudioConnection patchCord3(inyle, 1, out, 1);        // Sortie droite
float effetVinyle = 0.5; // Valeur par défaut
float saturation = 0.5;  
float bsoft = 1.0;
float volume = 0.5;

void setup() {
  Serial.begin(115200);
  AudioMemory(12);  
  audioShield.enable();
  audioShield.adcHighPassFilterDisable(); //enleve le filtre passe-haut present par defaut
  audioShield.lineInLevel(1); //reduit le gain d'entree
}

void loop() {
  if (Serial.available()) {
          String input = Serial.readStringUntil('\n'); // Lire une ligne complète
          input.trim(); // Supprimer les espaces inutiles
          
          // Exemple de format attendu : "V50 S30 B20"
          char param = input.charAt(0);  // Premier caractère
          float value = input.substring(1).toFloat() / 100.0; // Convertir en float (0.0 - 1.0)
          if (param=='V'){
            effetVinyle = value;
            Serial.println("vinyle");
          }
          else{
            if (param=='S'){
              saturation = value;
              Serial.println("saturation");
            }
            else{
              if(param=='B'){
                bsoft = 1.0 + value;
                Serial.println("bsoft");
              }
              else if(param=='L'){
                volume = value;
                Serial.println("Volume");
              }
            }
          }
          
      }

      // Appliquer les paramètres
      inyle.setParamValue("effet vinyle", effetVinyle);
      inyle.setParamValue("saturation", saturation);
      inyle.setParamValue("bsoft", bsoft);
      audioShield.volume(volume);

      delay(50); // Petit délai pour éviter une surcharge
}