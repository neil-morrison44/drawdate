/*********
  Rui Santos
  Complete project details at https://RandomNerdTutorials.com/esp32-cam-video-streaming-web-server-camera-home-assistant/

  IMPORTANT!!!
   - Select Board "AI Thinker ESP32-CAM"
   - GPIO 0 must be connected to GND to upload a sketch
   - After connecting GPIO 0 to GND, press the ESP32-CAM on-board RESET button to put your board in flashing mode

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files.

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
*********/

#include <WiFi.h>
// #include "esp_timer.h"
// #include "img_converters.h"
#include "Arduino.h"
// #include "fb_gfx.h"
#include "soc/soc.h"          //disable brownout problems
#include "soc/rtc_cntl_reg.h" //disable brownout problems
// #include "esp_http_server.h"

#include "./otaUpdates.h"
#include "./secrets.h"
#include "./display.h"
#include "./httpServer.h"
#include "./camera.h"

void setup()
{
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); //disable brownout detector

  Serial.begin(115200);
  Serial.setDebugOutput(true);

  Serial.println("Hello");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");

  Serial.print("Preview Box Ready! Go to: http://");
  Serial.print(WiFi.localIP());

  setupOTA();
  // turn off red LED
  pinMode(33, OUTPUT);
  digitalWrite(33, LOW);
  // digitalWrite(4, HIGH);
  displaySetup();
  setupHttpServer();
  // setupCamera();
}

void loop()
{
  delay(1);
  runOTALoop();
}
