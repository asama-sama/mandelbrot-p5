var p5 = require('p5');
var _ = require('lodash');

const MAX_ITERATIONS = 100;
var data = [];

var minSlider; 

const MAX_WIDTH = 1.5, MAX_HEIGHT = 2.5, MIN_WIDTH = -2.5, MIN_HEIGHT = -2.5;
var maxWidth = MAX_WIDTH,
  maxHeight = MAX_HEIGHT,
  minWidth = MIN_WIDTH,
  minHeight = MIN_HEIGHT;

window.setup = function() {
  createCanvas(320, 240);
  pixelDensity(1);
  colorMode(HSB, 1);

  calcMandelbrot(maxWidth, minWidth, maxHeight, minHeight);
}

// must be on window for p5
window.draw = function() {
  drawMandelbrot();
  if(updateZoom()) {
    // calcMandelbrot();
  }
}

const drawMandelbrot = function() {
  var index = 0;
  loadPixels();
  while(index < data.length){
    var n = data[index];
    // console.log('n', n)
    if(n === MAX_ITERATIONS) {
      col = color(0);
    } else {
      col = color(Math.sqrt(n/MAX_ITERATIONS), 255, 255);
    }
  
    var pix = index * 4;
  
    pixels[pix] = col.levels[0];
    pixels[pix + 1] = col.levels[1];
    pixels[pix + 2] = col.levels[2];
    pixels[pix + 3] = 255;
  
    index++;
  }
  updatePixels();
  console.log('draw');
}

const calcMandelbrot = function(maxW, minW, maxH, minH) {
  var calculations = 0;
  data = [];
  for (var y=0; y<height; y++) {
    for (var x=0; x<width; x++) {
      var real = map(x, 0, width, minW, maxW);
      var im = map(y, 0, height, minH, maxH);

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
        if(real*real + im*im > 4) {
          // diverge to inf
          break;
        }
        n++;
      }
      data.push(n);
      calculations++;
    }
  }
  console.log('calculations', calculations, 'd', data.length);
}

const updateZoom = function() {
  if(mouseIsPressed) {
    if(mouseButton === LEFT) {
      zoomIn();
      return true;
    } else if (mouseButton === RIGHT) {
      zoomOut();
      return true;
    }
  }
}

const zoomIn = function() {
  console.log(mouseX, mouseY)
  const xScale = (maxWidth - minWidth)/3;
  const yScale = (maxHeight - minHeight)/3;
  
  console.log(maxWidth, minWidth, maxHeight, minHeight);
  var x = map(mouseX, 0, width, minWidth, maxWidth);
  var y = map(mouseY, 0, height, minHeight, maxHeight);
  maxWidth = x + xScale;
  minWidth = x - xScale;
  maxHeight = y + yScale;
  minHeight = y - yScale;
  console.log(maxWidth, minWidth, maxHeight, minHeight);
}

const zoomOut = function() {

}