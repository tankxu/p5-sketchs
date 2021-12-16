let spacing = 40;
let sphereX = 25;
let w = spacing * (sphereX - 1); // Width of entire wave
let theta = 0.0; // Start angle at 0
let waveWidth = 1000;
let dx; // Value for incrementing x
let yvalues = [];
let xvalues = [];
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

  rotateXSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, 70);
  rotateXSlider.position(20, 20);
  rotateYSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, -50);
  rotateYSlider.position(20, 50);
  rotateZSlider = createSlider(-HALF_PI * 100, HALF_PI * 100, 20);
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
  rotateX(rotateXSlider.value() / 100 + theta * 0.03);
  rotateY(rotateYSlider.value() / 100 + theta * 0.08);
  rotateZ(rotateZSlider.value() / 100 + theta * 0.05);

  translate(-w / 2, -w / 2, 0);

  theta += 0.02;

  for (let y = 0; y < sphereX; y++) {
    let yCenterInitTheta = -dx * abs(y - floor(sphereX / 2));

    for (let x = 0; x < sphereX; x++) {
      let xCenterInitTheta = -dx * abs(x - floor(sphereX / 2));

      let fromColor = color(34, 103, 22);
      let toColor = color(241, 98, 67);
      fromColor.setAlpha(128 + sin(theta) * 100);
      toColor.setAlpha(150 + sin(theta) * 50);

      // fill(lerpColor(fromColor, toColor, abs(sin(theta * 0.5))));
      fill(lerpColor(fromColor, toColor, noise(theta)));

      push();
      translate(x * spacing, y * spacing, 0);

      // map(sin(dx * abs(i - floor( yvalues.length / 2)) + theta), -1, 1, 1, 10);

      scale(
        map(
          abs(
            sin(
              xCenterInitTheta +
                yCenterInitTheta +
                map(noise(theta), 0, 1, -2, 2)
            )
          ),
          0,
          1,
          1,
          15
        )
      );
      // scale(map(abs(sin(xCenterInitTheta + yCenterInitTheta + theta)),0 ,1 ,1, 10));
      sphere(1);
      pop();
    }
  }
}
