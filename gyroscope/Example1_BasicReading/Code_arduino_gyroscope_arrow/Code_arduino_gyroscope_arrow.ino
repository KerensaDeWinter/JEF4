#include <MouseTo.h>

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

#include <Wire.h>
#include "SparkFun_MMA8452Q.h"

MMA8452Q accel;
int angle = 0;
int prevAngle = 0;
int middle = 720;
int end = 1440;
int counter = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("MMA8452Q Basic Reading Code!");
  Wire.begin();

  if (accel.begin() == false) {
    Serial.println("Not Connected. Please check connections and read the hookup guide.");
    while (1);
  }
  Mouse.begin();
  Keyboard.begin();
}

void loop() {
    angle = accel.getCalculatedX()*20;
    if (angle < -10) {
      angle = -10;
    } else if (angle > 10){
      angle = 10;
    } 

// angle groter dan 5 met arrow boven
    if (angle > 3) {
      Keyboard.release(KEY_LEFT_ARROW);
      Keyboard.release(KEY_UP_ARROW);
      Keyboard.release(KEY_RIGHT_ARROW);
      Keyboard.press(KEY_DOWN_ARROW);
    } else if (angle < -3) {
      Keyboard.release(KEY_LEFT_ARROW);
      Keyboard.release(KEY_DOWN_ARROW);
      Keyboard.release(KEY_RIGHT_ARROW);
      Keyboard.press(KEY_UP_ARROW);
    } else if (angle > 1){
      Keyboard.release(KEY_UP_ARROW);
      Keyboard.release(KEY_LEFT_ARROW);
      Keyboard.release(KEY_DOWN_ARROW);
      Keyboard.press(KEY_RIGHT_ARROW);
    } else if (angle < -1) {
      Keyboard.release(KEY_RIGHT_ARROW);
      Keyboard.release(KEY_UP_ARROW);
      Keyboard.release(KEY_DOWN_ARROW);
      Keyboard.press(KEY_LEFT_ARROW);
    } else {
      Keyboard.release(KEY_RIGHT_ARROW);
      Keyboard.release(KEY_DOWN_ARROW);
      Keyboard.release(KEY_LEFT_ARROW);
      Keyboard.release(KEY_RIGHT_ARROW);
    }

    int difference = angle-prevAngle;
    Serial.println(angle);
    // Serial.println(difference);


    // if (angle < -2 || angle > 2) {
      // if (abs(difference) > 0) {
      //   if (difference < 0) {
      //     for (int i = 1; i<= abs(difference); i++) {
      //       // Serial.println("rechts");
      //       Keyboard.press(KEY_RIGHT_ARROW);
      //       Keyboard.release(KEY_RIGHT_ARROW);
      //       // Serial.println(difference);
      //     }
      //   }
      //   else {
      //     for (int i = 1; i<= abs(difference); i++) {
      //       // Serial.println("links");
      //       Keyboard.press(KEY_LEFT_ARROW);
      //       Keyboard.release(KEY_LEFT_ARROW);
      //       // Serial.println(difference);
      //     }
      //   }
      // }
   

    if (abs(difference) > 0) {
      prevAngle = angle;
    }

    
    
  if (accel.available()) {      
    delay(100);
  }
}

