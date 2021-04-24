#include <Adafruit_GFX.h>
#include <Adafruit_SharpMem.h>
#include <pngle.h>

#define SHARP_SCK 2
#define SHARP_MOSI 14
#define SHARP_CS 15

Adafruit_SharpMem display(SHARP_SCK, SHARP_MOSI, SHARP_CS, 400, 240);

#define BLACK 0
#define WHITE 1

String currentFilename = "none";
uint8_t pngBuffer[1024 * 8];
size_t imageSize = 0;

void onDraw(pngle_t *pngle, uint32_t x, uint32_t y, uint32_t w, uint32_t h, uint8_t rgba[4])
{
  uint8_t r = rgba[0]; // 0 - 255
  // Serial.println("Drawing one pixel");
  if (r < 128)
  {
    display.drawPixel(x, y, BLACK);
  }
  else
  {
    display.drawPixel(x, y, WHITE);
  }

  // display.refresh();
}

void onInit(pngle_t *pngle, uint32_t w, uint32_t h)
{
  Serial.println("pngle init?");
}

void displayImageBuffer()
{
  Serial.println("Image due to be displayed");
  pngle_t *pngle = pngle_new();

  pngle_set_draw_callback(pngle, onDraw);
  pngle_set_init_callback(pngle, onInit);
  Serial.println();
  Serial.printf("image size %d", imageSize);
  Serial.println();
  int fed = pngle_feed(pngle, pngBuffer, imageSize);
  Serial.println(fed);
  pngle_destroy(pngle);
  display.refresh();
  Serial.println("Image displayed");
}

void pushToPNGDisplayBuffer(String fileName, uint8_t *data, size_t index, size_t len, bool final)
{
  size_t i = 0;
  while (i < len)
  {
    pngBuffer[index + i] = data[i];
    i++;
  }

  if (final)
  {
    imageSize = len + index;
    Serial.println("Image loaded I think");
    displayImageBuffer();
  }
}

void displaySetup(void)
{
  // start & clear the display
  display.begin();
  display.clearDisplay();
  display.setRotation(2);

  Serial.println("display setup complete");

  display.fillRect(0, 0, 400, 240, BLACK);
  display.refresh();
}
