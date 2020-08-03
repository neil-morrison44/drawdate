# drawdate

A tool for creating 1 bit art for the PlayDate console

## How to use

- This was built with the iPad + Apple Pencil as the first target so that's the best experience
- You should Add to Home Screen and use from there since otherwise it'll zoom in / scroll when interacted with
- Exporting an image will export the drawing region & current pallet as well, so long as you don't put the .png file through anything that'll remove metadata you should be able to use it to save & resume / use the same palette for multiple images
- Draw within the top canvas in
- Undo will keep up to 100 changes

## Known Issues

- For some reason app refreshes once you've exported an image on iPad when added to home screen, so be sure to actually save the image before clicking "Done"

## Roadmap

- Allow exported images to be named
- Better support for non-Apple Pencil styluses / screensizes
- Add Masking tool to support the opacity channel (will allow creation of non-fullscreen assets)
- Add Masking support to palettes (e.g. allow transparent pixels)
- Add tool for doing dithering, similar to a "smudge" tool, will swap random pixels within the radius of your touch
- Support the opening of images from outside DrawDate & provide some greyscale transformation options
- Add a better way to save palettes
