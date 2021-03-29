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
    var temp_y, temp_z;
    
    // FEHG
    z = 0.5;
    x = -0.5;
    for (i = 0; i < subdivisions; i++){
        y = 0.5
        for (j = 0; j < subdivisions; j++){
            temp_y = y;
            temp_z = z;
            z = temp_y;
            y = temp_z;
            addTriangle(x, y, z, x, y-step, z-step, x, y-step, z);
            addTriangle(x, y, z, x, y, z-step, x, y-step, z-step);
            y = temp_y;
            z = temp_z;
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
            addTriangle(x, y, z, x+step, y, z-step, x+step, y, z);
            addTriangle(x, y, z, x, y, z-step, x+step, y, z-step);
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
            addTriangle(x, y, z, x, y+step, z-step, x, y+step, z);
            addTriangle(x, y, z, x, y, z-step, x, y+step, z-step);
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
            addTriangle(x, y, z, x-step, y, z-step, x-step, y, z);
            addTriangle(x, y, z, x, y, z-step, x-step, y, z-step);
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
            addTriangle(x, y, z, x+step, y-step, z, x, y-step, z);
            addTriangle(x, y, z, x+step, y, z, x+step, y-step, z);
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
            addTriangle(x, y, z, x-step, y-step, z, x, y-step, z);
            addTriangle(x, y, z, x-step, y, z, x-step, y-step, z);
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

    var cen_x = 0, cen_y = 0.5, cen_z = 0, cen_y_bottom = -0.5;
    var r = 0.5;
    var step = 360 / radialdivision;
    var i, j;
    for (i=0; i < radialdivision; i++){
        // Add top circle
        addTriangle(cen_x, cen_y, cen_z, r * Math.cos(radians(step * i)), cen_y, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), cen_y, r * Math.sin(radians(step * (i+1))));
        
        // Add sides
        var y_top = 0.5;
        var y_cur;
        var step_height = 1 / heightdivision;
        for (j = 0; j < heightdivision; j++){
            y_cur = y_top - step_height;
            addTriangle(r * Math.cos(radians(step * (i+1))), y_cur, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)));
            addTriangle(r * Math.cos(radians(step * i)), y_top, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * i)), y_cur, r * Math.sin(radians(step * i)), r * Math.cos(radians(step * (i+1))), y_top, r * Math.sin(radians(step * (i+1))));    
            y_top = y_cur;
        }
        
        // Add bottom circle
        addTriangle(cen_x, cen_y_bottom, cen_z, r * Math.cos(radians(step * (i+1))), cen_y_bottom, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), cen_y_bottom, r * Math.sin(radians(step * i)));
    }



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

    var cen_x = 0, cen_y = 0.5, cen_z = 0, cen_y_bottom = -0.5;
    var r = 0.5;
    var step = 360 / radialdivision;
    var i, j;
    for (i=0; i < radialdivision; i++){
        // Add top circle
        
        // Add sides
        var y_top = 0.5;
        var y_cur;
        var step_height = 1 / heightdivision;
        for (j = 0; j < heightdivision; j++){
            y_cur = y_top - step_height;
            addTriangle(r * Math.cos(radians(step * (i+1))) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * (i+1))) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision);
            addTriangle(r * Math.cos(radians(step * i)) * j / heightdivision, y_top, r * Math.sin(radians(step * i)) * j / heightdivision, r * Math.cos(radians(step * i)) * (j + 1) / heightdivision, y_cur, r * Math.sin(radians(step * i)) * (j + 1) / heightdivision, r * Math.cos(radians(step * (i+1))) * j / heightdivision, y_top, r * Math.sin(radians(step * (i+1))) * j / heightdivision);    
            y_top = y_cur;
        }
        
        // Add bottom circle
        addTriangle(cen_x, cen_y_bottom, cen_z, r * Math.cos(radians(step * (i+1))), cen_y_bottom, r * Math.sin(radians(step * (i+1))), r * Math.cos(radians(step * i)), cen_y_bottom, r * Math.sin(radians(step * i)));
    }

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

    // Draw upper half
    var i, j;
    
    var step_slice = 360 / slices;
    var step_stack = 360 / stacks;
    var top_y = 0.5;
    var cur_y;
    var cur_stack_degree = 0;
    var new_stack_degree;
    var x0, y0, z0, x1, y1, z1, x2, y2, z2, x3, y3, z3;
    var new_r;
    for (i = 0; i < stacks; i++){
        new_stack_degree = cur_stack_degree + step_stack;
        y0 = 0.5 * Math.cos(radians(step_stack * i));
        y1 = y0;
        y2 = 0.5 * Math.cos(radians(step_stack * (i+1)));
        y3 = y2;
        upper_r = 0.5 * Math.sin(radians(step_stack * i));
        lower_r = 0.5 * Math.sin(radians(step_stack * (i+1)));
        for (j = 0; j < slices; j++){
            x0 = upper_r * Math.cos(radians(step_slice * j));
            z0 = upper_r * Math.sin(radians(step_slice * j));
            x1 = upper_r * Math.cos(radians(step_slice * (j+1)));
            z1 = upper_r * Math.sin(radians(step_slice * (j+1)));

            x3 = lower_r * Math.cos(radians(step_slice * j));
            z3 = lower_r * Math.sin(radians(step_slice * j));
            x2 = lower_r * Math.cos(radians(step_slice * (j+1)));
            z2 = lower_r * Math.sin(radians(step_slice * (j+1)));

            addTriangle(x0, y0, z0, x3, y3, z3, x1, y1, z1);
            addTriangle(x1, y1, z1, x3, y3, z3, x2, y2, z2);
        }
    }

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
