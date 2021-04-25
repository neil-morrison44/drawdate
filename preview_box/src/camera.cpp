#include <esp_camera.h>
#include <Arduino.h>
#include <WiFi.h>
#include "./secrets.h"

#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27

#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

#define FLASH_GPIO_NUM 4

const int freq = 5000;
const int ledChannel = LEDC_CHANNEL_6;

void setupCamera()
{
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if (psramFound())
  {
    config.frame_size = FRAMESIZE_UXGA;
    config.jpeg_quality = 10;
    config.fb_count = 1;
  }
  else
  {
    config.frame_size = FRAMESIZE_SVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
    Serial.printf("\n Camera init failed with error 0x%x\n", err);
    delay(1000);
    // ESP.restart();
    return;
  }

  // sensor_t *s = esp_camera_sensor_get();
  // s->set_brightness(s, -2);
  // s->set_exposure_ctrl(s, 1);
  // s->set_ae_level(s, 2);

  // pinMode(FLASH_GPIO_NUM, OUTPUT);
  ledcSetup(ledChannel, freq, 8);
  ledcAttachPin(FLASH_GPIO_NUM, ledChannel);
}

int takePictureAndUploadIt(String filename)
{
  // setupCamera();
  String getAll;
  String getBody;

  Serial.println("\n Camera capture...");
  ledcWrite(ledChannel, 16);
  vTaskDelay(50);
  camera_fb_t *fb = NULL;
  fb = esp_camera_fb_get();
  ledcWrite(ledChannel, 0);
  if (!fb)
  {
    Serial.println("\n Camera capture failed");
    // delay(1000);
    // ESP.restart();
    return -1;
  }

  Serial.println("Connecting to server: " + BUCKET_NAME);

  WiFiClient client;

  if (client.connect(BUCKET_NAME.c_str(), 80))
  {
    Serial.println("Connection successful!");

    String keyHead = "--FORM_BOUNDARY_HERE\r\nContent-Disposition: form-data; name=\"key\";\r\n";
    String keyTail = "${filename}";

    String head = "--FORM_BOUNDARY_HERE\r\nContent-Disposition: form-data; name=\"file\"; filename=\"esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--FORM_BOUNDARY_HERE--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length() + keyHead.length() + keyTail.length();
    uint32_t totalLen = imageLen + extraLen;

    client.println("POST / HTTP/1.1");
    client.println("Host: " + BUCKET_NAME);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=FORM_BOUNDARY_HERE");
    client.println("Referer: " + SECRET_REFERER);
    client.println();

    client.println(keyHead);
    client.println(keyTail);

    client.print(head);

    Serial.println("written head");

    size_t chunkSize = 1024;
    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n = 0; n < fbLen; n = n + chunkSize)
    {
      if (n + chunkSize < fbLen)
      {
        client.write(fbBuf, chunkSize);
        fbBuf += chunkSize;
      }
      else if (fbLen % chunkSize > 0)
      {
        size_t remainder = fbLen % chunkSize;
        client.write(fbBuf, remainder);
      }
    }
    Serial.println("Have written the data");
    client.print(tail);

    esp_camera_fb_return(fb);
    Serial.println("have returned the fb");

    int timeoutTimer = 3000;
    long startTimer = millis();
    boolean state = false;

    while ((startTimer + timeoutTimer) > millis())
    {
      Serial.print(".");
      vTaskDelay(100);
      while (client.available())
      {
        char c = client.read();
        if (c == '\n')
        {
          if (getAll.length() == 0)
          {
            state = true;
          }
          getAll = "";
        }
        else if (c != '\r')
        {
          getAll += String(c);
        }
        if (state == true)
        {
          getBody += String(c);
        }
        startTimer = millis();
      }
      if (getBody.length() > 0)
      {
        break;
      }
    }
    Serial.println();
    client.stop();
    Serial.println(getBody);
  }
  else
  {
    getBody = "Connection to " + BUCKET_NAME + " failed.";
    Serial.println(getBody);
  }

  Serial.println(getBody);
  return 1;
}
