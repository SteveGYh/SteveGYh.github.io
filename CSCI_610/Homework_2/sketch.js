function myLine(x1, y1, x2, y2) {
  // insert your code here to draw a line from (x1, y1) to (x2, y2)
  // using only calls to point().

  // your code should implement the Midpoint algorithm
  
  // Deal with vertical lines
  if (x1 == x2) {
    if (y1 <= y2) {
      for (let i = y1; i <= y2; i++)
        point(x1, i);
    } else {
      for (let i = y2; i <= y1; i++) {
        point(x1, i);
      }
    }  
  }
  // Deal with Horizontal lines
  else if (y1 == y2) {
    if (x1 <= x2) {
      for (let i = x1; i <= x2; i++) {
        point(i, y1);
      }
    } else {
      for (let i = x2; i <= x1; i++) {
        point(i, y1);
      }
    }
  }
  // Deal with general lines
  else {
    // Swap endpoints in case of negative slopes
    if (y1 > y2)
      myLine(x2, y2, x1, y1);
    // Apply midpoint to draw the line
    else {
      // Use if statement to deal with two different relative positions of x1 and x2
      // i.e. x1 < x2 and x1 > x2
      if (x1 < x2) {
        let dy = y2 - y1;
        let dx = x2 - x1;

        let incE = 2 * dy;
        let incNE = 2 * (dy - dx);
        let d = incE - dx;

        for (let x = x1, y = y1; x <= x2; x++) {
          point(x, y);

          if (d <= 0)
            d += incE;
          else {
            y++;
            d += incNE;
          }
        }
      } else {
        let dy = y2 - y1;
        let dx = x1 - x2;

        let incE = 2 * dy;
        let incNE = 2 * (dy - dx);
        let d = incE - dx;

        for (let x = x1, y = y1; x >= x2; x--) {
          point(x, y);

          if (d <= 0)
            d += incE;
          else {
            y++;
            d += incNE;
          }
        }
      }
    }
  }
}

function myTriangle(x0, y0, x1, y1, x2, y2) {
  // insert your code here to draw a triangle with vertices (x0, y0),
  // (x1, y1) and (x2, y2) using only calls to point().

  // your code should implement the the algorithm presented in the video
  
  // First we sort the 3 points according to their y value
  let lowest_y, lowest_x, mid_y, mid_x, highest_y, highest_x;
  if (y0 <= y1 && y0 <= y2){
    lowest_y = y0, lowest_x = x0;
    if (y1 <= y2){
      mid_y = y1, mid_x = x1, highest_y = y2, highest_x = x2;
    }
    else{
      mid_y = y2, mid_x = x2, highest_y = y1, highest_x = x1;
    }
  }
  else if (y1 <= y2 && y1 <= y2){
    lowest_y = y1, lowest_x = x1;
    if (y0 <= y2){
      mid_y = y0, mid_x = x0, highest_y = y2, highest_x = x2;
    }
    else{
      mid_y = y2, mid_x = x2, highest_y = y0, highest_x = x0;
    }
  }
  else{
    lowest_y = y2, lowest_x = x2;
    if (y1 <= y0){
      mid_y = y1, mid_x = x1, highest_y = y0, highest_x = x0;
    }
    else{
      mid_y = y0, mid_x = x0, highest_y = y1, highest_x = x1;
    }
  }
  
  
  // Deal with triangles that have horizontal bottom edge
  if (lowest_y == mid_y){
    // Draw the horizontal edge
    for (let x = 0; x <= 500; x++){
      if (x <= lowest_x && x >= mid_x || x >= lowest_x && x <= mid_x)
        point(x, lowest_y);
    }
    // Fill the triangle using scan line and edge detection
    let edge_1 = lowest_x, de1 = (highest_x - lowest_x)/(highest_y - lowest_y), edge_2 = mid_x, de2 = (highest_x - mid_x)/(highest_y - mid_y);
    for (let y = lowest_y + 1; y <= highest_y; y++){
      edge_1 += de1;
      edge_2 += de2;
      for (let x = 0; x <= 500; x++){
        if (x <= edge_1 && x >= edge_2 || x >= edge_1 && x <= edge_2)
          point(x, y);
      }
    }
  }
  
  
  // Deal with triangles that have horizontal top edge
  else {
    // Draw the horizontal edge
    for (let x = 0; x <= 500; x++){
      if (x <= highest_x && x >= mid_x || x >= highest_x && x <= mid_x)
        point(x, highest_y);
    }
    // Fill the triangle using scan line and edge detection
    let edge_1 = highest_x, de1 = (lowest_x - highest_x)/(highest_y - lowest_y), edge_2 = mid_x, de2 = (lowest_x - mid_x)/(mid_y - lowest_y);
    for (let y = highest_y - 1; y >= lowest_y; y--){
      edge_1 += de1;
      edge_2 += de2;
      for (let x = 0; x <= 500; x++){
        if (x <= edge_1 && x >= edge_2 || x >= edge_1 && x <= edge_2)
          point(x, y);
      }
    }
  }

}

// --------------------------------------------------------------------------
//
// Do not edit below this lne
//
// --------------------------------------------------------------------------

let doMine = true;
let scene = 1;

function setup() {
  createCanvas(500, 500);
  backgroundColor = color(150, 150, 150);
  background(backgroundColor);
}

function draw() {
  fill(0, 0, 0);
  if (doMine) text("my solution", 20, 475);
  else text("reference", 20, 475);

  if (scene == 1) doLines();
  if (scene == 2) doHouse();

}

function doHouse() {
  if (!doMine) {
    fill(255, 0, 0);
    stroke(255, 0, 0);
    triangle(200, 300, 300, 200, 200, 200);
    triangle(300, 300, 300, 200, 200, 300);
    fill(0, 0, 255);
    stroke(0, 0, 255);
    triangle(200, 200, 300, 200, 250, 150);
    stroke(0, 255, 0);
    fill(0, 255, 0);
    triangle(250, 300, 275, 300, 250, 250);
    triangle(275, 300, 275, 250, 250, 250);
  } else {
    fill(128, 0, 0);
    stroke(128, 0, 0);
    myTriangle(200, 300, 300, 200, 200, 200);
    myTriangle(300, 300, 300, 200, 200, 300);
    fill(0, 0, 128);
    stroke(0, 0, 128);
    myTriangle(200, 200, 300, 200, 250, 150);
    stroke(0, 128, 0);
    fill(0, 128, 0);
    myTriangle(250, 300, 275, 300, 250, 250);
    myTriangle(275, 300, 275, 250, 250, 250);
  }
}

function doLines() {
  if (!doMine) {
    stroke(255, 255, 255);
    line(50, 250, 450, 250);
    line(250, 50, 250, 450);
    line(50, 450, 450, 50);
    line(50, 50, 450, 450);
  } else {
    stroke(0, 0, 0);
    myLine(50, 250, 450, 250);
    myLine(250, 50, 250, 450);
    myLine(50, 450, 450, 50);
    myLine(50, 50, 450, 450);
  }
}

function keyPressed() {
  if (key == '1') {
    background(backgroundColor);
    scene = 1;
  }

  if (key == '2') {
    background(backgroundColor);
    scene = 2;
  }

  if (key == 'm') {
    background(backgroundColor);
    doMine = !doMine;
  }

}