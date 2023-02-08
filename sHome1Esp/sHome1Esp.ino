#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>

#define WIFI_SSID "GA"
#define WIFI_PASSWORD "Ibrahem0122750"

#define FIREBASE_HOST "attendance-app-6977b-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "blw2NegKZaJ60pbyo6GVmYDCmUziYLa7n7Wzz1iD"

int lmp1 = 2;
int lmp2 = 3;
int tsh1 = 0;
int tsh2 = 1;
int lastInputState1 = 1;
int inputState1;
String lmpState1;
int lastInputState2 = 1;
int inputState2;
String lmpState2;

void setup() {
  pinMode(lmp1, OUTPUT);
  pinMode(lmp2, FUNCTION_3);
  pinMode(lmp2, OUTPUT);
  // pinMode(tsh1, FUNCTION_3);
  pinMode(tsh2, FUNCTION_3);
  pinMode(tsh1, INPUT);
  pinMode(tsh2, INPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
};

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    Firebase.setBool("conEsp", true);
    inputState1 = digitalRead(tsh1);
    inputState2 = digitalRead(tsh2);
    if (lastInputState1 == 0 && inputState1 == 1) {
      swt1();
    }
    if (lastInputState2 == 0 && inputState2 == 1) {
      swt2();
    }
    lastInputState1 = inputState1;
    lastInputState2 = inputState2;
    if (lmpState1 != Firebase.getString("l1")) {
      lamp1();
      lmpState1 = Firebase.getString("l1");
    }
    if (lmpState2 != Firebase.getString("l2")) {
      lamp2();
      lmpState2 = Firebase.getString("l2");
    }
  } else {
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
    }    
  }
};

void lamp1() {
  if (Firebase.getString("l1") == "HIGH") {
    digitalWrite(lmp1, HIGH);
  } else {
    digitalWrite(lmp1, LOW);
  };
};

void lamp2() {
  if (Firebase.getString("l2") == "HIGH") {
    digitalWrite(lmp2, HIGH);
  } else {
    digitalWrite(lmp2, LOW);
  };
};

void swt1() {
  if (digitalRead(lmp1) == HIGH) {
    Firebase.setString("l1", "LOW");
  } else {
    Firebase.setString("l1", "HIGH");
  };
};

void swt2() {
  if (digitalRead(lmp2) == HIGH) {
    Firebase.setString("l2", "LOW");
  } else {
    Firebase.setString("l2", "HIGH");
  };
};
