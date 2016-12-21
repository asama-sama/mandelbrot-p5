var p5 = require('p5');
var _ = require('lodash');

const MAX_ITERATIONS = 100;

window.setup = function() {
  createCanvas(640, 480);
  pixelDensity(1);
  colorMode(HSB, 1);
}

// must be on window for p5
window.draw = function() {
  loadPixels();
  
  for (var x=0; x<width; x++) {
    for (var y=0; y<height; y++) {

      var real = map(x, 0, width, -2.5, 2.5);
      var im = map(y, 0, height, -2.5, 2.5);

      var real_base = real;
      var im_base = im;

      var n = 0;
      while (n < MAX_ITERATIONS) {
        // f(z) = z^2 + c
        // c = a + bi
        // z^2 = (a+bi)(a+bi) = a^2-b^2+2abi
        var aa = real * real - im * im;
        var bb = 2 * real * im;
        // why doesn't this work on one line?
        real = aa + real_base; 
        im = bb + im_base;
        // console.log('real', real, 'im', im);
        if(real*real + im*im > 16) {
          // diverge to inf
          break;
        }
        n++;
      }

      var bright = map(n, 0, MAX_ITERATIONS, 0, 1);
      bright = map(sqrt(bright), 0, 1, 0, 255);

      var col;
      if(n === 100) {
        col = color(0);
      } else {
        col = color(sqrt(n/MAX_ITERATIONS), 255, 255);
      }

      var pix = (x + y * width) * 4;

      pixels[pix] = col.levels[0];
      pixels[pix + 1] = col.levels[1];
      pixels[pix + 2] = col.levels[2];
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}

