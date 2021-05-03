#include <Adafruit_GFX.h>
#include <Adafruit_SharpMem.h>
#include <pngle.h>

#define SHARP_SCK 2
#define SHARP_MOSI 14
#define SHARP_CS 15

Adafruit_SharpMem display(SHARP_SCK, SHARP_MOSI, SHARP_CS, 400, 240);

#define BLACK 0
#define WHITE 1

String currentFilename;
pngle_t *pngle = pngle_new();

void onDraw(pngle_t *pngle, uint32_t x, uint32_t y, uint32_t w, uint32_t h, uint8_t rgba[4])
{
  uint8_t r = rgba[0]; // 0 - 255
  if (r < 128)
  {
    display.drawPixel(x, y, BLACK);
  }
}

void pushToPNGDisplayBuffer(String fileName, uint8_t *data, size_t index, size_t len, bool final)
{

  if (index == 0)
  {
    display.clearDisplay();
    Serial.printf("\nFree Heap: %d\n", esp_get_free_heap_size());
    pngle = pngle_new();
    if (pngle)
    {
      Serial.println("I've got a pngle");
      pngle_set_draw_callback(pngle, onDraw);
    }
    else
    {
      Serial.println("I've not got a pngle!!!");
    }
  }

  Serial.println(len);

  int remainder = pngle_feed(pngle, data, len);
  // might need to worry about the remainder but it doesn't seem like it
  Serial.printf("\n Remainder: %d\n", remainder);

  if (final)
  {
    // imageSize = len + index;
    Serial.println("Image loaded I think");
    pngle_destroy(pngle);
    display.refresh();
  }
}

void displaySetup(void)
{
  // start & clear the display
  display.begin();
  display.clearDisplay();
  display.setRotation(2);

  Serial.println("\ndisplay setup complete\n");

  display.fillRect(0, 0, 400, 240, BLACK);
  display.refresh();
}
