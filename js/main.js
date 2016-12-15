require('p5');
var _ = require('lodash');

window.setup = function() {
  createCanvas(640, 480);
  var pink = color(50, 50, 50);
  const d = pixelDensity();
  loadPixels();
  var image = 4 * (width * d) * (height * d);
  for (var i = 0; i < image; i+=4) {
    pixels[i] = red(pink);
    pixels[i + 1] = green(pink);
    pixels[i + 2] = blue(pink);
    pixels[i + 3] = alpha(pink);
  }
  updatePixels();
}

// must be on window for p5
window.draw = function() {
  
  if(mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}

// console.log(p5);