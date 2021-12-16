let spacing = 45;
let sphereX = 21;
let w = spacing * (sphereX - 1); // Width of entire wave
let theta = 0.0; // Start angle at 0
let waveWidth = 30000;
let dx; // Value for incrementing x
let yvalues = [];
let xvalues = [];
let sphereSize = 1;
let myFont;

function preload() {
  myFont = loadFont("../Roboto-Regular.ttf");
}

function setup() {
  createCanvas(1000, 1000, WEBGL);
  normalMaterial();

  dx = (TWO_PI / waveWidth) * spacing;

  // ortho(-width /2, width / 2, height / 2, -height / 2, -2000, 2000); //No Perspective
  // noLoop(); // Run once and stop

  rotateXSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, 0);
  rotateXSlider.position(20, 20);
  rotateYSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, 0);
  rotateYSlider.position(20, 50);
  rotateZSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, 0);
  rotateZSlider.position(20, 80);
  textFont(myFont);
  textSize(15);
}

function draw() {
  orbitControl();

  background(236, 239, 253);
  ambientLight(180, 180, 180);
  pointLight(60, 60, 60, 100, 100, 200);

  let locX = mouseX - height / 2;
  let locY = mouseY - width / 2;
  pointLight(150, 150, 150, locX, locY, 1000);

  push();
  translate(-width / 2, -height / 2, 0);
  fill(0);
  text("rotate X", rotateXSlider.x + rotateXSlider.width + 20, 35);
  text("rotate Y", rotateYSlider.x + rotateYSlider.width + 20, 65);
  text("rotate Z", rotateZSlider.x + rotateZSlider.width + 20, 95);
  pop();

  // rotateX(- HALF_PI / width * locY)
  // rotateY(HALF_PI / height * locX)
  rotateX(rotateXSlider.value() / 100);
  rotateY(rotateYSlider.value() / 100);
  rotateZ(rotateZSlider.value() / 100);

  translate(-w / 2, -w / 2, 0);

  theta += 0.02;

  for (let y = 0; y < sphereX; y++) {
    for (let x = 0; x < sphereX; x++) {
      let centerPos = (spacing * (sphereX - 1)) / 2;

      let fromColor = color(91, 143, 233);
      let toColor = color(236, 150, 90);

      fill(lerpColor(fromColor, toColor, abs(sin(theta * 0.5))));

      // fill(fromColor)

      push();

      let positionX = x * spacing;
      let positionY = y * spacing;
      translate(positionX, positionY, 0);

      d = dist(positionX, positionY, centerPos, centerPos);
      let initTheta = -dx * d;

      print("x: " + x + " y: " + y + " d: " + d + " initTheta: " + initTheta);

      scale(map(abs(sin(initTheta + theta)), 0, 1, 1, 18));
      sphere(sphereSize);
      pop();
    }
  }
}
