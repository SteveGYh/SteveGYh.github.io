function drawNameWithLines() {
  // insert your code here to draw the letters of your name
  // using only lines()
  // letter Y
  
  // set letter position
  let positionX = 100;
  let positionY = 100;
  line(positionX, positionY, positionX+10, positionY);
  line(positionX+70, positionY, positionX+80, positionY);
  line(positionX+5, positionY, positionX+40, positionY+50);
  line(positionX+75, positionY, positionX+40, positionY+50);
  line(positionX+40, positionY+50, positionX+40, positionY+120);
  line(positionX+35, positionY+120, positionX+45, positionY+120);

  // set distance between letters
  let distance = 140;
  positionX += distance;
  
  // letter G
  line (positionX+20, positionY, positionX+70, positionY);
  line (positionX+70, positionY, positionX+80, positionY+10);
  line (positionX+80, positionY+10, positionX+80, positionY+20);
  line (positionX, positionY+20, positionX+20, positionY);
  line (positionX, positionY+20, positionX, positionY+100);
  line (positionX, positionY+100, positionX+20, positionY+120);
  line (positionX+20, positionY+120, positionX+70, positionY+120);
  line (positionX+70, positionY+120, positionX+80, positionY+110);
  line (positionX+80, positionY+110, positionX+80, positionY+70);
  line (positionX+70, positionY+70, positionX+90, positionY+70);
}

function drawNameWithTriangles() {
  // insert your code here to draw the letters of your name
  // using only ltriangles()
  
  // set letter position
  let positionX = 100;
  let positionY = 250;
  
  // letter Y
  triangle(positionX, positionY, positionX+10, positionY, positionX+40, positionY+50);
  triangle(positionX+10, positionY, positionX+40, positionY+50, positionX+50, positionY+50);
  triangle(positionX+80, positionY, positionX+90, positionY, positionX+40, positionY+50);
  triangle(positionX+90, positionY, positionX+40, positionY+50, positionX+50, positionY+50);
  triangle(positionX+40, positionY+120, positionX+40, positionY+50, positionX+50, positionY+50);
  triangle(positionX+40, positionY+120, positionX+50, positionY+120, positionX+50, positionY+50);
  
  // set distance between letters
  let distance = 140;
  positionX += distance;
  
  // letter G
  triangle(positionX+25, positionY, positionX+25, positionY+10, positionX, positionY+30);
  triangle(positionX+8, positionY+30, positionX+25, positionY+10, positionX, positionY+30);
  
  triangle(positionX+8, positionY+30, positionX, positionY+30, positionX, positionY+90);
  triangle(positionX+8, positionY+30, positionX+8, positionY+90, positionX, positionY+90);
  
  triangle(positionX, positionY+90, positionX+8, positionY+90, positionX+25, positionY+110);
  triangle(positionX, positionY+90, positionX+25, positionY+120, positionX+25, positionY+110);
  
  
  triangle(positionX+25, positionY+120, positionX+70, positionY+110, positionX+25, positionY+110);
  triangle(positionX+25, positionY+120, positionX+70, positionY+110, positionX+70, positionY+120);
  
  triangle(positionX+25, positionY+10, positionX+75, positionY, positionX+25, positionY);
  triangle(positionX+25, positionY+10, positionX+75, positionY, positionX+75, positionY+10);
  
  triangle(positionX+75, positionY+10, positionX+75, positionY, positionX+85, positionY+20);
  
  triangle(positionX+70, positionY+120, positionX+70, positionY+110, positionX+80, positionY+100);
  triangle(positionX+70, positionY+120, positionX+80, positionY+100, positionX+85, positionY+100);
  
  
  triangle(positionX+80, positionY+100, positionX+85, positionY+100, positionX+85, positionY+70);
  triangle(positionX+80, positionY+100, positionX+80, positionY+70, positionX+85, positionY+70);
  
  triangle(positionX+80, positionY+70, positionX+65, positionY+70, positionX+80, positionY+75);
  triangle(positionX+85, positionY+70, positionX+85, positionY+75, positionX+100, positionY+70);
  
  
}

// --------------------------------------------------------------------------------------------
//
// Do not edit below this lne
//
// --------------------------------------------------------------------------------------------

doLine = false;
doTri = false;

function setup() {
  backgroundColor = color(150, 150, 150);
  createCanvas(500, 500);
  background(backgroundColor);
}

function draw() {
  backgroundColor = color(150, 150, 150);
  lineColor = color(0, 0, 0);
  fillColor = color(255, 0, 0);

  if (doLine) stroke(lineColor);
  else stroke(backgroundColor);
  drawNameWithLines();

  if (doTri) {
    fill(fillColor);
    stroke(fillColor);
  } else {
    fill(backgroundColor);
    stroke(backgroundColor);
  }
  drawNameWithTriangles();
}

function keyPressed() {
  if (key == 'l') doLine = !doLine;
  if (key == 't') doTri = !doTri;
}