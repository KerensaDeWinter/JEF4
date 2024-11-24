#include <Mouse.h>

#include <Keyboard.h>
#include <KeyboardLayout.h>
#include <Keyboard_da_DK.h>
#include <Keyboard_de_DE.h>
#include <Keyboard_es_ES.h>
#include <Keyboard_fr_FR.h>
#include <Keyboard_hu_HU.h>
#include <Keyboard_it_IT.h>
#include <Keyboard_pt_PT.h>
#include <Keyboard_sv_SE.h>


#include <Wire.h>                 // Must include Wire library for I2C
#include "SparkFun_MMA8452Q.h"    // Click here to get the library: http://librarymanager/All#SparkFun_MMA8452Q
// #include <ArduinoJson.h>
// #include <ArduinoJson.hpp>


MMA8452Q accel;                   // create instance of the MMA8452 class
const int knockSensor = A0;  // the piezo is connected to analog pin 0
const int threshold = 1;   // threshold value to decide when the detected sound is a knock or not


const byte piezoPin = A0;
int rawValue; // raw A/D readings
int piezoValue; // peak value
int finalValue; // smoothed final value

void setup() {
  // analogReference(INTERNAL); // remove this line if too sensitive
  Serial.begin(9600);
  Serial.println("MMA8452Q Basic Reading Code!");
  Wire.begin();

  if (accel.begin() == false) {
    Serial.println("Not Connected. Please check connections and read the hookup guide.");
    while (1);
  }
  Keyboard.begin();
  Mouse.begin(); // for accelero


  // while (!Serial) continue;
}

void loop() {
  piezo();
  // Mouse.move(accel.getCalculatedX(), 0, 0); // mouse move
  // if (accel.available()) {      // Wait for new data from accelerometer
  //   // Acceleration of x, y, and z directions in g units
  //   Serial.print(accel.getCalculatedX(), 3);
  //   Serial.print("\t");
  //   Serial.print(accel.getCalculatedY(), 3);
  //   Serial.print("\t");
  //   Serial.print(accel.getCalculatedZ(), 3);
  //   Serial.println();
  //   delay(1000);
  // }
  // if (Serial.available() > 0) {
  //   if (accel.available()) {
  //     String s = Serial.readStringUntil('\n');
  //     Serial.print("received: ");
  //     Serial.println(s);
  //   // todo: parse here
  //     int valueX = accel.getCalculatedX();
  //     int valueY = accel.getCalculatedY();
  //     int valueZ = accel.getCalculatedZ();
  //     DynamicJsonDocument doc(1024);
  //     doc["sensor"] = "gyro";
  //     doc["data"][0] = valueX;
  //     doc["data"][1] = valueY;
  //     doc["data"][2] = valueZ;
  //     serializeJson(doc, Serial);
  //     Serial.println();
  //     delay(100);
  //   }
   
  // }
}

void piezo() {
  for (int x = 0; x < 100; x++) {
    rawValue = analogRead(piezoPin); // 100 A/D readings
    if (rawValue > piezoValue) {
      piezoValue = rawValue; // store peaks
    }
  }
  if (finalValue < piezoValue) { // fast attack
    finalValue = piezoValue;
  }
  else {
    finalValue = (finalValue + piezoValue) / 2; // smooth decay
  }
  piezoValue = 0; // reset
  if (finalValue > 0) {
    Serial.println(finalValue); // print only if > 0
    Keyboard.press(97);
    Keyboard.release(97);

  }
}

