import { color } from "../utils/colors/color.js";
import blob from "../utils/blob/blob.js";

const center = 500;

function generateMoons(key, draw) {
  let amountOfMoons = Math.ceil(key.next16() / 4);
  for (let i = 0; i < amountOfMoons; i++) {
    generatePlanet(key, draw, true);
  }
}

function generatePlanet(key, draw, isMoon) {
  let dmove;
  let planetSize;
  let circleSize;

  if (isMoon) {
    planetSize = 200;
    dmove = generateDmove(key, true);
  } else {
    dmove = generateDmove(key);
    planetSize = 550;
  }

  circleSize = planetSize * (1 + key.next16() / 64);
  const colorNum = key.next256();
  const planetColor = color(colorNum);

  drawPlanet(draw, circleSize, planetColor, dmove, isMoon);
  generateShadow(key, draw, circleSize, colorNum, dmove);
  buildContinents(key, draw, circleSize, planetColor, dmove, isMoon);
}

function drawPlanet(draw, circleSize, planetColor, dmove, isMoon) {
  draw
    .circle()
    .size(circleSize)
    .center(500, 500)
    .fill(planetColor)
    .dmove(dmove[0], dmove[1]);
}

function generateShadow(key, draw, circleSize, planetColorNum, dmove) {
  const planetShadowColor = color(planetColorNum, true);
  let clipCircle = draw
    .circle()
    .size(circleSize)
    .center(center, center)
    .dmove(dmove[0], dmove[1]); // planeta clip

  let shadow = draw
    .circle()
    .size(circleSize)
    .center(center - 30 * (1 + key.next16() / 32), center)
    .fill(planetShadowColor)
    .dmove(dmove[0], dmove[1]); // sombra
  shadow.clipWith(clipCircle);

  return shadow;
}

function generateContinent(key, draw, circleSize, planetColor, dmove, isMoon) {
  let circleClip = draw
    .circle()
    .size(circleSize)
    .center(center, center)
    .fill(planetColor)
    .dmove(dmove[0], dmove[1]); // planeta clip

  let b = blob(key.next256());
  b.size(key.next256() + 150, key.next256() + 100)
    .move(
      200 + key.next256() * randomRate(key),
      200 + key.next256() * randomRate(key)
    )
    .fill(color(key.next256()))
    .opacity(0.8 + key.next16() / 16);

  if (isMoon) b.opacity(0.45);

  b.addTo(draw);
  b.clipWith(circleClip);

  return circleClip;
}

function buildContinents(key, draw, circleSize, planetColor, dmove, isMoon) {
  const continentRate = 2.75;
  for (let i = 0; i < key.next256() * continentRate; i++) {
    generateContinent(key, draw, circleSize, planetColor, dmove, isMoon);
  }
}

function randomRateMin(key) {
  const next = key.next16();

  return 1 + next / 16;
}

function randomRate(key) {
  const next16 = key.next16();
  if (next16 % 2 == 0) return 1 + next16;

  return 1 - next16 / 2;
}

function generateDmove(key, isMoon) {
  let dmoveX;
  let dmoveY;

  if (isMoon) {
    dmoveX = key.next256() * 2 * randomRateMin(key);
    dmoveY = key.next256() * 2 * randomRateMin(key);
  } else {
    dmoveX = (key.next256() / 6) * randomRateMin(key);
    dmoveY = (key.next256() / 6) * randomRateMin(key);
  }

  const plusOrMinusX = key.next16() / 16 < 0.5 ? -1 : 1;
  const plusOrMinusY = key.next16() / 16 < 0.5 ? -1 : 1;

  dmoveX *= plusOrMinusX;
  dmoveY *= plusOrMinusY;

  return [dmoveX, dmoveY];
}
export { generatePlanet, generateMoons };
