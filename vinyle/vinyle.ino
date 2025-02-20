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
void setup() {
  AudioMemory(12);  
  audioShield.enable();
  audioShield.adcHighPassFilterDisable(); //enleve le filtre passe-haut present par defaut
  audioShield.lineInLevel(1); //reduit le gain d'entree
}

void loop() {
  int sensorValue = analogRead(A0);
  int sensorValue2 = analogRead(A1);
  

  inyle.setParamValue("effet vinyle",(0.001*sensorValue));
  inyle.setParamValue("saturation",0.01+(0.001*sensorValue));
  inyle.setParamValue("Mix Saturation",0.001*sensorValue);
  delay(50);
  audioShield.volume(0.001*sensorValue2);
}