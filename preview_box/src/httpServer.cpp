#include <ESPAsyncWebServer.h>
#include <display.h>
// #include "./camera.h"

AsyncWebServer server(80);

// void takeImageTask(void *parameter)
// {
//   takePictureAndUploadIt("hello.jpg");
//   vTaskDelete(NULL);
// }

void handleUpload(AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final)
{

  // if (!index)
  // {
  //   Serial.println();
  //   Serial.printf("UploadStart: %s\n", filename.c_str());
  // }
  // Serial.println();
  // Serial.printf("len: %d, index: %d", len, index);
  if (final)
  {
    Serial.println();
    Serial.printf("UploadEnd: %s, %u B\n", filename.c_str(), index + len);
    Serial.println();
  }

  pushToPNGDisplayBuffer(filename, data, index, len, final);
  if (final)
  {
    Serial.println("about to create task...");
    // takePictureAndUploadIt("hello.jpg");
    // xTaskCreate(
    //     takeImageTask,
    //     "takeImageTask",
    //     10000,
    //     NULL,
    //     1,
    //     NULL);
  }
}

void setupHttpServer()
{
  server.on(
      "/upload", HTTP_POST, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "well I'm getting it?");
      },
      &handleUpload);

  server.begin();
};
