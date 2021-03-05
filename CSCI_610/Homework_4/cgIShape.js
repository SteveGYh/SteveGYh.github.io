//
// fill in code that creates the triangles for a cube with dimensions 1x1x1
// on each side (and the origin in the center of the cube). with an equal
// number of subdivisions along each cube face as given by the parameter
//subdivisions
//
function makeCube (subdivisions)  {
    // fill in your code here.
    var i, j, x, y, z;
    var step = 1 / subdivisions;
    
    // FEHG
    z = 0.5;
    x = -0.5;
    for (i = 0; i < subdivisions; i++){
        y = 0.5
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x, y-step, z, x, y-step, z-step, x, y, z-step);
            y -= step;
        }
        z -= step;
    }
    // EDAH
    y = -0.5;
    z = 0.5;
    for (i = 0; i < subdivisions; i++){
        x = -0.5;
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x+step, y, z, x+step, y, z-step, x, y, z-step);
            x += step;
        }
        z -= step;
    }
    // DCBA
    z = 0.5;
    x = 0.5;
    for (i = 0; i < subdivisions; i++){
        y = -0.5
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x, y+step, z, x, y+step, z-step, x, y, z-step)
            y += step;
        }
        z -= step;
    }
    // CFGB
    z = 0.5;
    y = 0.5;
    for (i = 0; i < subdivisions; i++){
        x = 0.5
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x-step, y, z, x-step, y, z-step, x, y, z-step)
            x -= step;
        }
        z -= step;
    }
    // GHAB
    z = -0.5;
    x = -0.5;
    for (i = 0; i < subdivisions; i++){
        y = 0.5
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x, y-step, z, x+step, y-step, z, x+step, y, z)
            y -= step;
        }
        x += step;
    }
    // CDEF
    z = 0.5;
    x = 0.5;
    for (i = 0; i < subdivisions; i++){
        y = 0.5
        for (j = 0; j < subdivisions; j++){
            addSquare(x, y, z, x, y-step, z, x-step, y-step, z, x-step, y, z)
            y -= step;
        }
        x -= step;
    }
}


//
// fill in code that creates the triangles for a cylinder with diameter 1
// and height of 1 (centered at the origin) with the number of subdivisions
// around the base and top of the cylinder (given by radialdivision) and
// the number of subdivisions along the surface of the cylinder given by
//heightdivision.
//
function makeCylinder (radialdivision,heightdivision){
    // fill in your code here.
}


//
// fill in code that creates the triangles for a cone with diameter 1
// and height of 1 (centered at the origin) with the number of
// subdivisions around the base of the cone (given by radialdivision)
// and the number of subdivisions along the surface of the cone
//given by heightdivision.
//
function makeCone (radialdivision, heightdivision) {
    // fill in your code here.
}
    
//
// fill in code that creates the triangles for a sphere with diameter 1
// (centered at the origin) with number of slides (longitude) given by
// slices and the number of stacks (lattitude) given by stacks.
// For this function, you will implement the tessellation method based
// on spherical coordinates as described in the video (as opposed to the
//recursive subdivision method).
//
function makeSphere (slices, stacks) {
    // fill in your code here.
}


////////////////////////////////////////////////////////////////////
//
//  Do not edit below this line
//
///////////////////////////////////////////////////////////////////

function radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function addTriangle (x0,y0,z0,x1,y1,z1,x2,y2,z2) {

    
    var nverts = points.length / 4;
    
    // push first vertex
    points.push(x0);  bary.push (1.0);
    points.push(y0);  bary.push (0.0);
    points.push(z0);  bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
    
    // push second vertex
    points.push(x1); bary.push (0.0);
    points.push(y1); bary.push (1.0);
    points.push(z1); bary.push (0.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++
    
    // push third vertex
    points.push(x2); bary.push (0.0);
    points.push(y2); bary.push (0.0);
    points.push(z2); bary.push (1.0);
    points.push(1.0);
    indices.push(nverts);
    nverts++;
}

function addSquare (x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3){
    addTriangle(x0, y0, z0, x2, y2, z2, x1, y1, z1);
    addTriangle(x0, y0, z0, x3, y3, z3, x2, y2, z2);
}